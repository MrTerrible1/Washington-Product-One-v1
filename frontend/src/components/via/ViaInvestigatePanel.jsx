import { useEffect, useState } from "react";
import { investigateContent } from "../../via/viaClient";
import { useWashingtonEvents } from "../../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../../events/eventTypes";
import { useViaContent } from "../../context/ViaContentContext.jsx";

export function ViaInvestigatePanel({ open }) {
  const [insight, setInsight] = useState(null);
  const { currentContentId } = useViaContent();
  const { logEvent } = useWashingtonEvents("via-panel");

  useEffect(() => {
    if (!open) return;

    const result = investigateContent({ sessionId: null, contentId: currentContentId });
    setInsight(result);

    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: "via_investigate_panel_open",
      contentId: currentContentId || "default",
    });
  }, [open, currentContentId, logEvent]);

  if (!open) return null;

  if (!insight) {
    return (
      <aside className="fixed inset-y-16 right-0 z-20 w-80 bg-background border-l border-border shadow-xl flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">VIA insights</h2>
          <p className="text-xs text-muted-foreground">No insights available.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed inset-y-16 right-0 z-20 w-80 bg-background border-l border-border shadow-xl flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">{insight.title}</h2>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.summary}</p>
      </div>
      {insight.tags && insight.tags.length > 0 && (
        <div className="px-4 py-3 overflow-auto">
          <ul className="flex flex-wrap gap-1.5">
            {insight.tags.map((tag) => (
              <li
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
