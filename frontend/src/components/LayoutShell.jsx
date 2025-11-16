import { useToast } from "@/hooks/use-toast";

const COMING_SOON_MESSAGE =
  "This area is coming soon in the full Washington platform.";

// Top-level navigation tabs for the Washington shell.
// Verticals: Video, Music, Games, Books
// Silos: Crowdfunding, Store, Social
const VERTICAL_TABS = [
  { id: "video", label: "Video" },
  { id: "music", label: "Music" },
  { id: "games", label: "Games" },
  { id: "books", label: "Books" },
];

const SILO_TABS = [
  { id: "crowdfunding", label: "Crowdfunding" },
  { id: "store", label: "Store" },
  { id: "social", label: "Social" },
];

export function LayoutShell({ children }) {
  const { toast } = useToast();

  const handleComingSoon = (label) => {
    toast({
      title: label,
      description: COMING_SOON_MESSAGE,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center gap-6">
          <span className="font-semibold tracking-[0.18em] uppercase text-sm">
            WASHINGTON
          </span>

          <nav className="flex items-center gap-3 text-xs md:text-sm">
            {/* Primary Product One tab */}
            <button
              type="button"
              className="rounded-full px-3 py-1 bg-foreground text-background font-medium"
            >
              OnDemand
            </button>

            {/* Verticals group */}
            <div className="flex items-center gap-1">
              {VERTICAL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="rounded-full px-3 py-1 border border-border text-muted-foreground hover:bg-secondary transition-colors"
                  onClick={() => handleComingSoon(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Silos group */}
            <div className="flex items-center gap-1">
              {SILO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="rounded-full px-3 py-1 border border-border text-muted-foreground hover:bg-secondary transition-colors"
                  onClick={() => handleComingSoon(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground bg-card">
            Guest preview
          </span>
          <button
            type="button"
            disabled
            className="text-xs md:text-sm px-3 py-1 rounded-full border border-border text-muted-foreground opacity-60 cursor-not-allowed"
            onClick={() => handleComingSoon("Login")}
          >
            Login
          </button>
        </div>
      </header>
      <main className="flex-1 px-4 pb-20 pt-6 md:px-10 md:pt-8 flex flex-col items-stretch">
        <div className="w-full max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
