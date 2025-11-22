import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const PREMIER_CONTROLS = [
  { id: "back", label: "Back to OnDemand" },
  { id: "jump_genre", label: "Jump to Sci-Fi" },
  { id: "save", label: "Save for later" },
  { id: "remind", label: "Remind me" },
  { id: "share", label: "Share" },
];

const PROFILE_TABS = [
  { id: "promo", label: "Promo" },
  { id: "stills", label: "Stills" },
  { id: "bts", label: "BTS" },
  { id: "info", label: "Info" },
];

export function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useWashingtonEvents("content-page");

  const [showFollowHint, setShowFollowHint] = useState(false);
  const [activeTab, setActiveTab] = useState("promo");

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

  const handleWatch = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_watch_click",
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

  const handleFollowHero = () => {
    setShowFollowHint(true);
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_follow_click_hero",
      videoId: video.id,
    });
  };

  const handleControlClick = (control) => {
    if (control.id === "back") {
      navigate("/");
    }
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "content_control_click",
      control: control.id,
      videoId: video.id,
    });
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

  // Get similar videos for "More like this"
  const genreMatches = allVideos.filter(v => v.id !== video.id && v.genre === video.genre);
  const similarVideos = genreMatches.length > 0 
    ? genreMatches.slice(0, 5)
    : allVideos.filter(v => v.id !== video.id).slice(0, 5);
  const creatorVideos = allVideos.filter(v => v.id !== video.id && v.creator === video.creator).slice(0, 8);

  return (
    <div className="grid gap-8 md:grid-cols-[140px_minmax(0,2.2fr)_minmax(0,1.1fr)]">
      {/* LEFT SIDEBAR - Premier Controls */}
      <aside className="hidden md:flex flex-col gap-1.5 pt-2">
        <p className="uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-2 px-2">
          Premier controls
        </p>
        {PREMIER_CONTROLS.map((control, idx) => {
          // Jump to genre control should be primary/active
          const isActive = control.id === "jump_genre";
          return (
            <button
              key={control.id}
              type="button"
              className={
                isActive
                  ? "h-9 inline-flex items-center px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm"
                  : "h-9 inline-flex items-center px-4 rounded-full bg-transparent text-muted-foreground border border-border/60 hover:bg-secondary/60 hover:text-foreground text-sm font-medium"
              }
              onClick={() => handleControlClick(control)}
            >
              <span>{control.label}</span>
            </button>
          );
        })}
      </aside>

      {/* MAIN COLUMN */}
      <div className="space-y-6">
        {/* Top section - Hero + Title/CTAs above fold */}
        <section className="space-y-4">
          {/* Video Preview - fixed 16:9 */}
          <div className="rounded-3xl bg-card border border-border/60 overflow-hidden">
            <div className="relative w-full aspect-video max-h-[460px] lg:max-h-[420px] bg-background flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                VIDEO PREVIEW UNAVAILABLE (GUEST MODE)
              </p>
            </div>
          </div>

          {/* Title/Meta + CTAs Row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            {/* Left: Title and metadata */}
            <div className="space-y-1.5">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
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
            </div>

            {/* Right: Primary CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePlay}
                className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm md:text-base font-semibold shadow-md hover:bg-primary/90"
              >
                Play (login required)
              </button>
              <button
                type="button"
                onClick={handleTrailer}
                className="rounded-full bg-secondary text-foreground px-5 py-2 text-sm md:text-base font-medium hover:bg-secondary/90"
              >
                Trailer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className="rounded-full border border-border px-5 py-2 text-sm md:text-base text-foreground hover:bg-secondary/60"
              >
                More info
              </button>
              <button
                type="button"
                onClick={handleFollow}
                className="rounded-full border border-primary/70 text-primary px-5 py-2 text-sm md:text-base font-medium hover:bg-primary/10"
              >
                Follow creator
              </button>
            </div>
          </div>

          {/* Follow Hint */}
          {showFollowHint && (
            <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-md">
              To follow creators and get updates, you&apos;ll need a free Washington profile.
              In the full product, VIA will walk you through setup from here.
            </p>
          )}
        </section>

        {/* Profile Tabs & Content Section */}
        <section className="space-y-4">
          {/* Profile Tabs */}
          <nav className="border-b border-border flex gap-6">
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

          {/* Tab Content */}
          <div className="pt-4 space-y-4">
            {activeTab === "promo" && (
              <div className="text-sm text-muted-foreground">
                <p>Trailers, sizzle reels, and promo clips will appear here in the full product.</p>
              </div>
            )}
            {activeTab === "stills" && (
              <div className="text-sm text-muted-foreground">
                <p>Key art frames and still images from this title will appear here in the full product.</p>
              </div>
            )}
            {activeTab === "bts" && (
              <div className="text-sm text-muted-foreground">
                <p>Behind-the-scenes content, production notes, and creator commentary will appear here in the full product.</p>
              </div>
            )}
            {activeTab === "info" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Full Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description || video.tagline || video.meta || "Detailed description to be provided by the creator."}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Credits & Collaborators</h3>
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
              </div>
            )}
          </div>
        </section>

        {/* Discovery Rails */}
        <section className="space-y-6">
          {/* More from this creator */}
          {creatorVideos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              More from this creator
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 pr-2 scrollbar-hide">
              {creatorVideos.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleCardClick("more_from_creator", v)}
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

          {/* More from this sponsor */}
          {creatorVideos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              More from this sponsor
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 pr-2 scrollbar-hide">
              {allVideos
              .filter((v) => v.id !== video.id)
              .slice(0, 8)
              .map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleCardClick("more_from_creator", v)}
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
          )}
        </section>
      </div>

      {/* RIGHT COLUMN - Confirmation + More like this */}
      <aside className="space-y-4">
        {/* Top card - confirms what you clicked */}
        <div className="rounded-3xl bg-card border border-border/60 px-5 py-4 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            About this session
          </p>
          <p className="text-sm font-semibold text-foreground">
            {video.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {video.genre || "Feature"} • {video.duration || "Duration TBD"} curated stream
          </p>
        </div>

        {/* Combined credits/brand card */}
        <div className="rounded-3xl bg-card border border-border/60 px-5 py-4 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Credits & Brand
          </p>
          <dl className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between gap-2">
              <dt>Creator</dt>
              <dd className="font-medium text-foreground text-sm">{video.creator || "Example Creator"}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Sponsor</dt>
              <dd className="font-medium text-foreground text-sm">{video.sponsor || "TBD Sponsor"}</dd>
            </div>
          </dl>
        </div>

        {/* More like this - vertical strip */}
        <div>
          <p className="mt-6 mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            More like this
          </p>
          <div className="space-y-3">
            {similarVideos.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCardClick("content_more_like_this_click", item)}
                className="w-full text-left rounded-xl bg-card/60 border border-border/60 overflow-hidden hover:bg-card hover:border-primary/60 transition-colors group"
              >
                <div className="relative pt-[56.25%] bg-muted">
                  {item.thumbnail ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-muted opacity-70 group-hover:opacity-90 transition-opacity" />
                  )}
                </div>
                <div className="px-3 py-2 space-y-1">
                  <p className="text-sm font-semibold line-clamp-2 text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.tagline || item.duration || ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ContentPage;
