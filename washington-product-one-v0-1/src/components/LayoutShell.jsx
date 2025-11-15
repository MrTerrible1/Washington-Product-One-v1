import '../styles/globals.css'

export function LayoutShell({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <span className="app-logo">Washington</span>
          <nav className="app-nav">
            <button className="app-nav-tab app-nav-tab--active">OnDemand</button>
          </nav>
        </div>
        <div className="app-header-right">
          <span className="app-guest-pill">Guest preview</span>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}
