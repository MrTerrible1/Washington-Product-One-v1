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

  const handleHeroClick = () => {
    const featuredRail = rails.find((rail) => rail.id === "featured");
    const first = featuredRail?.items?.[0];
    if (!first) return;
    handleCardClick("featured", first);
  };

  const handleHeroLearnMore = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "hero_learn_more",
    });
    if (firstRailRef.current) {
      firstRailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const orderedRails = [
    { id: "featured", title: "Featured" },
    { id: "trending", title: "Trending Now" },
    { id: "new", title: "New Releases" },
    { id: "guest-top", title: "Top Picks for Guest" },
  ]
    .map(({ id, title }) => ({
      id,
      title,
      items: rails.find((r) => r.id === id)?.items || [],
    }))
    .filter((rail) => rail.items.length > 0);

  const handleSidebarClick = (label) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "sidebar_click",
      label,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Layout: sidebar (desktop) + main content */}
      <div className="hidden lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar */}
        <aside className="rounded-2xl bg-card border border-border p-4 h-fit">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-3">
            Explore Washington
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Verticals
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "Video", active: true },
                  { label: "Music", active: false },
                  { label: "Games", active: false },
                  { label: "Books", active: false },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleSidebarClick(item.label)}
                      className={`w-full text-left text-xs px-2 py-1 rounded-md hover:bg-secondary transition-colors ${
                        item.active ? "font-semibold border-l-2 border-foreground pl-1.5" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Silos
              </h3>
              <ul className="space-y-1">
                {["Crowdfunding", "Store", "Social"].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => handleSidebarClick(label)}
                      className="w-full text-left text-xs px-2 py-1 rounded-md hover:bg-secondary transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="space-y-10">
          {/* Hero */}
          <section className="rounded-3xl overflow-hidden shadow-xl border border-border">
            <div className="relative w-full pt-[56.25%] bg-foreground">
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url(/hero/heroDefault.jpg)" }}
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
                    onClick={handleHeroClick}
                    className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Watch Now
                  </button>
                  <button
                    type="button"
                    onClick={handleHeroLearnMore}
                    className="inline-flex items-center justify-center rounded-full border border-white/60 text-xs md:text-sm text-white/90 px-3 py-1 hover:bg-white/10 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Rails */}
          <section className="space-y-8" aria-label="OnDemand video rails" ref={firstRailRef}>
            {orderedRails.map((rail) => (
              <div key={rail.id} className="space-y-3">
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
                    See All
                    <span aria-hidden>→</span>
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {rail.items.map((video, index) => {
                    const isHighlighted = index === 0 || index === 1;
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
      </div>

      {/* Mobile/tablet: hero + rails only (no sidebar) */}
      <div className="lg:hidden space-y-8">
        <section className="rounded-3xl overflow-hidden shadow-xl border border-border">
          <div className="relative w-full pt-[56.25%] bg-foreground">
            <div className="absolute inset-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url(/hero/heroDefault.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/0" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="space-y-2 max-w-xs">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/70">
                  Guest OnDemand
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  OnDemand for Washington
                </h1>
                <p className="text-xs text-white/80">
                  A curated preview of Washington&apos;s OnDemand Stream. Drop into sessions without creating an
                  account.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={handleHeroClick}
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-3 py-1.5 text-xs font-medium hover:bg-white/90 transition-colors"
                >
                  Watch Now
                </button>
                <button
                  type="button"
                  onClick={handleHeroLearnMore}
                  className="inline-flex items-center justify-center rounded-full border border-white/60 text-[11px] text-white/90 px-3 py-1 hover:bg-white/10 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8" aria-label="OnDemand video rails" ref={firstRailRef}>
          {orderedRails.map((rail) => (
            <div key={rail.id} className="space-y-3">
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
                  See All
                  <span aria-hidden>→</span>
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {rail.items.map((video, index) => {
                  const isHighlighted = index === 0 || index === 1;
                  const thumbnail = video.thumbnail || "";
                  const genre = video.genre || "";

                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleCardClick(rail.id, video)}
                      className="group w-40 md:w-48 shrink-0 text-left"
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
                          <h3 className="text-sm font-semibold leading-snug line-clamp-2">{video.title}</h3>
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
    </div>
  );
}
