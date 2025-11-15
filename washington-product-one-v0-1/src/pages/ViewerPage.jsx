import { useParams, Link } from 'react-router-dom'
import videoData from '../data/videoContent.json'
import '../styles/ViewerPage.css'

export function ViewerPage() {
  const { id } = useParams()
  const videos = videoData.videos || []
  const video = videos.find((v) => String(v.id) === String(id))

  if (!video) {
    return (
      <div className="vp-container">
        <p className="vp-empty">Video not found. Go back to the <Link to="/">OnDemand list</Link>.</p>
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
