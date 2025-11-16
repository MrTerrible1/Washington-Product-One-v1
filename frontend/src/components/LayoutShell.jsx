export function LayoutShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center gap-6">
          <span className="font-semibold tracking-[0.18em] uppercase text-sm">Washington</span>
          <nav className="flex gap-1 text-sm">
            <button className="rounded-full px-3 py-1 bg-foreground text-background font-medium">
              OnDemand
            </button>
          </nav>
        </div>
        <div>
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground bg-card">
            Guest preview
          </span>
        </div>
      </header>
      <main className="flex-1 px-4 pb-20 pt-6 md:px-10 md:pt-8 flex flex-col items-stretch">
        <div className="w-full max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
