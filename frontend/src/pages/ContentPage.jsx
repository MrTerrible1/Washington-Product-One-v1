import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const PROFILE_TABS = [
  { id: "info", label: "Info" },
  { id: "promo", label: "Promo" },
  { id: "stills", label: "Stills" },
  { id: "bts", label: "BTS" },
  { id: "credits", label: "Credits" },
];

export function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useWashingtonEvents("content-page");

  const [showFollowHint, setShowFollowHint] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

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

  const handleCardClick = (source, targetVideo) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "discovery_rail_click",
      source,
      videoId: targetVideo.id,
      title: targetVideo.title,
    });
    navigate(`/content/${targetVideo.id}`);
  };

  const handleBackToOnDemand = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_back_to_ondemand",
      videoId: video.id,
    });
    navigate("/");
  };

  const handleAddToWatchlist = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_add_to_watchlist",
      videoId: video.id,
    });
  };

  const handleShare = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_share_click",
      videoId: video.id,
    });
  };

  const handlePlay = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_play_click",
      videoId: video.id,
    });
  };

  const handleTrailer = () => {
    setActiveTab("promo");
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_trailer_click",
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

  // Get similar videos for "More like this"
  const genreMatches = allVideos.filter(v => v.id !== video.id && v.genre === video.genre);
  const similarVideos = genreMatches.length > 0 
    ? genreMatches.slice(0, 4)
    : allVideos.filter(v => v.id !== video.id).slice(0, 4);
  const creatorVideos = allVideos.filter(v => v.id !== video.id && v.creator === video.creator).slice(0, 8);

  return (
    <div>
      {/* THREE-COLUMN GRID */}
      <div className="grid gap-6 md:grid-cols-[120px_minmax(0,2.3fr)_minmax(320px,1fr)] items-start">
        {/* LEFT COLUMN - Minimal controls */}
        <aside className="hidden md:flex flex-col gap-3">
          <button
            type="button"
            onClick={handleBackToOnDemand}
            className="h-10 w-full rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center hover:bg-primary/90"
          >
            Back to OnDemand
          </button>
          <button
            type="button"
            onClick={handleAddToList}
            className="h-10 w-full rounded-full border border-border text-sm text-foreground flex items-center justify-center hover:bg-secondary/60"
          >
            Add to watch list
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="h-10 w-full rounded-full border border-border text-sm text-foreground flex items-center justify-center hover:bg-secondary/60"
          >
            Share
          </button>
        </aside>

        {/* CENTER COLUMN - HERO + TABS */}
        <div className="flex flex-col">
          {/* Hero Preview */}
          <div className="aspect-video max-h-[360px] w-full rounded-3xl bg-[#101318] overflow-hidden border border-border/60">
            <div className="w-full h-full flex items-center justify-center bg-background">
              <p className="text-sm text-muted-foreground">
                VIDEO PREVIEW UNAVAILABLE (GUEST MODE)
              </p>
            </div>
          </div>

          {/* PROFILE TABS - Directly under hero */}
          <nav className="mt-4 border-b border-border/60 flex gap-4">
            {PROFILE_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    isActive
                      ? "pb-3 text-sm md:text-base font-semibold text-foreground border-b-2 border-primary"
                      : "pb-3 text-sm md:text-base text-muted-foreground hover:text-foreground"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* ACTIVE TAB CONTENT - No max-height, expands naturally */}
          <div className="mt-4">
            {activeTab === "info" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">Synopsis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description || video.tagline || video.meta || "Detailed description to be provided by the creator."}
                  </p>
                </div>
                {video.genre && (
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Genre:</span>
                      <span className="ml-2 text-foreground font-medium">{video.genre}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "promo" && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Promo Videos</h3>
                <div className="grid grid-cols-3 gap-3">
                  {["Trailer", "Sizzle Reel", "Teaser"].map((promoType, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        logEvent(EVENT_TYPES.CTA_CLICK, {
                          ctaName: "content_promo_click",
                          promoType: promoType,
                          videoId: video.id,
                        });
                      }}
                      className="group relative aspect-video rounded-xl bg-muted/60 border border-border/60 overflow-hidden hover:border-primary/60 transition"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-foreground">{promoType}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "stills" && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Official Stills</h3>
                <p className="text-sm text-muted-foreground">Key art frames and still images from this title will appear here in the full product.</p>
              </div>
            )}
            {activeTab === "bts" && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Behind the Scenes</h3>
                <p className="text-sm text-muted-foreground">Behind-the-scenes content, production notes, and creator commentary will appear here in the full product.</p>
              </div>
            )}
            {activeTab === "credits" && (
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4">Full Credits</h3>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground mb-1">Creator</dt>
                    <dd className="font-medium text-foreground">{video.creator || "Example Creator"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Sponsor</dt>
                    <dd className="font-medium text-foreground">{video.sponsor || "TBD Sponsor"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Brand</dt>
                    <dd className="font-medium text-foreground">{video.brand || "Washington"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Genre</dt>
                    <dd className="font-medium text-foreground">{video.genre || "—"}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* DISCOVERY RAILS - Separate section after tabs */}
          <section className="mt-8 space-y-6">
            {/* More from this creator */}
            {creatorVideos.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                More from this creator
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {creatorVideos.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleCardClick("more_from_creator", v)}
                    className="group w-40 sm:w-44 md:w-48 shrink-0 text-left"
                  >
                    <div className="rounded-2xl overflow-hidden bg-card border border-border/70 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                      <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/40 to-muted overflow-hidden">
                        {v.thumbnail ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                            style={{ backgroundImage: `url(${v.thumbnail})` }}
                          />
                        ) : (
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
            )}

            {/* More from this sponsor */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                More from this sponsor
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {allVideos
                .filter((v) => v.id !== video.id)
                .slice(0, 8)
                .map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleCardClick("more_from_sponsor", v)}
                    className="group w-40 sm:w-44 md:w-48 shrink-0 text-left"
                  >
                    <div className="rounded-2xl overflow-hidden bg-card border border-border/70 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                      <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/40 to-muted overflow-hidden">
                        {v.thumbnail ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center group-hover:brightness-110 transition-[filter,transform] duration-300"
                            style={{ backgroundImage: `url(${v.thumbnail})` }}
                          />
                        ) : (
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
              <h2 className="text-lg font-semibold tracking-tight text-foreground">More like this</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {similarVideos.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCardClick("more_like_this_rail", item)}
                    className="group w-40 sm:w-44 md:w-48 shrink-0 text-left"
                  >
                    <div className="rounded-2xl overflow-hidden bg-card/80 border border-border/50 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-transform transition-shadow duration-200">
                      <div className="relative pt-[56.25%] bg-gradient-to-br from-accent/30 to-muted/70 overflow-hidden">
                        {item.thumbnail ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                            style={{ backgroundImage: `url(${item.thumbnail})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-muted/70 group-hover:opacity-90 transition-opacity" />
                        )}
                        <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/50 rounded-2xl pointer-events-none" />
                        {item.genre && (
                          <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">
                            {item.genre}
                          </span>
                        )}
                        {item.duration && (
                          <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full bg-black/80 text-white">
                            {item.duration}
                          </span>
                        )}
                      </div>
                      <div className="px-3 py-3 space-y-1">
                        <h3 className="text-sm md:text-base font-semibold leading-snug line-clamp-2 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                          {item.tagline || item.meta}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - Title, meta, CTAs */}
        <aside className="space-y-4">
          {/* Title block */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {video.title}
            </h1>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              {video.duration} • FEATURE • Guest preview · OnDemand
            </p>
            <p className="mt-2 text-sm md:text-base text-muted-foreground line-clamp-3">
              {video.description || video.tagline || "A curated Washington experience."}
            </p>
          </div>

          {/* CTA cluster */}
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={handlePlay}
              className="w-full rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm md:text-base font-semibold shadow-md hover:bg-primary/90"
            >
              Play (login required)
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleAddToList}
                className="flex-1 rounded-full border border-border px-4 py-2 text-xs md:text-sm text-foreground hover:bg-secondary/60"
              >
                Add to watch list
              </button>
              <button
                type="button"
                onClick={handleLike}
                className="flex-1 rounded-full border border-border px-4 py-2 text-xs md:text-sm text-foreground hover:bg-secondary/60"
              >
                Like
              </button>
              <button
                type="button"
                onClick={handleFollow}
                className="flex-1 rounded-full border border-primary/70 text-primary px-4 py-2 text-xs md:text-sm font-medium hover:bg-primary/10"
              >
                Follow creator
              </button>
            </div>

            {/* Follow Hint */}
            {showFollowHint && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                To follow creators and get updates, you&apos;ll need a free Washington profile.
              </p>
            )}
          </div>

          {/* More from this creator */}
          <section>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">
              More from this creator
            </h3>
            <div className="space-y-2">
              {creatorVideos.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCardClick("more_from_creator_sidebar", item)}
                  className="w-full h-14 flex items-center gap-3 rounded-xl bg-[#101318]/50 border border-border/40 hover:border-border/70 hover:bg-[#101318]/70 px-3 py-2 text-left transition"
                >
                  <div className="h-10 w-16 rounded-lg bg-muted/30 overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <div
                        className="w-full h-full bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/15 to-muted/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground/90 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.duration}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Sponsor card */}
          <div className="mt-4 rounded-2xl border border-border/60 bg-card px-4 py-3 text-xs text-muted-foreground">
            <div className="uppercase tracking-[0.18em] text-[10px] mb-1">Sponsored by</div>
            <div className="text-sm text-foreground">{video.sponsor || video.brand || "Washington"}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ContentPage;
