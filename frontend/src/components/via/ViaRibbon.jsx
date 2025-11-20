import { useState } from "react";
import { useWashingtonEvents } from "../../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../../events/eventTypes";

export function ViaRibbon({ onToggleInvestigate, isInvestigateOpen }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { logEvent } = useWashingtonEvents("via-assistant");

  const handleClickVIA = () => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: isInvestigateOpen ? "via_close" : "via_open",
    });
    onToggleInvestigate?.();
  };

  return (
    <>
      {/* Floating VIA Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && !isInvestigateOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-64 px-4 py-3 bg-black/90 text-white text-xs rounded-xl shadow-xl">
              I'm VIA, your AI search engine. How can I help you find what you need?
            </div>
          )}
          
          {/* Button */}
          <button
            type="button"
            onClick={handleClickVIA}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center font-bold text-sm hover:scale-105 hover:shadow-xl transition-all duration-200"
            aria-label="Open VIA Assistant"
          >
            VIA
          </button>
        </div>
      </div>

      {/* Flyout Panel */}
      {isInvestigateOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold">Ask VIA</h2>
            <button
              type="button"
              onClick={handleClickVIA}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close VIA"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Search across Washington. Ask for shows, creators, or help navigating.
            </p>
            
            {/* Mock Input */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="What can I help you find?"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Send
              </button>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground italic">
                VIA assistant is mocked for guest preview. Full search and routing available in Calm (logged-in) mode.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
