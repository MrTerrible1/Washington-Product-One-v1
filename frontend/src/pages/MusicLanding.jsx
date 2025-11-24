import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_MUSIC_ITEMS = [
  {
    id: "mix-focus-1",
    title: "Focus Mix: Night Shift",
    artist: "Various Artists",
    tag: "Mix",
    duration: "2 hr",
  },
  {
    id: "orig-track-1",
    title: "The Long Night (Score)",
    artist: "Washington Originals",
    tag: "Original",
    duration: "48 min",
  },
  {
    id: "uplift-1",
    title: "Lifted Lights",
    artist: "Skyline Choir",
    tag: "Playlist",
    duration: "1 hr 10 min",
  },
  {
    id: "kids-1",
    title: "Kids' Storytime Songs",
    artist: "Family Collective",
    tag: "Kids",
    duration: "36 min",
  },
];

const MOCK_CREATORS = [
  { id: "creator-1", name: "Washington Originals", role: "Studio collective" },
  { id: "creator-2", name: "Skyline Choir", role: "Artist" },
  { id: "creator-3", name: "Family Collective", role: "Kids & family" },
];

function MusicRail({ title, items, onPlay }) {
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
            onClick={() => onPlay(item)}
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
              <p className="text-[11px] text-neutral-500">
                {item.duration}
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
  const [activeTrack, setActiveTrack] = useState(null);
  const navigate = useNavigate();
  const featured = MOCK_MUSIC_ITEMS[0];

  const handlePlay = (item) => {
    setActiveTrack(item);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-4 pb-24">
      <div className="grid gap-6 md:grid-cols-[150px_minmax(0,1fr)] items-start">
        {/* LEFT: nav + broadcast */}
        <aside className="hidden md:flex flex-col gap-3 pt-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
            Music
          </p>

          {/* Music section pills */}
          <button className="rounded-full px-3 py-1.5 text-xs font-semibold bg-amber-400 text-neutral-950">
            Home
          </button>
          <button className="rounded-full px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800/80">
            Mixes
          </button>
          <button className="rounded-full px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800/80">
            Playlists
          </button>
          <button className="rounded-full px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800/80">
            Artists
          </button>
          <button className="rounded-full px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800/80">
            Kids &amp; Family
          </button>

          {/* Broadcast teaser */}
          <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900/95 px-3 py-3 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Live from Broadcast
            </p>

            <button
              type="button"
              className="w-full flex items-center justify-between rounded-xl bg-neutral-950/80 px-3 py-2 hover:bg-neutral-900 transition"
              onClick={() => navigate('/broadcast')}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <div>
                  <p className="text-xs font-semibold text-neutral-50">
                    Lo-fi Focus Radio
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Broadcast · Music · Live
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">Listen</p>
            </button>

            <button
              type="button"
              className="w-full text-[11px] text-neutral-400 hover:text-amber-300 text-left"
              onClick={() => navigate('/broadcast')}
            >
              View all live channels →
            </button>
          </div>
        </aside>

        {/* RIGHT: hero + rails */}
        <section className="space-y-6">
          {/* HERO */}
          <section className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-900/80 px-5 py-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
              {/* Text side */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  Washington · Music
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-50">
                  Music made to live around you.
                </h1>
                <p className="text-sm text-neutral-300 max-w-xl">
                  Curated mixes, tracks, and albums built to run in the background
                  while the rest of Washington stays open.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTrack(featured)}
                  className="inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-300"
                >
                  ▶ Start with "{featured.title}"
                </button>
              </div>

              {/* Art / featured card */}
              <div className="justify-self-end">
                <div className="w-64 aspect-square rounded-2xl bg-gradient-to-br from-amber-500/60 to-neutral-900 border border-amber-400/80 shadow-xl flex items-center justify-center text-[11px] text-neutral-300">
                  Album / mix art placeholder
                </div>
                <div className="mt-2 text-[11px] text-neutral-400">
                  Featured mix · {featured.title} · {featured.artist} · {featured.duration}
                </div>
              </div>
            </div>
          </section>

          {/* RAILS */}
          <section className="space-y-5">
            <MusicRail
              title="Start listening with these mixes"
              items={MOCK_MUSIC_ITEMS}
              onPlay={handlePlay}
            />

            <CreatorRail
              title="Featured creators"
              creators={MOCK_CREATORS}
            />

            <MusicRail
              title="From these creators"
              items={MOCK_MUSIC_ITEMS}
              onPlay={handlePlay}
            />
          </section>
        </section>
      </div>

      {/* MINI PLAYER */}
      {activeTrack && (
        <div className="fixed bottom-4 left-6 right-20 z-40">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/95 px-4 py-3 flex items-center gap-4 shadow-2xl">
            <div className="h-10 w-10 rounded-full bg-neutral-800" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                Now Playing
              </p>
              <p className="text-sm font-semibold text-neutral-50 truncate">
                {activeTrack.title}
              </p>
              <p className="text-xs text-neutral-400 truncate">
                {activeTrack.artist} · {activeTrack.duration}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-neutral-950 text-xs font-semibold hover:bg-amber-300">
                ❚❚
              </button>
              <button className="text-xs text-neutral-300 hover:text-amber-300">
                Add to playlist
              </button>
              <button className="text-xs text-neutral-300 hover:text-amber-300">
                Like
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack(null)}
                className="text-xs text-neutral-500 hover:text-neutral-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
