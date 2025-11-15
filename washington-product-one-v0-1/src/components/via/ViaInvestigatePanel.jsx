import { useEffect, useState } from 'react'
import '../../styles/ViaInvestigatePanel.css'
import { investigateContent } from '../../via/viaClient.js'
import { useWashingtonEvents } from '../../hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from '../../events/eventTypes.js'

export function ViaInvestigatePanel({ open, contentId }) {
  const [insight, setInsight] = useState(null)
  const { logEvent } = useWashingtonEvents('via-panel')

  useEffect(() => {
    if (!open) return

    const result = investigateContent({ sessionId: null, contentId })
    setInsight(result)

    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: 'via_investigate_panel_open',
      contentId: contentId || 'default'
    })
  }, [open, contentId, logEvent])

  if (!open) {
    return null
  }

  if (!insight) {
    return (
      <aside className="via-panel via-panel--open" aria-label="VIA insights">
        <div className="via-panel-header">
          <h2 className="via-panel-title">VIA insights</h2>
          <p className="via-panel-subtitle">No insights available.</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="via-panel via-panel--open" aria-label="VIA insights">
      <div className="via-panel-header">
        <h2 className="via-panel-title">{insight.title}</h2>
        <p className="via-panel-subtitle">{insight.summary}</p>
      </div>
      {insight.tags && insight.tags.length > 0 && (
        <div className="via-panel-body">
          <ul className="via-tags">
            {insight.tags.map((tag) => (
              <li key={tag} className="via-tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
