import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useViaContent } from "../context/ViaContentContext.jsx";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

export function ViewerPage() {
  const { id } = useParams();
  const rails = videoData.rails || [];

  const { video, railId } = useMemo(() => {
    let foundVideo = null;
    let foundRailId = null;
    rails.forEach((rail) => {
      rail.items?.forEach((item) => {
        if (!foundVideo && String(item.id) === String(id)) {
          foundVideo = item;
          foundRailId = rail.id;
        }
      });
    });
    return { video: foundVideo, railId: foundRailId };
  }, [rails, id]);

  const { setCurrentContentId } = useViaContent();
  const { logEvent } = useWashingtonEvents("viewer");

  useEffect(() => {
    if (video) {
      setCurrentContentId(video.id);
      logEvent(EVENT_TYPES.PAGE_VIEW, {
        route: "viewer",
        videoId: video.id,
        railId,
        title: video.title,
      });
    } else {
      setCurrentContentId(null);
    }
  }, [video, railId, setCurrentContentId, logEvent]);

  if (!video) {
    return (
      <div className="text-sm">
        <p className="text-muted-foreground">
          Video not found. Go back to the {" "}
          <Link to="/" className="underline">
            OnDemand list
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
      <section className="flex justify-center" aria-label="Video player">
        <div className="w-full max-w-xs md:max-w-sm rounded-2xl border border-border bg-foreground p-1.5">
          <div className="relative pt-[177%] rounded-xl bg-gradient-to-b from-secondary to-background flex items-center justify-center text-xs text-muted-foreground">
            <span className="absolute inset-0 flex items-center justify-center">Vertical video placeholder</span>
          </div>
        </div>
      </section>
      <aside className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">{video.title}</h1>
        <p className="text-sm text-muted-foreground">{video.meta}</p>
        <p className="text-xs text-muted-foreground">Duration: {video.duration}</p>
        <Link to="/" className="inline-flex text-xs text-primary underline mt-2">
          Back to OnDemand
        </Link>
      </aside>
    </div>
  );
}
