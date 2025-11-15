import '../../styles/ViaInvestigatePanel.css'
import viaInsights from '../../data/viaInsights.json'

export function ViaInvestigatePanel({ open }) {
  const insights = viaInsights.insights || []

  return (
    <aside className={`via-panel ${open ? 'via-panel--open' : ''}`} aria-label="VIA insights">
      <div className="via-panel-header">
        <h2 className="via-panel-title">VIA v0.1 (simulated)</h2>
        <p className="via-panel-subtitle">These insights are mocked from a local JSON file.</p>
      </div>
      <div className="via-panel-body">
        {insights.map((item) => (
          <article key={item.id} className="via-insight-card">
            <h3 className="via-insight-title">{item.label}</h3>
            <p className="via-insight-body">{item.summary}</p>
          </article>
        ))}
      </div>
    </aside>
  )
}
