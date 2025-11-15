import viaInsights from '../data/viaInsights.json'

// Simple stub that pretends to fetch VIA insights from a service.
// In this guest preview we just read from static JSON.
export function getViaInsights() {
  return viaInsights.insights || []
}
