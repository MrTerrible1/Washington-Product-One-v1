import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const GENRES = ["Video", "Music", "Games", "Books"];

export function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useWashingtonEvents("content-page");

  const [showFollowHint, setShowFollowHint] = useState(false);

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

  const handlePlay = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_play_click",
      videoId: video.id,
    });
  };

  const handleAddToList = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_add_to_list_click",
      videoId: video.id,
    });
  };

  const handleLike = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_like_click",
      videoId: video.id,
    });
  };

  const handleFollow = () => {
    setShowFollowHint(true);
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_follow_click_guest",
      videoId: video.id,
    });
  };

  const activeGenre = "Video";

  return (
    <div className="grid gap-8 md:grid-cols-[140px_minmax(0,2.2fr)_minmax(0,1fr)]">
      {/* LEFT SIDEBAR - Browse Controls */}
      <aside className="hidden md:flex flex-col gap-1.5 pt-2">
        <p className="uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-1 px-2">
          Browse
        </p>
        {GENRES.map((label) => {
          const isActive = label === activeGenre;
          return (
            <button
              key={label}
              type="button"
              className={
                isActive
                  ? "h-10 inline-flex items-center px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm transition-all"
                  : "h-10 inline-flex items-center px-4 rounded-full bg-transparent text-muted-foreground border border-border/60 hover:bg-secondary/60 hover:text-foreground text-sm font-medium transition-all"
              }
              onClick={() => {
                logEvent(EVENT_TYPES.CTA_CLICK, {
                  ctaName: "content_genre_click",
                  genre: label,
                });
              }}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </aside>

      {/* MAIN COLUMN */}
      <div className="space-y-8">
        {/* Top section - Player + Primary Info */}
        <section className="space-y-4">
          {/* Video Preview */}
          <div className="rounded-3xl bg-card border border-border/60 aspect-video flex items-center justify-center text-sm text-muted-foreground">
            VIDEO PREVIEW UNAVAILABLE (GUEST MODE)
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-muted-foreground">
              {video.duration && <span>{video.duration}</span>}
              {video.genre && (
                <span className="inline-flex items-center rounded-full px-2 py-0.5 border border-border/70 text-[11px] uppercase tracking-wide">
                  {video.genre}
                </span>
              )}
              <span>Guest preview · OnDemand</span>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {video.tagline || video.description || "Overview not provided by creator yet. This title is part of the Washington guest library."}
            </p>
          </div>

          {/* Primary Action Row */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlay}
                className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm md:text-base font-semibold shadow-md hover:bg-primary/90"
              >
                Play (login required)
              </button>
              <button
                onClick={handleAddToList}
                className="rounded-full bg-secondary text-foreground px-5 py-2 text-sm md:text-base font-medium hover:bg-secondary/90"
              >
                Add to list
              </button>
              <button
                onClick={handleLike}
                className="rounded-full border border-border px-5 py-2 text-sm md:text-base text-foreground hover:bg-secondary/60"
              >
                Like
              </button>
              <button
                onClick={handleFollow}
                className="rounded-full border border-primary/70 text-primary px-5 py-2 text-sm md:text-base font-medium hover:bg-primary/10"
              >
                Follow creator
              </button>
            </div>

            {/* Follow Hint */}
            {showFollowHint && (
              <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-md">
                To follow creators and get updates, you&apos;ll need a free Washington profile.
                In the full product, VIA will walk you through setup from here.
              </p>
            )}
          </div>
        </section>

          {/* More from this creator */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              More from {video.creator || "this creator"}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 pr-2 scrollbar-hide">
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
                      <h3 className="text-base md:text-[17px] font-semibold leading-snug line-clamp-2 text-foreground">
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
                      <h3 className="text-base md:text-[17px] font-semibold leading-snug line-clamp-2 text-foreground">
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
