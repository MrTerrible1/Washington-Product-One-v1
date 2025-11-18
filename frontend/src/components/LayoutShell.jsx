import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const COMING_SOON_MESSAGE = "This area is coming soon.";

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
  const location = useLocation();
  const navigate = useNavigate();

  const isOnDemand = location.pathname === "/" || location.pathname.startsWith("/content");
  const isBroadcast = location.pathname.startsWith("/broadcast-preview");

  const handleComingSoon = (label) => {
    toast({
      title: label,
      description: COMING_SOON_MESSAGE,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex flex-col gap-2 px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold tracking-[0.18em] uppercase text-sm">
              WASHINGTON
            </span>

            <nav className="flex items-center gap-2 text-xs md:text-sm">
              {/* OnDemand tab */}
              <button
                type="button"
                className={
                  isOnDemand
                    ? "rounded-full px-3 py-1 bg-foreground text-background font-medium"
                    : "rounded-full px-3 py-1 border border-border text-muted-foreground hover:bg-secondary transition-colors"
                }
                onClick={() => navigate("/")}
              >
                OnDemand
              </button>
              {/* Broadcast tab */}
              <button
                type="button"
                className={
                  isBroadcast
                    ? "rounded-full px-3 py-1 bg-foreground text-background font-medium"
                    : "rounded-full px-3 py-1 border border-border text-muted-foreground hover:bg-secondary transition-colors"
                }
                onClick={() => navigate("/broadcast-preview")}
              >
                Broadcast
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="text-xs md:text-sm px-3 py-1 rounded-full border border-border text-muted-foreground opacity-60 cursor-not-allowed"
              onClick={() => handleComingSoon("Login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[11px] md:text-xs text-muted-foreground">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold tracking-[0.18em] uppercase">Verticals</span>
            <div className="flex items-center gap-1 flex-wrap">
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
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold tracking-[0.18em] uppercase">Silos</span>
            <div className="flex items-center gap-1 flex-wrap">
              {SILO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="rounded-full px-2.5 py-0.5 border border-border text-[11px] md:text-xs text-muted-foreground hover:bg-secondary transition-colors"
                  onClick={() => handleComingSoon(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 pb-20 pt-6 md:px-10 md:pt-8 flex flex-col items-stretch">
        <div className="w-full max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
