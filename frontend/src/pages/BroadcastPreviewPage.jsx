import { useEffect, useMemo } from "react";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CHANNELS = [
  { id: "channel-1", label: "Channel 1 — McDonald’s" },
  { id: "channel-2", label: "Channel 2 — VIA" },
  { id: "channel-3", label: "Channel 3 — Creator Spotlight" },
  { id: "channel-4", label: "Channel 4 — Brand Studio" },
  { id: "channel-5", label: "Channel 5 — Community Picks" },
];

const TIMESLOTS = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const CURRENT_INDEX = 2; // static "now" column for preview only

// Static program grid for preview only
const PROGRAM_GRID = {
  "channel-1": {
    "18:00": { title: "Launching Washington", type: "LIVE", genre: "Product", duration: "60 min" },
    "19:00": { title: "Guest Tour", type: "REPLAY", genre: "Walkthrough", duration: "45 min" },
    "20:00": { title: "VIA Deep Dive", type: "PREMIERE", genre: "Explainer", duration: "30 min" },
    "21:00": { title: "Concept Sessions", type: "REPLAY", genre: "Concept", duration: "60 min" },
    "22:00": { title: "Rails Overview", type: "REPLAY", genre: "UX", duration: "30 min" },
    "23:00": { title: "Night Loop", type: "REPLAY", genre: "Ambient", duration: "60 min" },
  },
  "channel-2": {
    "18:00": { title: "Creator Stories", type: "PREMIERE", genre: "Story", duration: "30 min" },
    "19:00": { title: "Guest Controls", type: "REPLAY", genre: "Tutorial", duration: "30 min" },
    "20:00": { title: "Identity Graph", type: "PREMIERE", genre: "Concept", duration: "45 min" },
    "21:00": { title: "Highlights", type: "LIVE", genre: "Highlights", duration: "60 min" },
  },
  "channel-3": {
    "18:00": { title: "Music Vertical", type: "LIVE", genre: "Music", duration: "60 min" },
    "19:00": { title: "Guest Mix", type: "REPLAY", genre: "Music", duration: "60 min" },
    "20:00": { title: "Focus Stream", type: "REPLAY", genre: "Lo-fi", duration: "120 min" },
  },
  "channel-4": {
    "18:00": { title: "Games Vertical", type: "PREMIERE", genre: "Games", duration: "30 min" },
    "19:00": { title: "Live Sessions", type: "LIVE", genre: "Games", duration: "60 min" },
  },
  "channel-5": {
    "18:00": { title: "Books Vertical", type: "REPLAY", genre: "Books", duration: "45 min" },
    "19:00": { title: "Guest Picks", type: "PREMIERE", genre: "Books", duration: "30 min" },
  },
};

const TYPE_BADGE_CLASS = {
  LIVE: "bg-red-500 text-white",
  PREMIERE: "bg-foreground text-background",
  REPLAY: "bg-muted text-foreground",
};

export function BroadcastPreviewPage() {
  const { logEvent } = useWashingtonEvents("broadcast-preview");

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, {
      route: "broadcast-preview",
    });
  }, [logEvent]);

  const grid = useMemo(() => PROGRAM_GRID, []);

  const handleProgramInteract = (channelId, time, program, channelLabel) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "broadcast_program_hover",
      channelId,
      channelLabel,
      slotTime: time,
      programTitle: program?.title || "TBD Slot",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Title */}
      <section className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Channel Guide Preview</h1>
        <p className="text-sm text-muted-foreground">
          A static look at Washington&apos;s programmed stream by channel and timeslot.
        </p>
      </section>

      {/* Top banner ad */}
      <section>
        <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 flex items-center justify-center">
          <div className="w-full pt-[25%] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground">
                SPONSORED SLOT (STATIC PREVIEW)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Time preview label */}
      <section className="text-[11px] md:text-xs text-muted-foreground">
        All times shown as static guest preview.
      </section>

      {/* Grid + side ad */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] items-start">
        {/* Channel Guide grid */}
        <TooltipProvider>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[120px_repeat(6,minmax(0,1fr))] border-b border-border bg-muted/60 text-[11px] text-muted-foreground">
              <div className="px-3 py-2 font-medium uppercase tracking-[0.18em]">Channel</div>
              {TIMESLOTS.map((time, index) => (
                <div
                  key={time}
                  className={`px-3 py-2 border-l border-border text-center ${
                    index === CURRENT_INDEX ? "bg-secondary/70 border-b-2 border-b-foreground" : ""
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-border text-xs">
              {CHANNELS.map((channel) => (
                <div
                  key={channel.id}
                  className="grid grid-cols-[120px_repeat(6,minmax(0,1fr))] min-h-[64px]"
                >
                  <div className="px-3 py-3 border-r border-border flex items-center font-medium text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {channel.label}
                  </div>
                  {TIMESLOTS.map((time, index) => {
                    const program = grid[channel.id]?.[time];
                    const badgeClass = program?.type
                      ? TYPE_BADGE_CLASS[program.type] || TYPE_BADGE_CLASS.REPLAY
                      : "bg-muted text-foreground";

                    return (
                      <Tooltip key={time} delayDuration={200}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className={`px-3 py-2 border-l border-border text-left hover:bg-muted/60 transition-colors flex flex-col gap-1 ${
                              index === CURRENT_INDEX ? "bg-secondary/20" : ""
                            }`}
                            onMouseEnter={() => handleProgramInteract(channel.id, time, program, channel.label)}
                            onClick={() => handleProgramInteract(channel.id, time, program, channel.label)}
                          >
                            <span className="text-xs font-medium truncate">
                              {program?.title || "TBD Slot"}
                            </span>
                            <span
                              className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}
                            >
                              {program?.type || "REPLAY"}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="text-xs font-semibold">{program?.title || "TBD Slot"}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {channel.label} · {time}–{time}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {program?.genre || "Unspecified genre"} · {program?.duration || "Duration TBA"}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              Play from beginning (demo)
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>

        {/* Side skyscraper ad */}
        <div className="hidden lg:block">
          <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 flex items-center justify-center">
            <div className="w-full pt-[140%] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  AD PREVIEW
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/tablet skyscraper ad */}
      <section className="lg:hidden">
        <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 flex items-center justify-center">
          <div className="w-full pt-[40%] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                AD PREVIEW
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
