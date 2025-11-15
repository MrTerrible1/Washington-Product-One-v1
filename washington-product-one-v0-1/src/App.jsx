import { useState, useEffect } from 'react'
import { LayoutShell } from './components/LayoutShell.jsx'
import { OnboardingModal } from './components/OnboardingModal.jsx'
import { Router } from './routes/Router.jsx'
import { ViaRibbon } from './components/via/ViaRibbon.jsx'
import { ViaInvestigatePanel } from './components/via/ViaInvestigatePanel.jsx'
import { useWashingtonEvents } from './hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from './events/eventTypes.js'

function App() {
  const [investigateOpen, setInvestigateOpen] = useState(false)
  const { logEvent } = useWashingtonEvents('app-shell')

  useEffect(() => {
    logEvent(EVENT_TYPES.SESSION_START)
    logEvent(EVENT_TYPES.PAGE_VIEW, { route: 'landing' })
  }, [])

  const handleToggleInvestigate = () => {
    setInvestigateOpen((prev) => {
      const next = !prev
      logEvent(next ? 'via_open' : 'via_close')
      return next
    })
  }

  return (
    <LayoutShell>
      <OnboardingModal />
      <Router />
      <ViaRibbon onToggleInvestigate={handleToggleInvestigate} isInvestigateOpen={investigateOpen} />
      <ViaInvestigatePanel open={investigateOpen} />
    </LayoutShell>
  )
}

export default App
