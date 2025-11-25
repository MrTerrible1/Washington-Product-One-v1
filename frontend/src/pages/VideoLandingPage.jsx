// OnDemandVideoLanding.jsx
// Video landing for the OnDemand "Video" tab.

const GENRES = [
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Action",
  "Rom-com",
  "Kids",
  "Animated",
  "AI",
];

const FORMATS = ["Horizontal", "Vertical"];

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

const GUIDES_RAIL = {
  title: "Washington Originals – Tours & platform guides",
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

function Pill({ active, children }) {
  return (
    <button
      type="button"
      className={
        "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors " +
        (active
          ? "bg-amber-400 text-neutral-900 border-amber-300"
          : "bg-neutral-900/60 text-neutral-100 border-neutral-700 hover:bg-neutral-800")
      }
    >
      {children}
    </button>
  );
}

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

export default function OnDemandVideoLanding() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 space-y-10">
      {/* Top grid: premier controls + hero */}
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] items-start">
        {/* LEFT: Premier controls */}
        <aside className="space-y-6">
          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-400">
              Premier controls
            </p>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre, index) => (
                <Pill key={genre} active={index === 0}>
                  {genre}
                </Pill>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-400">
              Formats
            </p>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((format, index) => (
                <Pill key={format} active={index === 0}>
                  {format}
                </Pill>
              ))}
            </div>
          </section>
        </aside>

        {/* RIGHT: Hero */}
        <section className="space-y-0">
          <article className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-black">
            <div className="aspect-[21/9] w-full">
              <div 
                className="h-full w-full bg-cover bg-center" 
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=675&fit=crop')"
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
                The Long Night — Washington Original
              </h1>
              <p className="max-w-xl text-sm md:text-base text-neutral-200">
                Hot new feature, trailer, or event picked for you. The most
                relevant content for your profile and data-profile appears here.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
                >
                  Watch Now
                </button>
                <button
                  type="button"
                  className="rounded-full border border-neutral-300/70 bg-black/40 px-5 py-2 text-sm font-semibold text-neutral-50 hover:bg-neutral-900 transition-colors"
                >
                  More info
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>

      {/* Sci-Fi Highlights rail */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-neutral-50">
            {SCIFI_RAIL.title}
          </h2>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 hover:text-neutral-200"
          >
            More →
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          {SCIFI_RAIL.items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Guides & tours rail */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-neutral-50">
            {GUIDES_RAIL.title}
          </h2>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 hover:text-neutral-200"
          >
            More →
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          {GUIDES_RAIL.items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
