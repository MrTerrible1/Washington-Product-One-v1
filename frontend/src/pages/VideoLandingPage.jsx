import { useEffect } from "react";
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

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, { route: "landing" });
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
    // Simple hero CTA: send users to the first featured item if available
    const featuredRail = rails.find((rail) => rail.id === "featured");
    const first = featuredRail?.items?.[0];
    if (!first) return;
    handleCardClick("featured", first);
  };

  // Helper to render rails: Featured, Trending, New Releases, Top Picks for Guest
  const orderedRails = [
    { id: "featured", title: "Featured" },
    { id: "trending", title: "Trending Now" },
    { id: "new", title: "New Releases" },
    { id: "guest-top", title: "Top Picks for Guest" },
  ]
    .map(({ id, title }) => ({
      id,
      title,
      items: (rails.find((r) => r.id === id)?.items || []),
    }))
    .filter((rail) => rail.items.length > 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-[1.5fr_minmax(0,1fr)] gap-0">
          <div className="relative">
            <div className="w-full pt-[56.25%] bg-gradient-to-br from-foreground/90 via-foreground/70 to-background" />
            <div className="absolute inset-0 flex items-end justify-between p-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-background/70">
                Guest OnDemand
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-background/15 text-background/80 border border-background/20">
                Vertical preview
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 p-5 md:p-6 bg-card">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                OnDemand for Washington
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                Drop into curated Washington sessions as a guest. No signups, no friction—just vertical previews of
                the Washington platform.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={handleHeroClick}
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Watch Now
              </button>
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Guest preview · No account
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content rails */}
      <section className="space-y-6" aria-label="OnDemand video rails">
        {orderedRails.map((rail) => (
          <div key={rail.id} className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">{rail.title}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {rail.items.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleCardClick(rail.id, video)}
                  className="group w-40 md:w-48 shrink-0 text-left"
                >
                  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-transform transition-shadow duration-150">
                    <div className="relative pt-[150%] bg-gradient-to-br from-accent to-muted">
                      <div className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-full bg-foreground text-background">
                        Vertical
                      </div>
                      <div className="absolute bottom-2 right-2 text-[11px] px-2 py-0.5 rounded-full bg-foreground text-background">
                        {video.duration}
                      </div>
                    </div>
                    <div className="px-3 py-3 space-y-1">
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2">{video.title}</h3>
                      <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                        {video.meta}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
