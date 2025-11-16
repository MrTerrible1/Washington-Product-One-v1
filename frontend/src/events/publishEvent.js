// Publish to N-BUS if available; otherwise fallback to console.
const CHANNEL = "washington.eventstream.v0";

export function publishEvent(event) {
  try {
    if (window?.NBUS?.publish) {
      window.NBUS.publish(CHANNEL, event);
    } else {
      // eslint-disable-next-line no-console
      console.debug("[N-BUS stub] publish:", event);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[N-BUS failure]", err);
  }
}
