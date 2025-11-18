import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

export function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useWashingtonEvents("content-page");

  const { item, railId, moreLikeThis } = useMemo(() => {
    const rails = videoData.rails || [];
    let foundItem = null;
    let foundRailId = null;

    rails.forEach((rail) => {
      rail.items?.forEach((video) => {
        if (!foundItem && String(video.id) === String(id)) {
          foundItem = video;
          foundRailId = rail.id;
        }
      });
    });

    const moreFromRail = foundRailId
      ? rails.find((r) => r.id === foundRailId)?.items || []
      : rails.flatMap((r) => r.items || []);

    const filteredMore = moreFromRail.filter((video) => String(video.id) !== String(id));

    return {
      item: foundItem,
      railId: foundRailId,
      moreLikeThis: filteredMore,
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      logEvent(EVENT_TYPES.PAGE_VIEW, {
        route: "content",
        contentId: id,
      });
    }
  }, [id, logEvent]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-sm text-muted-foreground">
        <p>Content not found. You may have followed an outdated link.</p>
      </div>
    );
  }

  const description =
    item.description ||
    "Description coming soon. This session is part of the Washington Product One guest preview.";

  const credits = item.credits || {
    creator: "Example Creator",
    starring: ["A. Actor", "B. Actor"],
  };

  const handleMoreClick = (video) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "more_like_this_click",
      railId: railId || "unknown",
      videoId: video.id,
      title: video.title,
    });
    navigate(`/content/${video.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Hero video placeholder */}
      <section className="space-y-4">
        <div className="w-full rounded-3xl bg-foreground text-background flex items-center justify-center aspect-video">
          <span className="text-xs md:text-sm tracking-wide uppercase">
            Video Preview Unavailable (Guest Mode)
          </span>
        </div>
      </section>

      {/* Title + metadata */}
      <section className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{item.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
          {item.duration && <span>{item.duration}</span>}
          {item.genre && (
            <span className="px-2 py-0.5 rounded-full border border-border text-[11px] uppercase tracking-[0.16em]">
              {item.genre}
            </span>
          )}
          {item.format && <span>{item.format}</span>}
          {item.releaseType && <span>{item.releaseType}</span>}
        </div>
      </section>

      {/* Description */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold tracking-tight">About this session</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </section>

      {/* Credits */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold tracking-tight">Credits</h2>
        <dl className="space-y-1 text-sm text-muted-foreground">
          {credits.creator && (
            <div className="flex gap-2">
              <dt className="w-20 text-xs uppercase tracking-[0.16em]">Creator</dt>
              <dd>{credits.creator}</dd>
            </div>
          )}
          {Array.isArray(credits.starring) && credits.starring.length > 0 && (
            <div className="flex gap-2">
              <dt className="w-20 text-xs uppercase tracking-[0.16em]">Starring</dt>
              <dd>{credits.starring.join(", ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* More Like This rail */}
      {moreLikeThis.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm md:text-base font-semibold tracking-tight">More Like This</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {moreLikeThis.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => handleMoreClick(video)}
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
        </section>
      )}
    </div>
  );
}
