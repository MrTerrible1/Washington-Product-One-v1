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
    <div className="space-y-8">
      {/* Top session band */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
        {/* Left: player / preview */}
        <div className="rounded-3xl bg-card border border-border/60 overflow-hidden">
          <div className="relative pt-[56.25%] bg-muted flex items-center justify-center text-xs text-muted-foreground">
            <span>Preview unavailable in guest mode</span>
          </div>
        </div>

        {/* Right: session + creator info */}
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Product episode
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {item.title}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>

          <div className="rounded-2xl bg-secondary/30 border border-border/60 p-3 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/70 flex items-center justify-center text-[11px] font-semibold text-primary-foreground">
                {credits.creator ? credits.creator.substring(0, 2).toUpperCase() : "EC"}
              </div>
              <div>
                <div className="text-sm font-medium">{credits.creator || "Example Creator"}</div>
                <div className="text-[11px] text-muted-foreground">
                  {item.genre || "Product walkthroughs"} · {item.format || "Documentaries"}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button className="rounded-full px-3 py-1 bg-card border border-border/60 text-muted-foreground">
                More from this creator
              </button>
              <button className="rounded-full px-3 py-1 bg-card border border-border/60 text-muted-foreground">
                Collaborate (demo)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery rails */}
      <section className="space-y-8 mt-8">
        {/* More from this creator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              More from this creator
            </h2>
            <span className="text-[11px] text-muted-foreground">
              View creator profile
            </span>
          </div>
          {/* TODO: reuse the card rail pattern from VideoLandingPage */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="w-44 md:w-52 shrink-0 rounded-2xl bg-card border border-border/70 px-3 py-4 text-[11px] text-muted-foreground flex items-center justify-center">
              Placeholder card
            </div>
            <div className="w-44 md:w-52 shrink-0 rounded-2xl bg-card border border-border/70 px-3 py-4 text-[11px] text-muted-foreground flex items-center justify-center">
              Placeholder card
            </div>
          </div>
        </div>

        {/* Similar sessions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Similar sessions
            </h2>
            <span className="text-[11px] text-muted-foreground">
              VIA: based on what you&apos;re watching
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {moreLikeThis.length > 0 ? (
              moreLikeThis.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleMoreClick(video)}
                  className="group w-44 md:w-52 shrink-0 text-left"
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
              ))
            ) : (
              <>
                <div className="w-44 md:w-52 shrink-0 rounded-2xl bg-card border border-border/70 px-3 py-4 text-[11px] text-muted-foreground flex items-center justify-center">
                  Placeholder card
                </div>
                <div className="w-44 md:w-52 shrink-0 rounded-2xl bg-card border border-border/70 px-3 py-4 text-[11px] text-muted-foreground flex items-center justify-center">
                  Placeholder card
                </div>
              </>
            )}
          </div>
        </div>

        {/* Collaborators & brands */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Collaborators & brands
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl bg-card border border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
              Example Brand · Sponsorship demo
            </div>
            <div className="rounded-xl bg-card border border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
              Co-creator · Collaboration demo
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
