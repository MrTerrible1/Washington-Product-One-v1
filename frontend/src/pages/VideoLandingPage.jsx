import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import { useViaContent } from "../context/ViaContentContext.jsx";

const GENRES = [
  { id: "video", label: "Video" },
  { id: "music", label: "Music" },
  { id: "games", label: "Games" },
  { id: "books", label: "Books" },
];

export function VideoLandingPage() {
  const rails = videoData.rails || [];
  const { logEvent } = useWashingtonEvents("video-landing");
  const { setCurrentContentId } = useViaContent();
  const navigate = useNavigate();
  const firstRailRef = useRef(null);
  const [activeGenre, setActiveGenre] = useState("video");

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, { source: "video-landing", route: "ondemand" });
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

  const handleHeroScroll = () => {
    if (firstRailRef.current) {
      firstRailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const railsWithItems = rails.filter((rail) => (rail.items || []).length > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px,minmax(0,1fr)]">
      {/* Left: genre rail */}
      <aside className="hidden lg:flex flex-col gap-4 border-r border-border/70 pr-4">
        <div className="space-y-1">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Browse
          </div>
          <div className="text-sm text-foreground font-medium">
            OnDemand genres
          </div>
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          {GENRES.map((genre) => {
            const isActive = genre.id === activeGenre;
            return (
              <button
                key={genre.id}
                type="button"
                className={
                  isActive
                    ? "flex items-center justify-between rounded-full px-3 py-1.5 bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "flex items-center justify-between rounded-full px-3 py-1.5 bg-background/40 border border-border/60 text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                }
                onClick={() => {
                  setActiveGenre(genre.id);
                  logEvent(EVENT_TYPES.CTA_CLICK, {
                    ctaName: "genre_click",
                    genreId: genre.id,
                    genreLabel: genre.label,
                  });
                }}
              >
                <span>{genre.label}</span>
                {isActive && <span className="text-[11px] opacity-80">●</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Right: hero + rails */}
      <div className="space-y-8">
        {/* Hero */}
        <section className="rounded-3xl bg-card border border-border/60 shadow-lg p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-xl">
              <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                Guest OnDemand
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                OnDemand for Washington
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-md">
                A curated preview of Washington&apos;s OnDemand Stream. Drop into sessions without creating an account.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleHeroScroll}
                  className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Watch Now
                </button>
                <button
                  type="button"
                  onClick={handleHeroScroll}
                  className="inline-flex items-center justify-center rounded-full border border-primary/60 text-xs md:text-sm text-primary px-3 py-1 hover:bg-primary/10 transition-colors"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Rails */}
        <section className="space-y-8" aria-label="OnDemand video rails">
        {railsWithItems.map((rail, index) => (
          <div
            key={rail.id}
            className="space-y-3"
            ref={index === 0 ? firstRailRef : undefined}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">{rail.title}</h2>
              <button
                type="button"
                className="text-[11px] md:text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                onClick={() =>
                  logEvent(EVENT_TYPES.CTA_CLICK, {
                    ctaName: "rail_see_all",
                    railId: rail.id,
                  })
                }
              >
                See all
                <span aria-hidden>→</span>
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {rail.items.map((video, cardIndex) => {
                const isHighlighted = cardIndex === 0 || cardIndex === 1;
                const thumbnail = video.thumbnail || "";
                const genre = video.genre || "";

                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleCardClick(rail.id, video)}
                    className="group w-44 md:w-52 shrink-0 text-left"
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
        ))}
        </section>
      </div>
    </div>
  );
}
