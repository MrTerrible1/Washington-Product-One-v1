import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { id: "channel-4", label: "Channel 4 — Genre: Thriller" },
  { id: "channel-5", label: "Channel 5 — Top 100 For You" },
];

// 6 half-hour slots from 1:00p to 3:30p
const TIMESLOTS = ["1:00p", "1:30p", "2:00p", "2:30p", "3:00p", "3:30p"];
const CURRENT_INDEX = 2; // static "now" column for preview only

// Program schedule by channel.
// durationSlots: 1 = 30m, 2 = 60m, 3 = 90m, 4 = 120m (within visible window)
const PROGRAM_SCHEDULE = {
  "channel-1": [
    {
      id: "prog-1",
      contentId: "wash-101",
      title: "The Talk",
      type: "LIVE",
      genre: "Talk",
      duration: "60 min",
      startIndex: 0,
      durationSlots: 2,
      description: "Live discussion on Washington Product One and guest preview.",
    },
    {
      id: "prog-2",
      contentId: "wash-102",
      title: "Behind The Lens",
      type: "REPLAY",
      genre: "Behind the Scenes",
      duration: "30 min",
      startIndex: 2,
      durationSlots: 1,
      description: "A short look at how creators record for Washington.",
    },
    {
      id: "prog-3",
      contentId: "wash-103",
      title: "Feature Film Replay",
      type: "REPLAY",
      genre: "Feature",
      duration: "60 min",
      startIndex: 3,
      durationSlots: 2,
      description: "A full replay of a long-form Washington session.",
    },
  ],
  "channel-2": [
    {
      id: "prog-4",
      contentId: "wash-102",
      title: "Creator AMA Live",
      type: "LIVE",
      genre: "Creator",
      duration: "90 min",
      startIndex: 0,
      durationSlots: 3,
      description: "Creators answer questions about building on Washington.",
    },
    {
      id: "prog-5",
      contentId: "wash-104",
      title: "Behind The Lens",
      type: "PREMIERE",
      genre: "Explainer",
      duration: "30 min",
      startIndex: 3,
      durationSlots: 1,
      description: "Fresh cut explaining VIA in vertical format.",
    },
    {
      id: "prog-6",
      contentId: "wash-101",
      title: "True Crime Stories",
      type: "REPLAY",
      genre: "True Crime",
      duration: "30 min",
      startIndex: 4,
      durationSlots: 1,
      description: "Prototype channel exploring narrative linear content.",
    },
  ],
  "channel-3": [
    {
      id: "prog-7",
      contentId: "wash-105",
      title: "Creator Spotlight",
      type: "PREMIERE",
      genre: "Spotlight",
      duration: "60 min",
      startIndex: 0,
      durationSlots: 2,
      description: "Deep dive into a single creator&apos;s Washington setup.",
    },
    {
      id: "prog-8",
      contentId: "wash-106",
      title: "Behind The Lens",
      type: "REPLAY",
      genre: "Process",
      duration: "60 min",
      startIndex: 2,
      durationSlots: 2,
      description: "How longer concept sessions map into channels.",
    },
  ],
  "channel-4": [
    {
      id: "prog-9",
      contentId: "wash-104",
      title: "True Crime Stories",
      type: "PREMIERE",
      genre: "Thriller",
      duration: "90 min",
      startIndex: 1,
      durationSlots: 3,
      description: "Stylized look at identity and rails as narrative.",
    },
  ],
  "channel-5": [
    {
      id: "prog-10",
      contentId: "wash-103",
      title: "Top Picks For Guest",
      type: "REPLAY",
      genre: "Highlights",
      duration: "60 min",
      startIndex: 0,
      durationSlots: 2,
      description: "Curated sessions most guests finish in preview.",
    },
    {
      id: "prog-11",
      contentId: "wash-101",
      title: "The Talk",
      type: "REPLAY",
      genre: "Talk",
      duration: "30 min",
      startIndex: 2,
      durationSlots: 1,
      description: "Replay of the live talk for different time zones.",
    },
    {
      id: "prog-12",
      contentId: "wash-102",
      title: "Behind The Lens",
      type: "REPLAY",
      genre: "Behind the Scenes",
      duration: "60 min",
      startIndex: 3,
      durationSlots: 2,
      description: "Camera, audio, and vertical framing notes.",
    },
  ],
};

const TYPE_BADGE_CLASS = {
  LIVE: "bg-red-500 text-white",
  PREMIERE: "bg-foreground text-background",
  REPLAY: "bg-muted text-foreground",
};

export function BroadcastPreviewPage() {
  const { logEvent } = useWashingtonEvents("broadcast-preview");
  const navigate = useNavigate();

  const [previewProgram, setPreviewProgram] = useState(null);

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, {
      source: "broadcast-preview",
      route: "broadcast-preview",
    });
  }, [logEvent]);

  const schedule = useMemo(() => PROGRAM_SCHEDULE, []);

  const handleProgramHover = (channel, program) => {
    setPreviewProgram({ ...program, channelLabel: channel.label });
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "broadcast_program_hover",
      channel: channel.id,
      channelLabel: channel.label,
      slotTime: TIMESLOTS[program.startIndex] || "1:00p",
      programTitle: program.title,
    });
  };

  const handleProgramClick = (program) => {
    if (!program?.contentId) return;
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "broadcast_program_click",
      contentId: program.contentId,
      programTitle: program.title,
    });
    navigate(`/content/${program.contentId}`);
  };

  const getTimeRange = (startIndex, durationSlots) => {
    const startLabel = TIMESLOTS[startIndex] || TIMESLOTS[0];
    const endIndex = Math.min(startIndex + durationSlots, TIMESLOTS.length - 1);
    const endLabel = TIMESLOTS[endIndex];
    return `${startLabel}–${endLabel}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* A) Page header */}
      <section className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Broadcast Preview</h1>
        <p className="text-sm text-muted-foreground">
          A static look at Washington&apos;s programmed stream.
        </p>
      </section>

      {/* B + C + E) Preview + guide + right ad */}
      <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_220px] items-start">
        {/* Top-left preview box */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3 min-h-[220px]">
          <div className="w-full rounded-xl bg-muted aspect-video mb-2" />
          {previewProgram ? (
            <div className="space-y-1">
              <h2 className="text-sm md:text-base font-semibold leading-snug">
                {previewProgram.title}
              </h2>
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                {previewProgram.channelLabel} · {getTimeRange(previewProgram.startIndex, previewProgram.durationSlots)}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {previewProgram.description}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-sm md:text-base font-semibold">Select a program to preview</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hover over any block in the guide to see how a Washington broadcast channel might look in guest
                mode.
              </p>
            </div>
          )}
        </div>

        {/* Channel/timeline guide */}
        <TooltipProvider>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Time preview label */}
            <div className="px-3 py-1 text-[11px] text-muted-foreground border-b border-border bg-muted/40">
              All times shown as static guest preview.
            </div>

            {/* Timeline header */}
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

            {/* Channel rows */}
            <div className="divide-y divide-border text-xs">
              {CHANNELS.map((channel) => {
                const programs = schedule[channel.id] || [];

                return (
                  <div
                    key={channel.id}
                    className="grid grid-cols-[120px_minmax(0,1fr)] min-h-[64px]"
                  >
                    <div className="px-3 py-3 border-r border-border flex items-center font-medium text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {channel.label}
                    </div>
                    <div className="px-0 py-2">
                      <div className="grid grid-cols-6 h-full">
                        {(() => {
                          const cells = [];
                          let cursor = 0;
                          programs.forEach((program) => {
                            if (program.startIndex > cursor) {
                              const gap = program.startIndex - cursor;
                              cells.push(
                                <div key={`${channel.id}-gap-${cursor}`} className={`col-span-${gap}`} />,
                              );
                              cursor = program.startIndex;
                            }
                            const span = Math.min(program.durationSlots, TIMESLOTS.length - cursor);
                            cells.push(
                              <Tooltip key={program.id} delayDuration={150}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className={`col-span-${span} border-l border-border last:border-r text-left px-3 py-2 hover:bg-muted/60 transition-colors flex flex-col gap-1`}
                                    onMouseEnter={() => handleProgramHover(channel, program)}
                                    onClick={() => handleProgramClick(program)}
                                  >
                                    <span className="text-xs font-medium truncate">{program.title}</span>
                                    <span
                                      className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                        TYPE_BADGE_CLASS[program.type] || TYPE_BADGE_CLASS.REPLAY
                                      }`}
                                    >
                                      {program.type}
                                    </span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <div className="space-y-2">
                                    <div className="w-full rounded-md bg-muted aspect-video mb-1" />
                                    <p className="text-xs font-semibold">{program.title}</p>
                                    <p className="text-[11px] text-muted-foreground">
                                      {channel.label} · {getTimeRange(program.startIndex, program.durationSlots)} · {program.type}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">
                                      {program.genre || "Unspecified genre"} · {program.duration || "Duration TBA"}
                                    </p>
                                    <div className="flex gap-2 mt-1">
                                      <button
                                        type="button"
                                        className="text-[11px] px-2 py-1 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
                                        onClick={() => handleProgramClick(program)}
                                      >
                                        Play From Beginning (demo)
                                      </button>
                                      <button
                                        type="button"
                                        className="text-[11px] px-2 py-1 rounded-full border border-border text-foreground hover:bg-muted/60 transition-colors"
                                        onClick={() => handleProgramClick(program)}
                                      >
                                        More Info
                                      </button>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>,
                            );
                            cursor += span;
                          });
                          if (cursor < TIMESLOTS.length) {
                            const gap = TIMESLOTS.length - cursor;
                            cells.push(
                              <div
                                key={`${channel.id}-tail-gap`}
                                className={`col-span-${gap} border-l border-border`}
                              />,
                            );
                          }
                          return cells;
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TooltipProvider>

        {/* Right-side skyscraper ad */}
        <div className="hidden lg:block">
          <div className="w-full rounded-2xl border border-dashed border-border bg-muted/40 flex items-center justify-center">
            <div className="w-full pt-[140%] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  AD PREVIEW (STATIC)
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
                AD PREVIEW (STATIC)
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
