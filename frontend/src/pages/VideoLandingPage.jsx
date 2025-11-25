// file: src/pages/VideoLandingPage.jsx
import React from "react";

const premierGenres = [
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Action",
  "Rom-com",
  "Kids",
  "Animated",
  "AI",
];

const formats = ["Horizontal", "Vertical"];

const continueWatching = [
  {
    id: 1,
    title: "The Long Night — Washington Original",
    meta: "2h 8m • Resume where you left off",
    status: "Watching",
  },
  {
    id: 2,
    title: "Mathmagical 'I' — Episode 1",
    meta: "42m • Continue watching",
    status: "In progress",
  },
];

const mostWatchedSciFi = [
  {
    id: 1,
    title: "The Long Night — Washington Original",
    meta: "Feature • 2h 8m curated stream",
    tag: "Feature",
  },
  {
    id: 2,
    title: "Mathmagical 'I'",
    meta: "Series • Episode 1 • 42 min",
    tag: "Sci-Fi",
  },
  {
    id: 3,
    title: "Inside VIA — Prototype Session",
    meta: "5:18 • Explainer",
    tag: "Explainer",
  },
];

export function VideoLandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-8 pb-16 pt-8">
      {/* TOP GRID: NAV | HERO | RIGHT META */}
      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1.6fr)_260px] grid-rows-[auto_auto] items-start">
        {/* LEFT: Premier controls (spans hero + rails) */}
        <aside className="row-span-2 space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase">
              Premier controls
            </p>
            <div className="space-y-2">
              {premierGenres.map((genre, index) => (
                <button
                  key={genre}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "bg-amber-400 text-neutral-950"
                      : "bg-neutral-900/70 text-neutral-200 hover:bg-neutral-800"
                  }`}
                >
                  <span>{genre}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase">
              Formats
            </p>
            <div className="space-y-2">
              {formats.map((fmt, index) => (
                <button
                  key={fmt}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "bg-amber-400 text-neutral-950"
                      : "bg-neutral-900/70 text-neutral-200 hover:bg-neutral-800"
                  }`}
                >
                  <span>{fmt}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER: Premier window hero */}
        <section className="col-start-2 col-end-3 row-start-1 space-y-4">
          <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-xl">
            {/* Hero image frame – swap for your real poster/hero component */}
            <div className="relative aspect-[16/7] w-full bg-neutral-800">
              {/* Background poster */}
              <img
                src="/images/the-long-night-hero.jpg"
                alt="The Long Night — Washington Original"
                className="h-full w-full object-cover"
              />
              {/* Gradient + title overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  The Long Night — Washington Original
                </h1>
                <p className="mt-2 max-w-xl text-sm text-neutral-200">
                  Hot new feature, trailer, or event picked for you. The most
                  relevant content for your profile and data-profile appears
                  here.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
                  >
                    Watch now
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-neutral-600/80 bg-neutral-900/70 px-5 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-800"
                  >
                    More info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Creator spotlight + community note (hero row only) */}
        <section className="col-start-3 row-start-1 space-y-3">
          <div className="rounded-2xl border border-neutral-700 bg-neutral-900/90 px-4 py-3 shadow">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-amber-300 uppercase">
              Creator spotlight
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-100">
              Washington Originals
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Meet today&apos;s featured creator.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 shadow">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 uppercase">
              Community note
            </p>
            <p className="mt-1 text-xs text-neutral-300">
              Short, non-intrusive platform or community update.
            </p>
          </div>
        </section>

        {/* RAILS: sit directly under the hero, full width of the hero column */}
        <section className="col-start-2 col-end-3 row-start-2 mt-4 space-y-10">
          {/* Continue watching – always second rail */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-neutral-100">
                Continue watching
              </h2>
              <button
                type="button"
                className="text-xs font-medium text-neutral-400 hover:text-neutral-200"
              >
                More →
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {continueWatching.map((item) => (
                <article
                  key={item.id}
                  className="w-[220px] shrink-0 overflow-hidden rounded-xl bg-neutral-900 shadow-md"
                >
                  <div className="h-32 bg-neutral-800" />
                  <div className="space-y-1 px-3 py-3">
                    <span className="inline-block rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                      {item.status}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400">{item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sci-Fi – Most watched */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-neutral-100">
                Sci-Fi – Most watched
              </h2>
              <button
                type="button"
                className="text-xs font-medium text-neutral-400 hover:text-neutral-200"
              >
                More →
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {mostWatchedSciFi.map((item) => (
                <article
                  key={item.id}
                  className="w-[220px] shrink-0 overflow-hidden rounded-xl bg-neutral-900 shadow-md"
                >
                  <div className="h-32 bg-neutral-800" />
                  <div className="space-y-1 px-3 py-3">
                    <span className="inline-block rounded-full bg-neutral-100/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-200">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400">{item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Third + later rails can follow the same pattern */}
          {/* Example placeholder for another genre rail */}
          {/* <div>...more rails here...</div> */}
        </section>
      </div>
    </div>
  );
}
