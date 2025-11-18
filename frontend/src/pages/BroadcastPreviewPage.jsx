import { useEffect } from "react";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const TIMES = ["1:00p", "2:00p", "3:00p", "4:00p"];

const CHANNELS = [
  {
    id: "channel-1",
    label: "CHANNEL 1 — WASHINGTON FEATURE",
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
    label: "CHANNEL 2 — VIA CURATED",
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
    label: "CHANNEL 3 — CREATOR SHOWCASE",
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
  PREMIERE: "bg-foreground text-background",
  REPLAY: "bg-muted text-foreground",
  BLOCK: "bg-secondary text-secondary-foreground",
};

export function BroadcastPreviewPage() {
  const { logEvent } = useWashingtonEvents("broadcast-preview");

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
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      {/* A) Page Title + Subtitle */}
      <section className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Broadcast Preview</h1>
        <p className="text-sm text-muted-foreground">
          A static look at Washington&apos;s programmed stream.
        </p>
      </section>

      {/* B) Full-width hero sponsor band */}
      <section className="rounded-3xl bg-foreground text-background overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
          {/* Left: feature presentation */}
          <div className="flex-1 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-background/80">
              Channel 1 · Feature Presentation
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">The Long Night</h2>
            <p className="text-xs md:text-sm text-background/80">
              Premiering now · 2h runtime · already 32 minutes in
            </p>
            <p className="text-xs md:text-sm text-background/80 max-w-xl leading-relaxed">
              A long-form Washington feature that stitches together guest sessions into a single, cinematic stream.
              This is a static preview of how scheduled programming could feel inside Washington.
            </p>
          </div>

          {/* Right: sponsored slot */}
          <div className="w-full md:w-64 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-background/80">Sponsored Slot</p>
            <div className="rounded-xl bg-muted h-32 md:h-40 flex items-center justify-center text-[11px] text-muted-foreground">
              Brand creative preview
            </div>
            <p className="text-[11px] text-background/70">
              This slot represents a static preview of how a hero sponsor band could appear in broadcast mode.
            </p>
          </div>
        </div>
      </section>

      {/* C) Main row: guide + skyscraper */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] items-start">
        {/* Guide on left */}
        <div className="space-y-4">
          {/* Time ruler */}
          <div className="flex items-center gap-6 text-[11px] md:text-xs text-muted-foreground pl-[120px]">
            {TIMES.map((time) => (
              <div key={time} className="flex-1 text-center">
                {time}
              </div>
            ))}
          </div>

          {/* Channel rows */}
          <div className="space-y-4">
            {CHANNELS.map((channel) => (
              <div key={channel.id} className="flex flex-col gap-2">
                <div className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground pl-[2px]">
                  {channel.label}
                </div>
                <div className="flex gap-2 bg-muted/40 rounded-2xl p-1">
                  {channel.programs.map((program) => {
                    const badgeClass =
                      TYPE_BADGE_CLASS[program.type] || TYPE_BADGE_CLASS.REPLAY;
                    return (
                      <button
                        key={program.id}
                        type="button"
                        style={{ flexBasis: program.flex, flexGrow: 0, flexShrink: 0 }}
                        className="rounded-xl bg-card border border-border px-3 py-2 text-left flex flex-col gap-1 hover:bg-card/80 transition-colors overflow-hidden"
                        onClick={() => handleProgramClick(channel.id, program)}
                      >
                        <span className="text-xs font-semibold truncate">{program.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${badgeClass}`}>
                            {program.type}
                          </span>
                          <span>{program.duration}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {program.status}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right skyscraper ad */}
        <div className="hidden lg:block w-64">
          <div className="rounded-2xl border bg-card p-4 space-y-3">
            <div className="uppercase text-xs tracking-wider text-muted-foreground">
              AD PREVIEW
            </div>
            <div className="rounded-xl bg-muted h-64 flex items-center justify-center text-xs text-muted-foreground">
              Static brand creative
            </div>
            <p className="text-xs text-muted-foreground">
              Placeholder for 300x600 sponsor slot.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile/tablet skyscraper ad */}
      <section className="lg:hidden">
        <div className="rounded-2xl border bg-card p-4 space-y-3">
          <div className="uppercase text-xs tracking-wider text-muted-foreground">
            AD PREVIEW
          </div>
          <div className="rounded-xl bg-muted h-40 flex items-center justify-center text-xs text-muted-foreground">
            Static brand creative
          </div>
          <p className="text-xs text-muted-foreground">
            Placeholder for 300x600 sponsor slot.
          </p>
        </div>
      </section>
    </div>
  );
}
