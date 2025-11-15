import { useState, useEffect } from 'react'
import { LayoutShell } from './components/LayoutShell.jsx'
import { OnboardingModal } from './components/OnboardingModal.jsx'
import { Router } from './routes/Router.jsx'
import { ViaRibbon } from './components/via/ViaRibbon.jsx'
import { ViaInvestigatePanel } from './components/via/ViaInvestigatePanel.jsx'
import { useWashingtonEvents } from './hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from './events/eventTypes.js'
import { ViaContentProvider, useViaContent } from './context/ViaContentContext.jsx'

function AppShell() {
  const [investigateOpen, setInvestigateOpen] = useState(false)
  const { currentContentId } = useViaContent()
  const { logEvent } = useWashingtonEvents('app-shell')

  // Single SESSION_START per load
  useEffect(() => {
    logEvent(EVENT_TYPES.SESSION_START)
  }, [logEvent])

  const handleToggleInvestigate = () => {
    setInvestigateOpen((prev) => !prev)
    // VIA CTA events are logged inside ViaRibbon; no duplicate logging here.
  }

  return (
    <LayoutShell>
      <OnboardingModal />
      <Router />
      <ViaRibbon
        onToggleInvestigate={handleToggleInvestigate}
        isInvestigateOpen={investigateOpen}
      />
      <ViaInvestigatePanel
        open={investigateOpen}
        contentId={currentContentId}
      />
    </LayoutShell>
  )
}

function App() {
  return (
    <ViaContentProvider>
      <AppShell />
    </ViaContentProvider>
  )
}

export default App
