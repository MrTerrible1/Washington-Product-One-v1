import viaInsights from '../data/viaInsights.json'

// v0.1 VIA stub:
// - initVia: no-op with console debug
// - logEvent: no-op with console debug
// - getRibbonMessages: static messages from JSON
// - investigateContent: per-content lookup with default

export function initVia(sessionId) {
  console.debug('[VIA init stub]', { sessionId })
}

export function logEvent(event) {
  console.debug('[VIA event stub]', event)
}

export function getRibbonMessages() {
  return viaInsights.ribbonMessages || []
}

export function investigateContent({ sessionId, contentId }) {
  const map = viaInsights.contentInsights || {}
  if (!contentId) return map.default || null
  return map[contentId] || map.default || null
}
