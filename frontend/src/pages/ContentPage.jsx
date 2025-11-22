import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoData from "../data/videoContent.json";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

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

  // Get similar videos for "More like this"
  const genreMatches = allVideos.filter(v => v.id !== video.id && v.genre === video.genre);
  const similarVideos = genreMatches.length > 0 
    ? genreMatches.slice(0, 4)
    : allVideos.filter(v => v.id !== video.id).slice(0, 4);
  const creatorVideos = allVideos.filter(v => v.id !== video.id && v.creator === video.creator).slice(0, 8);

  return (
    <div className="space-y-4">
      {/* TOP SECTION - Hero + Info Grid */}
      <div className="grid gap-8 md:grid-cols-[120px_minmax(0,2.4fr)_minmax(320px,1fr)] items-start">
        {/* LEFT CONTROLS - Simplified 3 buttons */}
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
            onClick={handleAddToWatchlist}
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

        {/* CENTER - Preview Window Only */}
        <div className="relative bg-[#101318] rounded-3xl border border-border/60 overflow-hidden aspect-video max-h-[360px] mx-auto w-full mt-4 mb-2">
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <p className="text-sm text-muted-foreground">
              VIDEO PREVIEW UNAVAILABLE (GUEST MODE)
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - Compact Title + CTAs + More like this */}
        <aside className="space-y-4">
          {/* Title + meta */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {video.title}
            </h1>

            <div className="mt-1 text-xs md:text-sm text-muted-foreground flex flex-wrap gap-3 items-center">
              {video.duration && <span>{video.duration}</span>}
              {video.genre && (
                <span className="inline-flex items-center rounded-full px-2 py-0.5 border border-border/70 text-[10px] uppercase tracking-wide">
                  {video.genre}
                </span>
              )}
              <span>Guest preview · OnDemand</span>
            </div>

            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
              {video.description || video.tagline || "A curated Washington experience."}
            </p>
          </div>

          {/* CTA group */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handlePlay}
              className="w-full rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm md:text-base font-semibold shadow-md hover:bg-primary/90"
            >
              Play (login required)
            </button>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleTrailer}
                className="rounded-full bg-secondary text-foreground px-3 py-2 text-xs md:text-sm font-medium hover:bg-secondary/90"
              >
                Trailer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className="rounded-full border border-border px-3 py-2 text-xs md:text-sm text-foreground hover:bg-secondary/60"
              >
                More info
              </button>
              <button
                type="button"
                onClick={handleFollow}
                className="rounded-full border border-primary/70 text-primary px-3 py-2 text-xs md:text-sm font-medium hover:bg-primary/10"
              >
                Follow creator
              </button>
            </div>

            {/* Follow Hint */}
            {showFollowHint && (
              <p className="text-xs text-muted-foreground">
                To follow creators and get updates, you&apos;ll need a free Washington profile.
              </p>
            )}
          </div>

          {/* More like this - 3 items, no scroll */}
          <section className="mt-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">
              More like this
            </h3>
            <div className="space-y-2">
              {similarVideos.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCardClick("more_like_this_sidebar", item)}
                  className="w-full flex items-center gap-3 rounded-2xl bg-[#101318] border border-border/60 hover:border-border/80 px-3 py-2 text-left transition"
                >
                  <div className="h-12 w-20 rounded-xl bg-muted/40 overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-muted/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-foreground truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.duration} • {item.genre || "Similar"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* BELOW THE FOLD - Tabs + Rails */}
      <section className="mt-6">
        <div className="flex items-center gap-4 border-b border-border/60">
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
          </div>

          {/* Tab Content */}
          <div className="mt-4 space-y-4">
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">About This Title</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description || video.tagline || video.meta || "Detailed description to be provided by the creator."}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">Credits & Brand</h3>
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Creator</dt>
                      <dd className="font-medium text-foreground mt-1">{video.creator || "Example Creator"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Sponsor</dt>
                      <dd className="font-medium text-foreground mt-1">{video.sponsor || "TBD Sponsor"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Brand</dt>
                      <dd className="font-medium text-foreground mt-1">{video.brand || "Washington"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Genre</dt>
                      <dd className="font-medium text-foreground mt-1">{video.genre || "—"}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Discovery Rails - Below tabs */}
        {creatorVideos.length > 0 && (
        <section className="space-y-6 mt-8">
          {/* More from this creator */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
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

          {/* More from this sponsor */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
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
        </section>
        )}
      </div>

      {/* RIGHT COLUMN - Slim, secondary: About + Credits + More like this */}
      <aside className="space-y-4">
        {/* About this session */}
        <div className="rounded-2xl bg-card border border-border/60 p-4 md:p-5 space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            About this session
          </p>
          <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
            {video.genre || "Feature"} • {video.duration || "Duration TBD"}
          </p>
          <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
            {video.tagline || "A curated Washington experience."}
          </p>
        </div>

        {/* Credits & Brand */}
        <div className="rounded-2xl bg-card border border-border/60 p-4 md:p-5 space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Credits & Brand
          </p>
          <dl className="space-y-1 text-xs md:text-sm text-muted-foreground">
            <div className="flex justify-between gap-2">
              <dt>Creator</dt>
              <dd className="font-medium text-foreground">{video.creator || "Example Creator"}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Sponsor</dt>
              <dd className="font-medium text-foreground">{video.sponsor || "TBD Sponsor"}</dd>
            </div>
          </dl>
        </div>

        {/* More like this - Muted vertical list */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground px-1">
            More like this
          </p>
          <div className="space-y-2">
            {similarVideos.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCardClick("more_like_this_sidebar", item)}
                className="w-full h-16 md:h-18 rounded-xl bg-card/70 opacity-75 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-md transition flex items-center gap-3 px-3 py-2 text-left"
              >
                <div className="h-12 w-20 rounded-lg overflow-hidden bg-gradient-to-br from-accent/30 to-muted/60 flex-shrink-0">
                  {item.thumbnail ? (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-foreground line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.duration} · {item.genre || "Similar"}
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
