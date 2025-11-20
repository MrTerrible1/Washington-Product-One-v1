import { useEffect, useState } from "react";
import { useWashingtonEvents } from "../../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../../events/eventTypes";
import { getRibbonMessages } from "../../via/viaClient";

export function ViaRibbon({ onToggleInvestigate, isInvestigateOpen }) {
  const [expanded, setExpanded] = useState(true);
  const [messages, setMessages] = useState([]);
  const { logEvent } = useWashingtonEvents("via-ribbon");

  useEffect(() => {
    const msgs = getRibbonMessages();
    setMessages(msgs);
  }, []);

  const currentMessage = messages.length > 0 ? messages[0] : "Calm preview: VIA will handle search, questions, and routing in the full OS.";

  const handleToggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "via_ribbon_expand_toggle",
      expanded: next,
    });
  };

  const handleClickInsights = () => {
    const nextOpen = !isInvestigateOpen;
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: nextOpen ? "via_investigate_open" : "via_investigate_close",
      open: nextOpen,
    });
    onToggleInvestigate?.();
  };

  return (
    <div className="fixed inset-x-0 bottom-3 z-30 flex justify-center pointer-events-none">
      <div className="flex items-center pointer-events-auto">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="mr-2 rounded-full bg-foreground text-background text-xs px-3 py-1 shadow-sm"
          aria-label={expanded ? "Collapse VIA ribbon" : "Expand VIA ribbon"}
        >
          VIA
        </button>
        {expanded && (
          <div className="flex items-center gap-3 rounded-full bg-foreground text-background px-4 py-2 shadow-lg">
            <span className="text-xs font-semibold tracking-wide uppercase">VIA v0.1 (mocked)</span>
            <span className="text-xs text-background/80 max-w-xs truncate">{currentMessage}</span>
            <button
              type="button"
              onClick={handleClickInsights}
              className="ml-1 rounded-full bg-background text-foreground text-xs px-3 py-1 font-medium hover:bg-secondary transition-colors"
            >
              {isInvestigateOpen ? "Close VIA" : "Ask VIA"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
