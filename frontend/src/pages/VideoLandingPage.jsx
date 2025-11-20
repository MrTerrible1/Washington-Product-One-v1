import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import { useViaContent } from "../context/ViaContentContext.jsx";

const GENRES = ["Video", "Music", "Games", "Books"];

export function VideoLandingPage() {
  const rails = videoData.rails || [];
  const { logEvent } = useWashingtonEvents("video-landing");
  const { setCurrentContentId } = useViaContent();
  const navigate = useNavigate();
  
  // Track scroll state for each rail
  const [railScrollStates, setRailScrollStates] = useState({});

  // Derive hero video from featured rail
  const featuredRail = rails.find((r) => r.id === "featured") || rails[0];
  const heroVideo = featuredRail?.items?.[0] || null;

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, {
      source: "video-landing",
      route: "ondemand",
    });
    setCurrentContentId(null);
  }, [logEvent, setCurrentContentId]);

  const handleCardClick = (railId, video) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "landing_video_click",
      railId,
      videoId: video.id,
      title: video.title,
    });
    navigate(`/content/${video.id}`);
  };

  const handleHeroWatchNow = () => {
    if (!heroVideo) return;
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "hero_watch_now_click",
      videoId: heroVideo.id,
      title: heroVideo.title,
    });
    navigate(`/content/${heroVideo.id}`);
  };

  const handleHeroMoreInfo = () => {
    if (!heroVideo) return;
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "hero_more_info_click",
      videoId: heroVideo.id,
      title: heroVideo.title,
    });
    navigate(`/content/${heroVideo.id}`);
  };

  const handleRailToggle = (railId) => {
    const container = document.getElementById(`rail-${railId}`);
    if (!container) return;

    const isAtEnd = railScrollStates[railId];

    if (isAtEnd) {
      // Scroll back to start
      container.scrollTo({ left: 0, behavior: "smooth" });
      logEvent(EVENT_TYPES.CTA_CLICK, {
        ctaName: "rail_back_click",
        railId,
      });
      setRailScrollStates((prev) => ({ ...prev, [railId]: false }));
    } else {
      // Scroll to end
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      logEvent(EVENT_TYPES.CTA_CLICK, {
        ctaName: "rail_more_click",
        railId,
      });
      setRailScrollStates((prev) => ({ ...prev, [railId]: true }));
    }
  };

  const railsWithItems = rails.filter((rail) => (rail.items || []).length > 0);

  // For demo, Video is the active genre
  const activeGenre = "Video";

  return (
    <div className="grid gap-8 md:grid-cols-[140px_minmax(0,1fr)]">
      {/* LEFT VERTICAL TABS - Compressed */}
      <aside className="hidden md:flex flex-col gap-1.5 pt-2">
        <p className="uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-1 px-2">
          Browse
        </p>
        {GENRES.map((label) => {
          const isActive = label === activeGenre;
          return (
            <button
              key={label}
              type="button"
              className={
                isActive
                  ? "h-10 inline-flex items-center px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm transition-all"
                  : "h-10 inline-flex items-center px-4 rounded-full bg-transparent text-muted-foreground border border-border/60 hover:bg-secondary/60 hover:text-foreground text-sm font-medium transition-all"
              }
              onClick={() => {
                logEvent(EVENT_TYPES.CTA_CLICK, {
                  ctaName: "genre_click",
                  genre: label,
                });
              }}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </aside>

      {/* MAIN CONTENT: HERO + RAILS */}
      <div className="space-y-8">
        {/* Hero - Premier Window (16:9 Key Art) */}
        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Premier Window
          </p>
          <div className="rounded-3xl bg-card border border-border/60 shadow-lg overflow-hidden">
            {/* 16:9 Key Art Container */}
            <div 
              className="relative w-full aspect-video bg-gradient-to-br from-accent/40 to-muted cursor-pointer group"
              role="button"
              tabIndex={0}
              onClick={handleHeroWatchNow}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleHeroWatchNow();
                }
              }}
            >
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content positioned at bottom-left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                  {heroVideo?.title || "Featured Content"}
                </h1>
                <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed">
                  {heroVideo?.tagline || heroVideo?.description || "Hot new feature, trailer, or event picked for you. The most relevant content for your profile and data-profile appears here."}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeroWatchNow();
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm md:text-base font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Watch Now
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeroMoreInfo();
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white px-5 py-2 text-sm md:text-base font-medium hover:bg-white/30 transition-colors"
                  >
                    More info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rails */}
        <section className="space-y-8" aria-label="OnDemand video rails">
          {railsWithItems.map((rail) => {
            const isScrolledToEnd = railScrollStates[rail.id] || false;
            return (
              <div key={rail.id} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {rail.title}
                  </h2>
                  <button
                    type="button"
                    className="text-[11px] md:text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                    onClick={() => handleRailToggle(rail.id)}
                  >
                    {isScrolledToEnd ? (
                      <>
                        <span aria-hidden>←</span>
                        Back
                      </>
                    ) : (
                      <>
                        More
                        <span aria-hidden>→</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Horizontal grid - 6 cards visible, hidden scrollbar */}
                <div 
                  id={`rail-${rail.id}`}
                  className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-5 overflow-x-auto pb-2 scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {rail.items.map((video, cardIndex) => {
                  const isHighlighted = cardIndex === 0 || cardIndex === 1;
                  const thumbnail = video.thumbnail || "";
                  const genre = video.genre || "";

                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleCardClick(rail.id, video)}
                      className="group w-[220px] shrink-0 text-left"
                    >
                      <div className="rounded-2xl overflow-hidden bg-card border border-border/70 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                        <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/40 to-muted overflow-hidden">
                          {thumbnail && (
                            <div
                              className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                              style={{ backgroundImage: `url(${thumbnail})` }}
                            />
                          )}
                          {!thumbnail && (
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-muted group-hover:brightness-110 transition-[filter,transform] duration-300" />
                          )}
                          <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/70 rounded-2xl pointer-events-none" />
                          {genre && (
                            <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">
                              {genre}
                            </span>
                          )}
                          {isHighlighted && (
                            <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">
                              {rail.id === "featured" ? "FEATURED" : "NEW"}
                            </span>
                          )}
                          {video.duration && (
                            <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/80 text-white">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <div className="px-3 py-3 space-y-1">
                          <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2 text-foreground">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                            {video.tagline || video.meta}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default VideoLandingPage;
