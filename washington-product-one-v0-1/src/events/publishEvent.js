import { spineConfig } from './spineConfig.js'

// Publish to N-BUS if available; otherwise fallback to console.
export function publishEvent(event) {
  try {
    if (window?.NBUS?.publish) {
      window.NBUS.publish(spineConfig.channel, event)
    } else {
      console.debug('[N-BUS stub] publish:', event)
    }
  } catch (err) {
    console.error('[N-BUS failure]', err)
  }
}
