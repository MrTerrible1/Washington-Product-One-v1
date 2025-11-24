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
            className="flex-shrink-0 w-40 md:w-48 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 transition overflow-hidden text-left"
          >
            {/* square cover art placeholder */}
            <div className="aspect-square w-full bg-neutral-800" />
            <div className="px-3 py-2 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                {item.tag}
              </p>
              <p className="text-sm font-medium text-neutral-50 line-clamp-1">
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
    <div className="mx-auto max-w-6xl px-6 py-6 space-y-8">
      {/* Simple Music hero */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/80 px-5 py-5 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          Washington · Music
        </p>
        <h1 className="text-xl md:text-2xl font-semibold text-neutral-50">
          Music made to live around you.
        </h1>
        <p className="text-xs md:text-sm text-neutral-400">
          Browse mixes, tracks, and albums built to run in the background while the rest of Washington stays open.
        </p>
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
