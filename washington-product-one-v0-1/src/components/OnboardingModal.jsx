import { useEffect, useState } from 'react'
import '../styles/OnboardingModal.css'

const SESSION_STORAGE_KEY = 'washington_onboarding_seen'

const steps = [
  {
    id: 1,
    title: 'Guest Preview',
    body: "This is a guest-only preview of Washington. You can explore without creating an account.",
  },
  {
    id: 2,
    title: 'VIA v0.1',
    body: 'VIA is mocked in this preview. It simulates intelligence with pre-computed insights only.',
  },
  {
    id: 3,
    title: "You're in Control",
    body: 'You decide what to watch and when to open VIA. Close this to start exploring videos.',
  },
]

export function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!seen) {
      setOpen(true)
    }
  }, [])

  const closeForSession = () => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
    setOpen(false)
  }

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    } else {
      closeForSession()
    }
  }

  const handleSkip = () => {
    closeForSession()
  }

  if (!open) return null

  const current = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1

  return (
    <div className="ob-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ob-modal">
        <div className="ob-modal-header">
          <span className="ob-step-indicator">
            Step {stepIndex + 1} of {steps.length}
          </span>
        </div>
        <div className="ob-modal-body">
          <h2 className="ob-title">{current.title}</h2>
          <p className="ob-description">{current.body}</p>
        </div>
        <div className="ob-modal-footer">
          <button type="button" className="ob-btn ob-btn-secondary" onClick={handleSkip}>
            Skip
          </button>
          <button type="button" className="ob-btn ob-btn-primary" onClick={handleNext}>
            {isLast ? 'Start' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
