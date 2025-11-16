import { useEffect, useRef } from "react";
import { useSession } from "../context/SessionContext.jsx";
import { EVENT_TYPES } from "../events/eventTypes";
import { publishEvent } from "../events/publishEvent";

// Canonical WashingtonEvent shape:
// {
//   type: string,
//   sessionId: string,
//   timestamp: string,
//   payload: object,
// }

export function useWashingtonEvents(source) {
  const { sessionId } = useSession();
  const sourceRef = useRef(source);

  useEffect(() => {
    sourceRef.current = source;
  }, [source]);

  const logEvent = (type, payload = {}) => {
    const event = {
      type,
      sessionId,
      timestamp: new Date().toISOString(),
      payload: { source: sourceRef.current, ...payload },
    };

    // eslint-disable-next-line no-console
    console.log("WashingtonEvent", event);
    publishEvent(event);
  };

  return { logEvent, EVENT_TYPES };
}
