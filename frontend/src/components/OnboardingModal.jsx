import { useEffect, useState } from "react";
import { useWashingtonEvents } from "../hooks/useWashingtonEvents";
import { EVENT_TYPES } from "../events/eventTypes";

const SESSION_STORAGE_KEY = "washington_onboarding_seen";

const steps = [
  {
    id: 1,
    title: "Guest Preview",
    body: "This is a guest-only preview of Washington. You can explore without creating an account.",
  },
  {
    id: 2,
    title: "VIA v0.1",
    body: "VIA is mocked in this preview. It simulates intelligence with pre-computed insights only.",
  },
  {
    id: 3,
    title: "You're in Control",
    body: "You decide what to watch and when to open VIA. Close this to start exploring videos.",
  },
];

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { logEvent } = useWashingtonEvents("onboarding-modal");

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!seen) {
      setOpen(true);
      logEvent(EVENT_TYPES.ONBOARDING_EVENT, { action: "view", step: 1 });
    }
  }, [logEvent]);

  const current = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const closeForSession = (meta) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    setOpen(false);
    if (meta) {
      logEvent(EVENT_TYPES.ONBOARDING_EVENT, meta);
    }
  };

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      logEvent(EVENT_TYPES.ONBOARDING_EVENT, { action: "next", step: nextIndex + 1 });
    } else {
      closeForSession({ action: "start", step: stepIndex + 1 });
    }
  };

  const handleSkip = () => {
    closeForSession({ action: "skip", step: stepIndex + 1 });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-card shadow-xl border border-border px-6 py-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-muted-foreground">
            Step {stepIndex + 1} of {steps.length}
          </span>
        </div>
        <div className="space-y-2 mb-5">
          <h2 className="text-xl font-semibold tracking-tight">{current.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{current.body}</p>
        </div>
        <div className="flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={handleSkip}
            className="px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-background hover:bg-secondary transition-colors"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-1.5 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            {isLast ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
