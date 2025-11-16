import { useEffect, useState } from "react";
import "@/App.css";
import { Router } from "./routes/Router.jsx";
import { LayoutShell } from "./components/LayoutShell.jsx";
import { OnboardingModal } from "./components/OnboardingModal.jsx";
import { ViaRibbon } from "./components/via/ViaRibbon.jsx";
import { ViaInvestigatePanel } from "./components/via/ViaInvestigatePanel.jsx";
import { useWashingtonEvents } from "./hooks/useWashingtonEvents";
import { EVENT_TYPES } from "./events/eventTypes";

function App() {
  const [investigateOpen, setInvestigateOpen] = useState(false);
  const { logEvent } = useWashingtonEvents("app-shell");

  // Single SESSION_START per load
  useEffect(() => {
    logEvent(EVENT_TYPES.SESSION_START);
  }, [logEvent]);

  const handleToggleInvestigate = () => {
    setInvestigateOpen((prev) => !prev);
  };

  return (
    <div className="App min-h-screen bg-background text-foreground">
      <LayoutShell>
        <OnboardingModal />
        <Router />
        <ViaRibbon onToggleInvestigate={handleToggleInvestigate} isInvestigateOpen={investigateOpen} />
        <ViaInvestigatePanel open={investigateOpen} />
      </LayoutShell>
    </div>
  );
}

export default App;
