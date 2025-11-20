import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

export function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useWashingtonEvents("content-page");

  const rails = videoData.rails || [];
  const allVideos = rails.flatMap((r) => r.items || []);

  const video = allVideos.find((v) => String(v.id) === String(id)) || allVideos[0];

  useEffect(() => {
    if (id) {
      logEvent(EVENT_TYPES.PAGE_VIEW, {
        route: "content",
        contentId: id,
      });
    }
  }, [id, logEvent]);

  if (!video) {
    return (
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-0">
        <p className="text-sm text-muted-foreground">Content not found.</p>
      </div>
    );
  }

  const handleMoreClick = (targetVideo) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "discovery_rail_click",
      videoId: targetVideo.id,
      title: targetVideo.title,
    });
    navigate(`/content/${targetVideo.id}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-0 space-y-8">
      {/* Top layout */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] items-start">
        {/* Left: player + primary info */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-card border border-border/60 aspect-video flex items-center justify-center text-sm text-muted-foreground">
            VIDEO PREVIEW UNAVAILABLE (GUEST MODE)
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
              {video.duration && <span>{video.duration}</span>}
              {video.genre && (
                <span className="inline-flex items-center rounded-full px-2 py-0.5 border border-border/70 text-[11px] uppercase tracking-wide">
                  {video.genre}
                </span>
              )}
              <span>Guest preview · OnDemand</span>
            </div>
            {video.tagline && (
              <p className="text-sm text-muted-foreground max-w-xl">
                {video.tagline}
              </p>
            )}
          </div>

          {/* Primary actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
              Play (login required)
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-border/70 px-3 py-1.5 text-xs md:text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
              Add to list
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-border/70 px-3 py-1.5 text-xs md:text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
              Share
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-primary/70 px-3 py-1.5 text-xs md:text-sm text-primary hover:bg-primary/10 transition-colors">
              Login to follow creator
            </button>
          </div>
        </div>

        {/* Right: about / credits / sponsor */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-card border border-border/60 p-4 space-y-2">
            <h2 className="text-sm font-semibold tracking-tight">About this session</h2>
            <p className="text-sm text-muted-foreground">
              {video.description || video.meta || "Session description to be provided by the creator."}
            </p>
          </div>

          <div className="rounded-2xl bg-card border border-border/60 p-4 space-y-2">
            <h2 className="text-sm font-semibold tracking-tight">Credits & collaborators</h2>
            <dl className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt>Creator</dt>
                <dd className="font-medium text-foreground">{video.creator || "Example Creator"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Brand</dt>
                <dd className="font-medium text-foreground">{video.brand || "Washington"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Sponsor</dt>
                <dd className="font-medium text-foreground">{video.sponsor || "TBD Sponsor"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-card border border-border/60 p-4 space-y-2">
            <h2 className="text-sm font-semibold tracking-tight">Brand spotlight</h2>
            <div className="rounded-xl bg-muted h-24 flex items-center justify-center text-xs text-muted-foreground">
              Example sponsor placement
            </div>
          </div>
        </aside>
      </section>

      {/* Discovery rails */}
      <section className="space-y-8">
        {/* More from this creator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              More from {video.creator || "this creator"}
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 pr-2">
            {allVideos
              .filter((v) => v.id !== video.id && v.creator === video.creator)
              .slice(0, 8)
              .map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleMoreClick(v)}
                  className="group w-40 sm:w-44 md:w-48 shrink-0 text-left"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/70 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                    <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/40 to-muted overflow-hidden">
                      {v.thumbnail && (
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                          style={{ backgroundImage: `url(${v.thumbnail})` }}
                        />
                      )}
                      {!v.thumbnail && (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-muted group-hover:brightness-110 transition-[filter,transform] duration-300" />
                      )}
                      <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/70 rounded-2xl pointer-events-none" />
                      {v.genre && (
                        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">
                          {v.genre}
                        </span>
                      )}
                      {v.duration && (
                        <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/80 text-white">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-3 space-y-1">
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
                        {v.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                        {v.tagline || v.meta}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* More like this */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              More like this
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 pr-2">
            {allVideos
              .filter((v) => v.id !== video.id && v.genre === video.genre)
              .slice(0, 8)
              .map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleMoreClick(v)}
                  className="group w-40 sm:w-44 md:w-48 shrink-0 text-left"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/70 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                    <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/40 to-muted overflow-hidden">
                      {v.thumbnail && (
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                          style={{ backgroundImage: `url(${v.thumbnail})` }}
                        />
                      )}
                      {!v.thumbnail && (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-muted group-hover:brightness-110 transition-[filter,transform] duration-300" />
                      )}
                      <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/70 rounded-2xl pointer-events-none" />
                      {v.genre && (
                        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">
                          {v.genre}
                        </span>
                      )}
                      {v.duration && (
                        <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/80 text-white">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-3 space-y-1">
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
                        {v.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                        {v.tagline || v.meta}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContentPage;
