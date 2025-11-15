import { useEffect, useRef } from 'react'
import { useSession } from '../context/SessionContext.jsx'
import { EVENT_TYPES } from '../events/eventTypes.js'
import { publishEvent } from '../events/publishEvent.js'

export function useWashingtonEvents(source) {
  const { sessionId } = useSession()
  const sourceRef = useRef(source)

  useEffect(() => {
    sourceRef.current = source
  }, [source])

  const logEvent = (type, payload = {}) => {
    const event = {
      type,
      sessionId,
      timestamp: new Date().toISOString(),
      payload: { source: sourceRef.current, ...payload }
    }

    // console log always
    console.log('WashingtonEvent', event)

    // forward to N-BUS or fallback
    publishEvent(event)
  }

  return { logEvent, EVENT_TYPES }
}
