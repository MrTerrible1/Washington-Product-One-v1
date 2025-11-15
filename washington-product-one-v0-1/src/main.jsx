import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SessionProvider } from './context/SessionContext.jsx'
import './styles/globals.css'

function Root() {
  // Generate a simple UUID-like session id once per reload
  const sessionId = useMemo(
    () =>
      'sess-' +
      Math.random().toString(16).slice(2, 10) +
      '-' +
      Date.now().toString(16),
    [],
  )

  return (
    <StrictMode>
      <BrowserRouter>
        <SessionProvider sessionId={sessionId}>
          <App />
        </SessionProvider>
      </BrowserRouter>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
