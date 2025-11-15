import { useState } from 'react'
import '../../styles/ViaRibbon.css'

export function ViaRibbon({ onToggleInvestigate, isInvestigateOpen }) {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    onToggleInvestigate?.()
  }

  return (
    <div className={`via-ribbon ${expanded ? 'via-ribbon--expanded' : ''}`}>
      <button
        type="button"
        className="via-ribbon-toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Collapse VIA ribbon' : 'Expand VIA ribbon'}
      >
        VIA
      </button>
      {expanded && (
        <div className="via-ribbon-main">
          <span className="via-ribbon-label">VIA v0.1 (mocked)</span>
          <button
            type="button"
            className="via-ribbon-cta"
            onClick={handleClick}
          >
            {isInvestigateOpen ? 'Hide insights' : 'Open insights'}
          </button>
        </div>
      )}
    </div>
  )
}
