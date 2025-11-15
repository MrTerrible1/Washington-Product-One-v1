import { useEffect, useState } from 'react'
import { useWashingtonEvents } from '../../hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from '../../events/eventTypes.js'
import { getRibbonMessages } from '../../via/viaClient.js'
import '../../styles/ViaRibbon.css'

export function ViaRibbon({ onToggleInvestigate, isInvestigateOpen }) {
  const [expanded, setExpanded] = useState(true)
  const [messages, setMessages] = useState([])
  const { logEvent } = useWashingtonEvents('via-ribbon')

  useEffect(() => {
    const msgs = getRibbonMessages()
    setMessages(msgs)
  }, [])

  const currentMessage =
    messages.length > 0 ? messages[0] : 'VIA v0.1 is mocked in this preview.'

  const handleToggleExpand = () => {
    const next = !expanded
    setExpanded(next)
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: 'via_ribbon_expand_toggle',
      expanded: next
    })
  }

  const handleClickInsights = () => {
    const nextOpen = !isInvestigateOpen
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: nextOpen ? 'via_investigate_open' : 'via_investigate_close',
      open: nextOpen
    })
    onToggleInvestigate?.()
  }

  return (
    <div className={`via-ribbon ${expanded ? 'via-ribbon--expanded' : ''}`}>
      <button
        type="button"
        className="via-ribbon-toggle"
        onClick={handleToggleExpand}
        aria-label={expanded ? 'Collapse VIA ribbon' : 'Expand VIA ribbon'}
      >
        VIA
      </button>
      {expanded && (
        <div className="via-ribbon-main">
          <span className="via-ribbon-label">VIA</span>
          <span className="via-ribbon-message">{currentMessage}</span>
          <button
            type="button"
            className="via-ribbon-cta"
            onClick={handleClickInsights}
          >
            {isInvestigateOpen ? 'Hide insights' : 'Open insights'}
          </button>
        </div>
      )}
    </div>
  )
}
