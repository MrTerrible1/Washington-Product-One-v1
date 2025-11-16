import { useEffect } from "react";
import { Link } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import { useViaContent } from "../context/ViaContentContext.jsx";

export function VideoLandingPage() {
  const rails = videoData.rails || [];
  const { logEvent } = useWashingtonEvents("video-landing");
  const { setCurrentContentId } = useViaContent();

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
  };

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">OnDemand for Washington</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Drop into curated Washington sessions as a guest. No signups, no friction—just vertical video previews.
        </p>
      </section>

      <section className="space-y-8" aria-label="OnDemand video rails">
        {rails.map((rail) => (
          <div key={rail.id} className="space-y-3">
            <h2 className="text-lg font-semibold">{rail.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {rail.items?.map((video) => (
                <article key={video.id} className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col">
                  <Link
                    to={`/watch/${video.id}`}
                    className="flex flex-col h-full"
                    onClick={() => handleCardClick(rail.id, video)}
                  >
                    <div className="relative pt-[150%] bg-gradient-to-br from-accent to-muted">
                      <div className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-full bg-foreground text-background">
                        Vertical
                      </div>
                      <div className="absolute bottom-2 right-2 text-[11px] px-2 py-0.5 rounded-full bg-foreground text-background">
                        {video.duration}
                      </div>
                    </div>
                    <div className="px-3 py-3 flex-1 flex flex-col">
                      <h3 className="text-sm font-semibold mb-1">{video.title}</h3>
                      <p className="text-xs text-muted-foreground leading-snug flex-1">{video.meta}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
