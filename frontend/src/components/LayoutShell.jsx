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

const BROADCAST_CATEGORY_TABS = [
  { id: "video", label: "Video" },
  { id: "radio", label: "Radio" },
  { id: "podcast", label: "Podcasts" },
  { id: "twitch", label: "Live & Twitch-style" },
  { id: "howto", label: "How-To & Builds" },
  { id: "unboxing", label: "Reviews & Unboxing" },
  { id: "kids", label: "Kids & Family" },
];

export function LayoutShell({ children }) {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Treat "/" and any "/content/..." as OnDemand
  const isOnDemand =
    pathname === "/" ||
    pathname === "/ondemand" ||
    pathname.startsWith("/content");

  // Treat any "/broadcast" or "/broadcast-preview" as Broadcast
  const isBroadcast =
    pathname.startsWith("/broadcast") ||
    pathname.startsWith("/broadcast-preview");

  // Determine active vertical (Video for all guest routes in this demo)
  const activeVertical = (() => {
    if (pathname.startsWith("/broadcast")) return "Video";
    if (pathname === "/" || pathname.startsWith("/content")) return "Video";
    return null;
  })();

  const handleComingSoon = (label) => {
    toast({
      title: label,
      description: COMING_SOON_MESSAGE,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex flex-col gap-2 px-8 py-4 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-semibold tracking-[0.22em] uppercase text-sm">
              WASHINGTON
            </span>

            <nav className="flex items-center gap-3">
              {/* OnDemand tab - LARGE */}
              <button
                type="button"
                className={
                  isOnDemand
                    ? "rounded-full px-5 py-2 text-sm md:text-base font-semibold bg-primary text-primary-foreground shadow-sm"
                    : "rounded-full px-5 py-2 text-sm md:text-base font-semibold border border-border/60 bg-background text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-colors"
                }
                onClick={() => navigate("/")}
              >
                OnDemand
              </button>
              {/* Broadcast tab - LARGE */}
              <button
                type="button"
                className={
                  isBroadcast
                    ? "rounded-full px-5 py-2 text-sm md:text-base font-semibold bg-primary text-primary-foreground shadow-sm"
                    : "rounded-full px-5 py-2 text-sm md:text-base font-semibold border border-border/60 bg-background text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-colors"
                }
                onClick={() => navigate("/broadcast-preview")}
              >
                Broadcast
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="hidden md:inline-flex items-center rounded-full bg-secondary/60 px-3 py-1">
              Guest preview
            </span>
            <button
              type="button"
              disabled
              className="text-xs md:text-sm px-3 py-1 rounded-full text-muted-foreground/70 cursor-not-allowed"
              onClick={() => handleComingSoon("Login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-[11px] md:text-xs text-muted-foreground mt-1">
          {/* Left side chips – context aware */}
          <div className="flex items-center gap-2 flex-wrap">
            {isBroadcast
              ? BROADCAST_CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className="rounded-full px-3 py-1 bg-background/40 border border-border/60 text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                    onClick={() => handleComingSoon(tab.label)}
                  >
                    {tab.label}
                  </button>
                ))
              : VERTICAL_TABS.map((tab) => {
                  const isActive = activeVertical === tab.label;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={
                        isActive
                          ? "rounded-full px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground font-medium shadow-sm"
                          : "rounded-full px-3 py-1 text-xs md:text-sm text-muted-foreground hover:bg-secondary/70 transition-colors"
                      }
                      onClick={() => handleComingSoon(tab.label)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
          </div>

          {/* Right side chips – only show Silos on OnDemand for now */}
          {!isBroadcast && (
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {SILO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="rounded-full px-2.5 py-0.5 bg-background/40 border border-border/60 text-[11px] text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                  onClick={() => handleComingSoon(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 px-4 pb-20 pt-6 md:px-10 md:pt-8 flex flex-col items-stretch">
        <div className="w-full space-y-8">{children}</div>
      </main>
    </div>
  );
}
