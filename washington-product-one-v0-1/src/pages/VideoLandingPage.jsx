import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import videoData from '../data/videoContent.json'
import { useWashingtonEvents } from '../hooks/useWashingtonEvents.js'
import { EVENT_TYPES } from '../events/eventTypes.js'
import { useViaContent } from '../context/ViaContentContext.jsx'
import '../styles/VideoLandingPage.css'

export function VideoLandingPage() {
  const rails = videoData.rails || []
  const { logEvent } = useWashingtonEvents('video-landing')
  const { setCurrentContentId } = useViaContent()

  useEffect(() => {
    logEvent(EVENT_TYPES.PAGE_VIEW, { route: '/' })
    setCurrentContentId(null)
  }, [logEvent, setCurrentContentId])

  const handleCardClick = (railId, video) => {
    logEvent(EVENT_TYPES.CTA_CLICK, {
      ctaName: 'landing_video_click',
      railId,
      videoId: video.id,
      title: video.title
    })
  }

  return (
    <div className="vl-container">
      <section className="vl-hero">
        <div className="vl-hero-copy">
          <h1 className="vl-title">OnDemand for Washington</h1>
          <p className="vl-subtitle">
            Drop into curated Washington sessions as a guest. No signups, no friction—just vertical video
            previews.
          </p>
        </div>
      </section>

      <section className="vl-rails" aria-label="OnDemand video rails">
        {rails.map((rail) => (
          <div key={rail.id} className="vl-rail">
            <h2 className="vl-rail-title">{rail.title}</h2>
            <div className="vl-grid">
              {rail.items?.map((video) => (
                <article key={video.id} className="vl-card">
                  <Link
                    to={`/watch/${video.id}`}
                    className="vl-card-link"
                    onClick={() => handleCardClick(rail.id, video)}
                  >
                    <div className="vl-card-thumb">
                      <div className="vl-thumb-tag">Vertical</div>
                      <div className="vl-thumb-duration">{video.duration}</div>
                    </div>
                    <div className="vl-card-body">
                      <h3 className="vl-card-title">{video.title}</h3>
                      <p className="vl-card-meta">{video.meta}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
