import { useEffect } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/toaster";
import { Router } from "./routes/Router.jsx";
import { LayoutShell } from "./components/LayoutShell.jsx";
import { OnboardingModal } from "./components/OnboardingModal.jsx";
import { useWashingtonEvents } from "./hooks/useWashingtonEvents";
import { EVENT_TYPES } from "./events/eventTypes";

function App() {
  const { logEvent } = useWashingtonEvents("app-shell");

  // Single SESSION_START per load
  useEffect(() => {
    logEvent(EVENT_TYPES.SESSION_START);
  }, [logEvent]);

  return (
    <div className="App min-h-screen bg-background text-foreground">
      <LayoutShell>
        <OnboardingModal />
        <Router />
        <Toaster />
      </LayoutShell>
    </div>
  );
}

export default App;
