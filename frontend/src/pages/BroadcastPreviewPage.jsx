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
    <div className="py-10 space-y-8">
      {/* A) Page Title + Subtitle + Filters */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Broadcast Preview</h1>
          <p className="text-sm text-muted-foreground">
            A static look at Washington&apos;s programmed stream.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm md:text-base">
          {BROADCAST_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "rounded-full px-3 py-1 bg-primary text-primary-foreground font-medium"
                  : "rounded-full px-3 py-1 bg-secondary/40 text-muted-foreground hover:bg-secondary/70 transition-colors"
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* B) Full-width hero sponsor band */}
      <section className="rounded-3xl bg-card border border-border/60 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
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
        <div className="space-y-4">
          {/* Time ruler */}
          <div className="flex items-center gap-6 text-xs md:text-sm text-muted-foreground pl-[160px]">
            {TIMES.map((time) => (
              <div key={time} className="flex-1 text-center border-t border-border/60 pt-1">
                {time}
              </div>
            ))}
          </div>

          {/* Channel rows with station ID + program track */}
          <div className="space-y-4">
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
                  <div className="flex-1 flex gap-2 bg-secondary/30 rounded-2xl p-1">
                    {channel.programs.map((program) => {
                      const badgeClass = TYPE_BADGE_CLASS[program.type] || TYPE_BADGE_CLASS.REPLAY;
                      return (
                        <button
                          key={program.id}
                          type="button"
                          style={{ flexBasis: program.flex, flexGrow: 0, flexShrink: 0 }}
                          className="group rounded-xl bg-[#20232b] border border-border/70 px-3 py-2 text-left flex flex-col gap-1 hover:bg-[#262b35] hover:border-primary/70 transition-colors shadow-sm"
                          onClick={() => handleProgramClick(channel.id, program)}
                        >
                          <span className="text-base md:text-lg font-semibold truncate">{program.title}</span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${badgeClass} text-[11px]`}
                            >
                              {program.type}
                            </span>
                            <span>{program.duration}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {program.status}
                          </p>
                          {program.id === "prog-1" && (
                            <div className="mt-1 hidden group-hover:flex flex-col gap-0.5 text-[10px] text-muted-foreground border-t border-border/60 pt-1">
                              <div className="font-semibold text-foreground">
                                Key billing block
                              </div>
                              <div>Presented by: Aurora Studios</div>
                              <div>Featuring: Creator Network Spotlight</div>
                            </div>
                          )}
                        </button>
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
