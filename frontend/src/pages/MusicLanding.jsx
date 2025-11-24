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

const MOCK_CREATORS = [
  { id: "creator-1", name: "Washington Originals", role: "Studio collective" },
  { id: "creator-2", name: "Skyline Choir", role: "Artist" },
  { id: "creator-3", name: "Family Collective", role: "Kids & family" },
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

function CreatorRail({ title, creators }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-neutral-50">
        {title}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {creators.map((creator) => (
          <button
            key={creator.id}
            type="button"
            className="flex-shrink-0 w-40 md:w-48 rounded-2xl border border-neutral-800 bg-neutral-900/90 hover:border-amber-400/80 hover:bg-neutral-900 transition text-left px-3 py-3"
          >
            <div className="mb-2 h-8 w-8 rounded-full bg-neutral-800" />
            <p className="text-sm font-semibold text-neutral-50 line-clamp-1">
              {creator.name}
            </p>
            <p className="text-xs text-neutral-400 line-clamp-1">
              {creator.role}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function MusicLanding() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-3 space-y-5">
      {/* Hero: Featured Mix + Clear Play CTA */}
      <section className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900/95 via-neutral-900/90 to-neutral-900/80 px-5 py-4 md:py-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          {/* Left: copy */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              Washington · Music
            </p>
            <h1 className="text-lg md:text-2xl font-semibold text-neutral-50">
              Music made to live around you.
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
              Curated mixes, tracks, and albums built to run in the background while the rest of Washington stays open.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition"
            >
              ▶ Start with "Focus Mix: Night Shift"
            </button>
          </div>

          {/* Right: featured mix card */}
          <button
            type="button"
            className="flex flex-col justify-between rounded-2xl border border-amber-400/70 bg-gradient-to-br from-amber-500/45 via-amber-400/18 to-neutral-900/95 p-3 hover:border-amber-300 hover:shadow-lg transition text-left"
          >
            <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center text-[11px] text-neutral-400">
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

      {/* Content sections in priority order */}
      <section className="space-y-5 mt-3">
        {/* Priority 1: Start listening */}
        <MusicRail
          title="Start listening with these mixes"
          items={MOCK_MUSIC_ITEMS}
        />

        {/* Priority 2: Engage with creators */}
        <CreatorRail
          title="Featured creators"
          creators={MOCK_CREATORS}
        />

        {/* Priority 3: Show other things by those creators */}
        <MusicRail
          title="From these creators"
          items={MOCK_MUSIC_ITEMS}
        />

        {/* Priority 4: Give sponsors visibility (subtle) */}
        <section className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Enabling Sponsor
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-50">
              REDAVID Hair
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Their support helps bring Washington Originals · Music to life. 
              Supporting them helps us make more sessions, scores, and live recordings.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-50">
              Sponsored mixes
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              A rotating set of playlists and sessions created in partnership with our sponsors.
            </p>
          </div>
        </section>

        {/* Priority 5: Let users explore more creators */}
        <CreatorRail
          title="Explore more creators"
          creators={MOCK_CREATORS}
        />
      </section>
    </div>
  );
}
