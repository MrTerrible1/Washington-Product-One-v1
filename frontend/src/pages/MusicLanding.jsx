// file path: /app/frontend/src/pages/MusicLanding.jsx
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";

const MOOD_CHIPS = [
  "Focus soundtrack",
  "Background while I browse",
  "Discover new artists",
  "Kids / family friendly",
  "Something uplifting",
  "I'm not sure yet",
];

const MAIN_CHIPS = [
  "Songs",
  "Albums",
  "Playlists",
  "Stations",
  "Background channels",
];

const GENRE_CHIPS = [
  "Pop",
  "Rock",
  "Hip-hop",
  "Electronic",
  "Indie",
  "Worship",
  "Classical",
  "Lo-fi",
  "Kids",
];

// Simple mock data for rails
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
];

export function MusicLanding() {
  const { logEvent } = useWashingtonEvents("music-landing");

  const handleChipClick = (group, label) => {
    logEvent("music_pref_click", { group, label });
  };

  const renderRail = (title, items) => (
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
            <div className="h-32 w-full bg-neutral-800" />
            <div className="px-3 py-2 space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-6 space-y-8">
      {/* Top: Music hero / VIA-style quick tune-in */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/80 px-5 py-5 space-y-5">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Washington · Music
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-neutral-50">
            Tune the soundtrack before you hit play.
          </h1>
          <p className="text-xs md:text-sm text-neutral-400">
            Tell VIA what you&apos;re here for and we&apos;ll surface the right mixes, tracks, and artists.
          </p>
        </div>

        {/* Row 1: What are you here for today? */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-100">
            What are you here for today?
          </h2>
          <div className="flex flex-wrap gap-2">
            {MOOD_CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleChipClick("mood", label)}
                className="rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1.5 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-200 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: What's your main? */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-100">
            What&apos;s your main?
          </h3>
          <div className="flex flex-wrap gap-2">
            {MAIN_CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleChipClick("main", label)}
                className="rounded-full border border-neutral-700 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-200 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Pick a few genres */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-100">
            Pick a few genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {GENRE_CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleChipClick("genre", label)}
                className="rounded-full border border-neutral-700 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-200 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rails */}
      <section className="space-y-6">
        {renderRail("Start with these mixes", MOCK_MUSIC_ITEMS)}
        {renderRail("New from Washington Originals · Music", MOCK_MUSIC_ITEMS)}
        {renderRail("Trending this week", MOCK_MUSIC_ITEMS)}
      </section>
    </div>
  );
}
