import { useState } from "react";
import clsx from "clsx";

const GENRES = [
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "action", label: "Action" },
  { id: "rom-com", label: "Rom-com" },
  { id: "kids", label: "Kids" },
  { id: "animated", label: "Animated" },
  { id: "ai", label: "AI" },
];

const FORMATS = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
];

const CONTINUE_WATCHING = {
  title: "Continue watching",
  items: [
    {
      id: "long-night-progress",
      label: "Watching",
      title: "The Long Night — Washington Original",
      meta: "42:18 / 2:08:00 • Resume where you left off",
    },
    {
      id: "mathmagical-progress",
      label: "In Progress",
      title: "Mathmagical 'I' — Episode 1",
      meta: "18:32 / 42:00 • Continue watching",
    },
  ],
};

const SCIFI_RAIL = {
  title: "Sci-Fi – Highlights & trailers",
  items: [
    {
      id: "long-night",
      label: "Feature",
      title: "The Long Night — Washington Original",
      meta: "Feature • 2h 8m curated stream",
    },
    {
      id: "mathmagical",
      label: "Sci-Fi",
      title: "Mathmagical 'I'",
      meta: "Series • Episode 1 • 42 min",
    },
    {
      id: "inside-via",
      label: "Explainer",
      title: "Inside VIA — Prototype Session",
      meta: "5:18 • See how VIA learns your taste",
    },
    {
      id: "welcome-sizzle",
      label: "Highlights",
      title: "Welcome to Washington — Sizzle Cut",
      meta: "4:10 • Fast-paced tour through curated streams",
    },
  ],
};

const ORIGINALS_BTS = {
  title: "Washington Originals – Behind the scenes",
  items: [
    {
      id: "making-of-long-night",
      label: "BTS",
      title: "Making of The Long Night",
      meta: "6:42 • Director's commentary and production insights",
    },
    {
      id: "via-development",
      label: "Tech",
      title: "Building VIA: The AI Behind Washington",
      meta: "8:15 • How our recommendation engine learns your taste",
    },
  ],
};

const PLATFORM_TOURS = {
  title: "OnDemand – Tours & platform guides",
  items: [
    {
      id: "guest-mode",
      label: "Onboarding",
      title: "Guest Mode in 90 Seconds",
      meta: "Short intro • Everything you need before you click play",
    },
    {
      id: "channels-change",
      label: "Concept",
      title: "Channels: How Discovery Changes",
      meta: "6:00 • How live channels reshape the way you find new shows",
    },
  ],
};

function ContentCard({ item }) {
  return (
    <article className="flex-shrink-0 w-[220px] rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-800 hover:border-amber-400/70 transition-colors">
      <div className="h-32 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
      <div className="p-3 space-y-1">
        {item.label && (
          <span className="inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
            {item.label}
          </span>
        )}
        <h3 className="text-sm font-semibold leading-snug text-neutral-50">
          {item.title}
        </h3>
        {item.meta && (
          <p className="text-xs text-neutral-400 line-clamp-2">{item.meta}</p>
        )}
      </div>
    </article>
  );
}

export function VideoLandingPage() {
  const [activeGenre, setActiveGenre] = useState("sci-fi");
  const [activeFormat, setActiveFormat] = useState("horizontal");

  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-16">
      {/* Top grid: vertical controls + hero + rails */}
      <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] items-start">
        {/* LEFT: Vertical Premier controls */}
        <aside className="space-y-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-3">
              Premier controls
            </p>
            <div className="flex flex-col gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => setActiveGenre(genre.id)}
                  className={clsx(
                    "w-full rounded-full border px-4 py-2 text-sm font-medium text-left transition",
                    activeGenre === genre.id
                      ? "bg-amber-400 text-neutral-900 border-transparent shadow-sm"
                      : "bg-neutral-900/80 text-neutral-200 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500"
                  )}
                >
                  {genre.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-3">
              Formats
            </p>
            <div className="flex flex-col gap-2">
              {FORMATS.map((format) => (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => setActiveFormat(format.id)}
                  className={clsx(
                    "w-full rounded-full border px-4 py-2 text-sm font-medium text-left transition",
                    activeFormat === format.id
                      ? "bg-amber-400 text-neutral-900 border-transparent shadow-sm"
                      : "bg-neutral-900/80 text-neutral-200 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500"
                  )}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT: Hero + Rails */}
        <section className="space-y-8">
          {/* Hero */}
          <div className="w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
            <article className="relative">
            <div className="relative h-[340px] lg:h-[380px]">
              <div 
                className="h-full w-full object-cover bg-cover bg-center" 
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=675&fit=crop')"
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col gap-3 lg:gap-4">
              <h1 className="max-w-2xl text-3xl lg:text-4xl font-semibold leading-tight text-white">
                The Long Night — Washington Original
              </h1>
              <p className="max-w-2xl text-sm lg:text-base text-neutral-200">
                Hot new feature, trailer, or event picked for you. The most relevant content for your
                profile and data-profile appears here.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-amber-300">
                  Watch now
                </button>
                <button className="rounded-full border border-neutral-600 bg-neutral-950/70 px-5 py-2.5 text-sm font-semibold text-neutral-100 hover:border-neutral-400">
                  More info
                </button>
              </div>
            </div>
            </article>
          </div>

          {/* Rail 1 – Continue watching */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-neutral-50">{CONTINUE_WATCHING.title}</h2>
              <button className="text-xs text-neutral-400 hover:text-neutral-200">
                More →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {CONTINUE_WATCHING.items.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Rail 2 – Sci-Fi highlights */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-neutral-50">{SCIFI_RAIL.title}</h2>
              <button className="text-xs text-neutral-400 hover:text-neutral-200">
                More →
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {SCIFI_RAIL.items.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Rail 3 – OnDemand Platform tours */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-neutral-50">
                {PLATFORM_TOURS.title}
              </h2>
              <button className="text-xs text-neutral-400 hover:text-neutral-200">
                More →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {PLATFORM_TOURS.items.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default VideoLandingPage;
