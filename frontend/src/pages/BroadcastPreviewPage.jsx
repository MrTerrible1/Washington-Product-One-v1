import { useEffect, useState } from "react";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const TIMES = ["1:00p", "2:00p", "3:00p", "4:00p"];

const BROADCAST_FILTERS = [
  "All",
  "Live Streams",
  "Games & Esports",
  "How-To & Builds",
  "Reviews & Unboxing",
  "Talk & Podcasts",
  "Kids & Family",
];

const CHANNELS = [
  {
    id: "channel-1",
    shortName: "C1",
    displayName: "Channel 1 — Washington Feature",
    ownerType: "Brand",
    programs: [
      {
        id: "prog-1",
        title: "The Long Night",
        type: "PREMIERE",
        duration: "2h",
        status: "In progress · started 32 minutes ago",
        flex: "55%",
      },
      {
        id: "prog-2",
        title: "Behind the Story",
        type: "REPLAY",
        duration: "30m",
        status: "Up next",
        flex: "15%",
      },
      {
        id: "prog-3",
        title: "Washington Nightline",
        type: "LIVE",
        duration: "1h",
        status: "Tonight",
        flex: "30%",
      },
    ],
  },
  {
    id: "channel-2",
    shortName: "C2",
    displayName: "Channel 2 — VIA Curated",
    ownerType: "VIA",
    programs: [
      {
        id: "prog-4",
        title: "Creator Spotlight",
        type: "LIVE",
        duration: "30m",
        status: "Live",
        flex: "20%",
      },
      {
        id: "prog-5",
        title: "Micro Docs",
        type: "BLOCK",
        duration: "1h",
        status: "Curated block",
        flex: "25%",
      },
      {
        id: "prog-6",
        title: "Algorithm Stories",
        type: "REPLAY",
        duration: "90m",
        status: "Full replay",
        flex: "55%",
      },
    ],
  },
  {
    id: "channel-3",
    shortName: "C3",
    displayName: "Channel 3 — Creator Showcase",
    ownerType: "Creator",
    programs: [
      {
        id: "prog-7",
        title: "Creator Marathon",
        type: "BLOCK",
        duration: "2h",
        status: "Weekend block",
        flex: "60%",
      },
      {
        id: "prog-8",
        title: "One-Shot Special",
        type: "PREMIERE",
        duration: "1h",
        status: "Tonight",
        flex: "40%",
      },
    ],
  },  {
    id: "channel-4",
    shortName: "C4",
    displayName: "Channel 4 — Brand Showcase",
    ownerType: "Brand",
    programs: [
      {
        id: "prog-10",
        title: "Morning Feature",
        type: "PREMIERE",
        duration: "1h",
        status: "Starting soon",
        flex: "25%",
      },
      {
        id: "prog-11",
        title: "News Update",
        type: "LIVE",
        duration: "30m",
        status: "Live now",
        flex: "15%",
      },
      {
        id: "prog-12",
        title: "Evening Series",
        type: "BLOCK",
        duration: "2h",
        status: "Prime time",
        flex: "60%",
      },
    ],
  },
  {
    id: "channel-5",
    shortName: "C5",
    displayName: "Channel 5 — Creator Shorts",
    ownerType: "Creator",
    programs: [
      {
        id: "prog-13",
        title: "Quick Takes",
        type: "BLOCK",
        duration: "30m",
        status: "Rotating shorts",
        flex: "20%",
      },
      {
        id: "prog-14",
        title: "Featured Creator",
        type: "PREMIERE",
        duration: "45m",
        status: "New episode",
        flex: "25%",
      },
      {
        id: "prog-15",
        title: "Community Hour",
        type: "LIVE",
        duration: "1h 15m",
        status: "Live interaction",
        flex: "55%",
      },
    ],
  },
  {
    id: "channel-6",
    shortName: "C6",
    displayName: "Channel 6 — Live Events",
    ownerType: "Brand",
    programs: [
      {
        id: "prog-16",
        title: "Sports Highlight",
        type: "LIVE",
        duration: "2h",
        status: "Ongoing",
        flex: "60%",
      },
      {
        id: "prog-17",
        title: "Post-Game Show",
        type: "REPLAY",
        duration: "30m",
        status: "After event",
        flex: "20%",
      },
      {
        id: "prog-18",
        title: "Evening Wrap",
        type: "BLOCK",
        duration: "40m",
        status: "Tonight",
        flex: "20%",
      },
    ],
  },
  {
    id: "channel-7",
    shortName: "C7",
    displayName: "Channel 7 — Tech & Gaming",
    ownerType: "Creator",
    programs: [
      {
        id: "prog-19",
        title: "Tech Review Marathon",
        type: "BLOCK",
        duration: "90m",
        status: "Ongoing",
        flex: "45%",
      },
      {
        id: "prog-20",
        title: "Gaming Showcase",
        type: "PREMIERE",
        duration: "1h",
        status: "New release",
        flex: "30%",
      },
      {
        id: "prog-21",
        title: "Q&A Session",
        type: "LIVE",
        duration: "45m",
        status: "Live chat",
        flex: "25%",
      },
    ],
  },
  {
    id: "channel-8",
    shortName: "C8",
    displayName: "Channel 8 — Music & Arts",
    ownerType: "VIA",
    programs: [
      {
        id: "prog-22",
        title: "Concert Special",
        type: "PREMIERE",
        duration: "2h",
        status: "Exclusive",
        flex: "55%",
      },
      {
        id: "prog-23",
        title: "Artist Interview",
        type: "REPLAY",
        duration: "30m",
        status: "Rebroadcast",
        flex: "15%",
      },
      {
        id: "prog-24",
        title: "Music Videos",
        type: "BLOCK",
        duration: "1h 30m",
        status: "Curated block",
        flex: "30%",
      },
    ],
  },
  {
    id: "channel-9",
    shortName: "C9",
    displayName: "Channel 9 — Documentary",
    ownerType: "Brand",
    programs: [
      {
        id: "prog-25",
        title: "Nature Series",
        type: "BLOCK",
        duration: "2h",
        status: "Featured series",
        flex: "60%",
      },
      {
        id: "prog-26",
        title: "Behind Scenes",
        type: "REPLAY",
        duration: "45m",
        status: "Encore showing",
        flex: "25%",
      },
      {
        id: "prog-27",
        title: "Short Films",
        type: "BLOCK",
        duration: "30m",
        status: "Curated collection",
        flex: "15%",
      },
    ],
  },
  {
    id: "channel-10",
    shortName: "C10",
    displayName: "Channel 10 — Kids & Family",
    ownerType: "Creator",
    programs: [
      {
        id: "prog-28",
        title: "Morning Cartoons",
        type: "BLOCK",
        duration: "1h",
        status: "Daily favorites",
        flex: "30%",
      },
      {
        id: "prog-29",
        title: "Educational Show",
        type: "PREMIERE",
        duration: "45m",
        status: "New episode",
        flex: "25%",
      },
      {
        id: "prog-30",
        title: "Family Movie",
        type: "BLOCK",
        duration: "1h 30m",
        status: "Matinee",
        flex: "45%",
      },
    ],
  },
];

const TYPE_BADGE_CLASS = {
  LIVE: "bg-red-500 text-white",
  PREMIERE: "bg-primary text-primary-foreground",
  REPLAY: "bg-muted text-foreground",
  BLOCK: "bg-secondary text-secondary-foreground",
};

export function BroadcastPreviewPage() {
  const { logEvent } = useWashingtonEvents("broadcast-preview");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, {
      source: "broadcast-preview",
      route: "broadcast-preview",
    });
  }, [logEvent]);

  const handleProgramClick = (channelId, program) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "broadcast_program_click",
      channelId,
      programId: program.id,
      programTitle: program.title,
      programType: program.type,
    });
  };

  return (
    <div className="py-6 space-y-6">
      {/* A) Compact Label + Filters */}
      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Broadcast · Programmed stream preview (guest)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {BROADCAST_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "rounded-full px-3 py-1 text-[11px] md:text-xs bg-primary text-primary-foreground font-medium shadow-sm"
                  : "rounded-full px-3 py-1 text-[11px] md:text-xs bg-secondary/70 text-muted-foreground hover:bg-secondary/90 transition-colors"
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* B) Full-width hero sponsor band */}
      <section className="rounded-3xl bg-card border border-border/60 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 p-5 md:p-6">
          {/* Left: feature presentation */}
          <div className="flex-1 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Channel 1 · Feature presentation
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              The Long Night
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Premiering now · 2h runtime · already 32 minutes in
            </p>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xl leading-relaxed">
              A long-form Washington feature that stitches together guest sessions into a single, cinematic stream.
            </p>
          </div>

          {/* Right: sponsored slot */}
          <div className="w-full md:w-64 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Brand spotlight
            </p>
            <div className="rounded-xl bg-muted h-32 md:h-40 flex flex-col items-center justify-center text-[11px] text-muted-foreground gap-1">
              <div className="w-16 h-16 rounded-full bg-background/40" />
              <div className="h-2 w-24 rounded-full bg-background/60" />
              <div className="h-2 w-16 rounded-full bg-background/40" />
              <span>Brand creative preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* C) Main row: guide + skyscraper */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] items-start">
        {/* Guide on left */}
        <div className="space-y-4 rounded-3xl bg-secondary/40 border border-border/60 px-4 py-4">
          {/* Time ruler */}
          <div className="flex items-center gap-6 text-[11px] md:text-xs text-muted-foreground pl-[150px]">
            {TIMES.map((time) => (
              <div key={time} className="flex-1 text-center border-t border-border/60 pt-1">
                {time}
              </div>
            ))}
          </div>

          {/* Channel rows with station ID + program track */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
            {CHANNELS.map((channel) => (
              <div key={channel.id} className="flex flex-col gap-2">
                <div className="flex gap-0 items-stretch">
                  {/* Station ID rail with right divider */}
                  <div className="w-[160px] flex flex-col justify-center gap-1 pr-4 mr-4 border-r border-border/70">
                    <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                      {channel.shortName}
                    </div>
                    <div className="text-base font-semibold text-foreground leading-snug">
                      {channel.displayName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {channel.ownerType}
                    </div>
                  </div>

                  {/* Program track */}
                  <div className="flex items-stretch gap-2 bg-[#11141b] rounded-2xl px-2 py-2">
                    {channel.programs.map((program) => {
                      const badgeClass = TYPE_BADGE_CLASS[program.type] || TYPE_BADGE_CLASS.REPLAY;
                      
                      // Special wrapper for prog-1 (The Long Night) with billing tooltip
                      if (program.id === "prog-1") {
                        return (
                          <div
                            key={program.id}
                            className="relative group"
                            style={{ flexBasis: program.flex, flexGrow: 0, flexShrink: 0 }}
                          >
                            <div
                              className="h-24 flex flex-col justify-center bg-[#2357FF] border border-border/60 rounded-2xl px-4 text-xs md:text-sm text-white overflow-hidden hover:bg-[#2d63ff] hover:shadow-md transition cursor-pointer"
                              onClick={() => handleProgramClick(channel.id, program)}
                            >
                              <div className="font-semibold leading-tight line-clamp-2 mb-0.5">{program.title}</div>
                              <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/80">
                                <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-semibold ${badgeClass} text-[9px] md:text-[10px]`}>
                                  {program.type}
                                </span>
                                <span>{program.duration}</span>
                              </div>
                            </div>
                            
                            {/* Billing tooltip */}
                            <div className="absolute left-2 top-full mt-2 hidden group-hover:block w-80 rounded-xl border border-border bg-black/90 text-xs text-white px-4 py-3 shadow-lg z-20">
                              <p className="leading-relaxed">
                                <span className="font-semibold">Key billing block:</span> writer, director, top cast, producers, and primary sponsors appear here.
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      // Regular program blocks (blue) - UNIFORM
                      return (
                        <div
                          key={program.id}
                          style={{ flexBasis: program.flex, flexGrow: 0, flexShrink: 0 }}
                          className="h-24 flex flex-col justify-center bg-[#2357FF] border border-border/60 rounded-2xl px-4 text-xs md:text-sm text-white overflow-hidden hover:bg-[#2d63ff] hover:shadow-md transition cursor-pointer"
                          onClick={() => handleProgramClick(channel.id, program)}
                        >
                          <div className="font-semibold leading-tight line-clamp-2 mb-0.5">{program.title}</div>
                          <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/80">
                            <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-semibold ${badgeClass} text-[9px] md:text-[10px]`}>
                              {program.type}
                            </span>
                            <span>{program.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right skyscraper ad */}
        <div className="hidden lg:block w-64">
          <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
            <div className="uppercase text-xs tracking-wider text-muted-foreground">
              Brand spotlight
            </div>
            <div className="rounded-xl bg-muted h-64 flex items-center justify-center text-xs text-muted-foreground">
              Example sponsor placement
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/tablet skyscraper ad */}
      <section className="lg:hidden">
        <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
          <div className="uppercase text-xs tracking-wider text-muted-foreground">
            Brand spotlight
          </div>
          <div className="rounded-xl bg-muted h-40 flex items-center justify-center text-xs text-muted-foreground">
            Example sponsor placement
          </div>
        </div>
      </section>
    </div>
  );
}
