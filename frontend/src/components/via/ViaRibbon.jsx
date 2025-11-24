import { useState } from "react";
import clsx from "clsx";
import { useWashingtonEvents } from "../../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../../events/eventTypes";

export function ViaRibbon() {
  const [showViaPanel, setShowViaPanel] = useState(false);
  const { logEvent } = useWashingtonEvents("via-assistant");

  const handleToggleVIA = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: showViaPanel ? "via_close" : "via_open",
    });
    setShowViaPanel((open) => !open);
  };

  return (
    <>
      {/* VIA Toggle Button */}
      <button
        type="button"
        onClick={handleToggleVIA}
        className={clsx(
          "fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border text-neutral-300 shadow-lg transition",
          showViaPanel
            ? "bg-amber-400 border-amber-300 text-neutral-950"
            : "bg-neutral-800/80 border-neutral-700 hover:bg-amber-400 hover:border-amber-300 hover:text-neutral-950"
        )}
        aria-label="Open VIA assistant"
      >
        VIA
      </button>

      {/* VIA Panel Aside */}
      {showViaPanel && (
        <aside className="fixed top-0 right-0 h-screen w-[384px] z-50 bg-neutral-950/98 border-l border-neutral-800 shadow-2xl flex flex-col">
          <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                VIA Assistant
              </p>
              <p className="text-sm text-neutral-100">
                I'm VIA, your AI search. What are you looking for today?
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleVIA}
              className="rounded-full p-1 text-neutral-400 hover:text-neutral-100"
              aria-label="Close VIA"
            >
              ✕
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm text-neutral-100">
            <p className="text-neutral-400 text-xs">
              Ask me about titles, creators, or sponsors. I'll search the catalog for you.
            </p>
          </div>

          <form className="border-t border-neutral-800 px-3 py-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search with VIA..."
              className="flex-1 rounded-full bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Send
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
