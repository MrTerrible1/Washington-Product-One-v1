import { useEffect, useRef } from 'react'
import { useSession } from '../context/SessionContext.jsx'

// Minimal event logging hook that just writes structured events to console.
// No network calls – purely client-side.
export function useWashingtonEvents(source) {
  const { sessionId } = useSession()
  const sourceRef = useRef(source)

  useEffect(() => {
    sourceRef.current = source
  }, [source])

  const logEvent = (type, payload = {}) => {
    const event = {
      ts: new Date().toISOString(),
      sessionId,
      source: sourceRef.current,
      type,
      payload,
    }
    // In a real app this would POST to a backend. Here we only log.
    // eslint-disable-next-line no-console
    console.log('WashingtonEvent', event)
  }

  return { logEvent }
}
