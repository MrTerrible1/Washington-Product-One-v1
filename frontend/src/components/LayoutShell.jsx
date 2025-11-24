import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ViaRibbon } from "./via/ViaRibbon.jsx";
import { MusicLanding } from "../pages/MusicLanding.jsx";

const COMING_SOON_MESSAGE = "This area is coming soon.";

// OnDemand category tabs
const ONDEMAND_CATEGORY_TABS = [
  { id: "video", label: "Video" },
  { id: "music", label: "Music" },
  { id: "games", label: "Games" },
  { id: "books", label: "Books" },
];

// Broadcast category tabs
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

  // Determine active category (Video by default for this demo)
  const activeCategory = "video";

  const handleComingSoon = (label) => {
    toast({
      title: label,
      description: COMING_SOON_MESSAGE,
    });
  };

  // Choose category tabs based on route
  const categoryTabs = isBroadcast ? BROADCAST_CATEGORY_TABS : ONDEMAND_CATEGORY_TABS;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex flex-col gap-3 px-8 py-4 border-b border-border/60 bg-background/80 backdrop-blur">
        {/* Top row: Logo + Stream tabs + Login */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-semibold tracking-[0.22em] uppercase text-sm">
              WASHINGTON
            </span>

            <nav className="flex items-center gap-3">
              {/* OnDemand tab */}
              <button
                type="button"
                className={
                  isOnDemand
                    ? "inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm md:text-base font-semibold shadow-md transition-all"
                    : "inline-flex items-center px-5 py-2.5 rounded-full bg-transparent text-muted-foreground text-sm md:text-base font-medium hover:bg-secondary/80 hover:text-foreground transition-all"
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
                    ? "inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm md:text-base font-semibold shadow-md transition-all"
                    : "inline-flex items-center px-5 py-2.5 rounded-full bg-transparent text-muted-foreground text-sm md:text-base font-medium hover:bg-secondary/80 hover:text-foreground transition-all"
                }
                onClick={() => navigate("/broadcast-preview")}
              >
                Broadcast
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center rounded-full bg-secondary/60 px-3 py-1 text-[11px] text-muted-foreground">
              Guest preview
            </span>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-transparent text-muted-foreground text-sm md:text-base font-medium hover:bg-secondary/80 hover:text-foreground transition-all"
              onClick={() => handleComingSoon("Login")}
            >
              Login
            </button>
          </div>
        </div>

        {/* Second row: Category pills (context-aware) */}
        <div className="flex items-center gap-2 flex-wrap">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={
                  isActive
                    ? "inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm"
                    : "inline-flex items-center px-4 py-2 rounded-full bg-transparent text-muted-foreground text-sm font-medium hover:bg-secondary/70 hover:text-foreground"
                }
                onClick={() => handleComingSoon(tab.label)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>
      <main className="flex-1 px-4 pb-20 pt-6 md:px-10 md:pt-8 flex flex-col items-stretch">
        <div className="w-full space-y-8">{children}</div>
      </main>

      {/* VIA Floating Button + Panel */}
      <ViaRibbon />
    </div>
  );
}
