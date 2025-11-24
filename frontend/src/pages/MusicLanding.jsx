// file path: /app/frontend/src/pages/MusicLanding.jsx
const MOCK_MUSIC_ITEMS = [
  {
    id: "mix-focus-1",
    title: "Focus Mix: Night Shift",
    artist: "Various Artists",
    tag: "Mix",
  },
  {
    id: "orig-track-1",
    title: "The Long Night (Score)",
    artist: "Washington Originals",
    tag: "Original",
  },
  {
    id: "uplift-1",
    title: "Lifted Lights",
    artist: "Skyline Choir",
    tag: "Playlist",
  },
  {
    id: "kids-1",
    title: "Kids' Storytime Songs",
    artist: "Family Collective",
    tag: "Kids",
  },
];

function MusicRail({ title, items }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-neutral-50">
        {title}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <button
            key={item.id + title}
            type="button"
            className="flex-shrink-0 w-40 md:w-48 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/80 hover:bg-neutral-900 transition overflow-hidden text-left"
          >
            {/* square cover art */}
            <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950" />
            <div className="px-3 py-2 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                {item.tag}
              </p>
              <p className="text-sm font-semibold text-neutral-50 line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-neutral-400 line-clamp-1">
                {item.artist}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function MusicLanding() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-4 space-y-6">
      {/* Hero: Two-column with featured mix */}
      <section className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900/95 via-neutral-900/90 to-neutral-900/80 px-5 py-5 md:py-6">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
          {/* Left: copy */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              Washington · Music
            </p>
            <h1 className="text-xl md:text-2xl font-semibold text-neutral-50">
              Music made to live around you.
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
              Curated mixes, tracks, and albums built to run in the background while the rest of Washington stays open.
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 pt-2">
              Start listening with a mix, then keep exploring.
            </p>
          </div>

          {/* Right: featured mix card */}
          <button
            type="button"
            className="hidden md:flex flex-col justify-between rounded-2xl border border-neutral-700/80 bg-gradient-to-br from-amber-500/40 via-amber-400/20 to-neutral-900/90 p-3 hover:border-amber-300 hover:shadow-lg transition text-left"
          >
            <div className="aspect-square w-full rounded-xl bg-neutral-900/60 flex items-center justify-center text-xs text-neutral-400">
              Album / mix art placeholder
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-200">
                Featured Mix
              </p>
              <p className="text-sm font-semibold text-neutral-50 line-clamp-1">
                Focus Mix: Night Shift
              </p>
              <p className="text-xs text-neutral-300 line-clamp-1">
                Various Artists · 2 hr
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Rails */}
      <section className="space-y-6">
        <MusicRail
          title="Start with these mixes"
          items={MOCK_MUSIC_ITEMS}
        />
        <MusicRail
          title="New from Washington Originals · Music"
          items={MOCK_MUSIC_ITEMS}
        />
        <MusicRail
          title="Trending this week"
          items={MOCK_MUSIC_ITEMS}
        />
      </section>
    </div>
  );
}
