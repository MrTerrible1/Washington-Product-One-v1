import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import videoData from '../data/videoContent.json'
import '../styles/ViewerPage.css'
import { useViaContent } from '../context/ViaContentContext.jsx'
import { useWashingtonEvents } from '../hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from '../events/eventTypes.js'

export function ViewerPage() {
  const { id } = useParams()
  const rails = videoData.rails || []
  const allItems = rails.flatMap((rail) => rail.items || [])
  const video = allItems.find((v) => String(v.id) === String(id))

  const { setCurrentContentId } = useViaContent()
  const { logEvent } = useWashingtonEvents('viewer')

  useEffect(() => {
    if (video) {
      setCurrentContentId(video.id)
      logEvent(EVENT_TYPES.PAGE_VIEW, {
        route: `/watch/${id}`,
        videoId: video.id,
        title: video.title
      })
    } else {
      setCurrentContentId(null)
    }
  }, [video, id, setCurrentContentId, logEvent])

  if (!video) {
    return (
      <div className="vp-container">
        <p className="vp-empty">
          Video not found. Go back to the <Link to="/">OnDemand list</Link>.
        </p>
      </div>
    )
  }

  return (
    <div className="vp-container">
      <div className="vp-layout">
        <section className="vp-player-shell" aria-label="Video player">
          <div className="vp-vertical-frame">
            <div className="vp-video-placeholder">Vertical video placeholder</div>
          </div>
        </section>
        <aside className="vp-meta">
          <h1 className="vp-title">{video.title}</h1>
          <p className="vp-meta-line">{video.meta}</p>
          <p className="vp-duration">Duration: {video.duration}</p>
          <Link to="/" className="vp-back-link">
            Back to OnDemand
          </Link>
        </aside>
      </div>
    </div>
  )
}
