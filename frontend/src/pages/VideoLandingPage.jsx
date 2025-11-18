import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import { useViaContent } from "../context/ViaContentContext.jsx";

export function VideoLandingPage() {
  const rails = videoData.rails || [];
  const { logEvent } = useWashingtonEvents("video-landing");
  const { setCurrentContentId } = useViaContent();
  const navigate = useNavigate();
  const firstRailRef = useRef(null);

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
    <div className="space-y-10">
      {/* Hero */}
      <section className="group rounded-3xl overflow-hidden shadow-xl border border-border max-w-6xl mx-auto">
        <div className="relative w-full pt-[56.25%] bg-foreground overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/0" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="space-y-2 max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.26em] text-white/70">
                Guest OnDemand
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                OnDemand for Washington
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-md">
                A curated preview of Washington&apos;s OnDemand Stream. Drop into sessions without creating an account.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleHeroScroll}
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Watch Now
              </button>
              <button
                type="button"
                onClick={handleHeroScroll}
                className="inline-flex items-center justify-center rounded-full border border-white/60 text-xs md:text-sm text-white/90 px-3 py-1 hover:bg-white/10 transition-colors"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rails */}
      <section className="space-y-8 max-w-6xl mx-auto" aria-label="OnDemand video rails">
        {railsWithItems.map((rail, index) => (
          <div
            key={rail.id}
            className="space-y-3"
            ref={index === 0 ? firstRailRef : undefined}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base md:text-lg font-semibold tracking-tight">{rail.title}</h2>
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
                    <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                      <div className="relative pt-[56.25%] bg-gradient-to-br from-accent to-muted overflow-hidden">
                        {thumbnail && (
                          <div
                            className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                            style={{ backgroundImage: `url(${thumbnail})` }}
                          />
                        )}
                        {!thumbnail && (
                          <div className="absolute inset-0 bg-gradient-to-br from-accent to-muted group-hover:brightness-110 transition-[filter,transform] duration-300" />
                        )}
                        <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-foreground/60 rounded-2xl pointer-events-none" />
                        {genre && (
                          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70 text-white">
                            {genre}
                          </span>
                        )}
                        {isHighlighted && (
                          <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-semibold">
                            {rail.id === "featured" ? "FEATURED" : "NEW"}
                          </span>
                        )}
                        {video.duration && (
                          <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/80 text-white">
                            {video.duration}
                          </span>
                        )}
                      </div>
                      <div className="px-3 py-3 space-y-1">
                        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
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
  );
}
