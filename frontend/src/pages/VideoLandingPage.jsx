import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import { useViaContent } from "../context/ViaContentContext.jsx";

const PREMIER_GENRES = [
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "action", label: "Action" },
  { id: "rom-com", label: "Rom-com" },
  { id: "kids", label: "Kids" },
  { id: "animated", label: "Animated" },
  { id: "ai", label: "AI" },
];

const PREMIER_FORMATS = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
];

export function VideoLandingPage() {
  const rails = videoData.rails || [];
  const { logEvent } = useWashingtonEvents("video-landing");
  const { setCurrentContentId } = useViaContent();
  const navigate = useNavigate();
  
  // Track scroll state for each rail
  const [railScrollStates, setRailScrollStates] = useState({});

  // Track active premier genre and format
  const [activePremierGenre, setActivePremierGenre] = useState("sci-fi");
  const [activePremierFormat, setActivePremierFormat] = useState("horizontal");

  // Hero always comes from featured rail
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

  return (
    <div className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
      {/* LEFT VERTICAL CONTROLS - Premier Controls (Genres + Formats) */}
      <aside className="hidden md:flex flex-col gap-4 pt-2">
        <div>
          <p className="uppercase tracking-[0.22em] text-[11px] text-muted-foreground mb-2 px-2">
            Premier controls
          </p>

          {/* Genres */}
          <div className="flex flex-col gap-1.5">
            {PREMIER_GENRES.map((item) => {
              const isActive = item.id === activePremierGenre;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={
                    isActive
                      ? "h-9 md:h-10 inline-flex items-center px-4 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold shadow-sm"
                      : "h-9 md:h-10 inline-flex items-center px-4 rounded-full bg-transparent text-muted-foreground border border-border/60 text-xs md:text-sm font-medium hover:bg-secondary/60 hover:text-foreground"
                  }
                  onClick={() => {
                    setActivePremierGenre(item.id);
                    logEvent(EVENT_TYPES.CTA_CLICK, {
                      ctaName: "premier_genre_click",
                      genre: item.label,
                    });
                  }}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formats subset */}
        <div>
          <p className="uppercase tracking-[0.22em] text-[11px] text-muted-foreground mb-2 px-2">
            Formats
          </p>
          <div className="flex flex-col gap-1.5">
            {PREMIER_FORMATS.map((item) => {
              const isActive = item.id === activePremierFormat;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={
                    isActive
                      ? "h-9 md:h-10 inline-flex items-center px-4 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold shadow-sm"
                      : "h-9 md:h-10 inline-flex items-center px-4 rounded-full bg-transparent text-muted-foreground border border-border/60 text-xs md:text-sm font-medium hover:bg-secondary/60 hover:text-foreground"
                  }
                  onClick={() => {
                    setActivePremierFormat(item.id);
                    logEvent(EVENT_TYPES.CTA_CLICK, {
                      ctaName: "premier_format_click",
                      format: item.label,
                    });
                  }}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: HERO + RAILS */}
      <div className="space-y-6">
        {/* Hero - Premier Window (Fixed Height Banner) */}
        <section className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Premier Window
          </p>
          <div className="rounded-3xl bg-card border border-border/60 shadow-lg overflow-hidden">
            {/* True 16:9 Key Art with Reduced Height */}
            <div
              className="relative w-full aspect-video max-h-[450px] bg-black cursor-pointer group rounded-3xl overflow-hidden"
              style={
                heroVideo?.thumbnail
                  ? {
                      backgroundImage: `url(${heroVideo.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
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
              {/* Dark gradient overlay so the image doesn't nuke the UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              {/* Bottom-left content block */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                  {heroVideo?.title || "Featured Content"}
                </h1>
                <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
                  {heroVideo?.tagline ||
                    heroVideo?.description ||
                    "Hot new feature, trailer, or event picked for you. The most relevant content for your profile and data-profile appears here."}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {/* Watch Now */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeroWatchNow();
                    }}
                    className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm md:text-base font-semibold shadow-md hover:bg-primary/90"
                  >
                    Watch Now
                  </button>
                  {/* More info */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeroMoreInfo();
                    }}
                    className="rounded-full bg-white/12 border border-white/30 text-white px-5 py-2 text-sm md:text-base font-medium hover:bg-white/18"
                  >
                    More info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rails */}
        <section className="space-y-6" aria-label="OnDemand video rails">
          {railsWithItems.map((rail) => {
            const isScrolledToEnd = railScrollStates[rail.id] || false;
            
            // Prepend active genre label to featured rail
            const activePremierGenreLabel = PREMIER_GENRES.find(g => g.id === activePremierGenre)?.label || "";
            const heading = rail.id === "featured" 
              ? `${activePremierGenreLabel} – ${rail.title}`
              : rail.title;
            
            // Determine if this is the first rail (featured) for format badges
            const isFirstRail = rail.id === "featured";
            
            return (
              <div key={rail.id} id={`rail-${rail.id}`} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {heading}
                  </h2>
                  <button
                    type="button"
                    className="text-[11px] md:text-xs text-muted-foreground hover:text-[#3b82a6] inline-flex items-center gap-1 transition-colors"
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
                          {isFirstRail && (
                            <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-[#3b82a6] text-white font-semibold">
                              {activePremierFormat === "horizontal" ? "16:9" : "9:16"}
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
