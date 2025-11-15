# Washington Product One – v0.1 (Guest Preview)
Washington Product One v0.1 is the first working guest-only shell of the Washington platform.
It includes:

OnDemand Landing Page

Viewer Page (vertical video shell)

VIA Ribbon + VIA Investigate Panel

3-step Onboarding Modal

Static content rails

Event Spine (WashingtonEvent) with N-BUS stub

Full session + VIA content context

No login, no backend, no workspace, no uploads

This project is structured to evolve into Product One v1.0, Product Two (Social), and Product Three (Workspace) without rewriting core architecture.

🚀 Tech Stack

React (Vite)

React Router

Static JSON content (no backend)

Custom VIA v0.1 stub client

Custom Event Spine

Context providers for session + VIA content

🧩 Project Goals (v0.1)

The v0.1 guest preview is designed to:

Demonstrate Washington’s basic consumption flow

Provide a place to train VIA’s future behavioral rules

Stand as a self-contained UI shell

Show event logging and VIA interactions

Require zero backend, auth, or uploads

It is intentionally simple, predictable, and fully mocked.

📁 File Structure Overview
src/
 ├── App.jsx
 ├── main.jsx
 ├── routes/
 │    └── Router.jsx
 ├── components/
 │    ├── LayoutShell.jsx
 │    ├── OnboardingModal.jsx
 │    └── via/
 │         ├── ViaRibbon.jsx
 │         └── ViaInvestigatePanel.jsx
 ├── pages/
 │    ├── VideoLandingPage.jsx
 │    └── ViewerPage.jsx
 ├── context/
 │    ├── SessionContext.jsx
 │    └── ViaContentContext.jsx
 ├── hooks/
 │    └── useWashingtonEvents.js
 ├── events/
 │    ├── eventTypes.js
 │    ├── publishEvent.js
 │    └── spineConfig.js
 ├── via/
 │    └── viaClient.js
 ├── data/
 │    ├── videoContent.json
 │    └── viaInsights.json
 └── styles/
      ├── globals.css
      ├── OnboardingModal.css
      ├── VideoLandingPage.css
      ├── ViewerPage.css
      ├── ViaRibbon.css
      └── ViaInvestigatePanel.css

🧠 Context Providers
SessionContext

Generates a session ID in main.jsx

Available everywhere via useSession()

Used by the Event Spine

ViaContentContext

Tracks the current video’s ID (for VIA)

Landing clears it; viewer sets it

Investigate panel uses it to fetch insights

🔎 VIA v0.1 (Mocked Intelligence)
Implemented:

VIA Ribbon (cycles static messages)

VIA Investigate panel (per-content insights)

VIA stub client:

initVia(sessionId)

logEvent(event)

getRibbonMessages()

investigateContent({ sessionId, contentId })

Not implemented (future):

VIA spine

Identity graph

Predictions

Adaptive ribbon

Real insights

🧱 Event Spine (WashingtonEvent)

Every event uses this exact shape:

type WashingtonEvent = {
  type: string
  sessionId: string
  timestamp: string
  payload: object
}

Supported event types (v0.1):
SESSION_START
PAGE_VIEW
CTA_CLICK
PLAYER_EVENT
ONBOARDING_EVENT

Logging Flow:

useWashingtonEvents.js constructs events

Everything prints to console

Anything publishable echoes to N-BUS stub via:

window.NBUS.publish(channel, event)


If NBUS does not exist → clean fallback to console.

🎞 OnDemand Data Model (v0.1)

videoContent.json contains a rails-based model:

{
  "rails": [
    {
      "id": "featured",
      "title": "Featured Sessions",
      "items": [
        { "id": "wash-101", "title": "...", "duration": "...", "meta": "..." }
      ]
    },
    ...
  ]
}


Each rail is rendered as:

title (e.g., “Featured Sessions”)

grid of cards

CTA click logs the event

🔍 VIA Insights Data Model (v0.1)

viaInsights.json:

ribbonMessages[] → VIA ribbon text

contentInsights { contentId → insight }

default fallback

Example:

{
  "title": "Welcome to Washington OnDemand",
  "summary": "Most guests complete this short tour…",
  "tags": ["onboarding", "intro"]
}

▶️ Viewer Page (Vertical Video Shell)

Viewer loads video via:

const allItems = rails.flatMap(r => r.items)
const video = allItems.find(v => v.id === id)


Viewer also:

sets currentContentId

logs a viewer PAGE_VIEW event

shows metadata

uses placeholder UI for the “video” element

Future versions will replace the placeholder with a real player.

🧭 Routing
/                  → VideoLandingPage
/watch/:id         → ViewerPage


All routes are wrapped by:

LayoutShell

OnboardingModal

ViaContentProvider

VIA Ribbon

VIA Investigate Panel

🧪 Developer Usage
Install
yarn install

Run dev server
yarn dev

Build
yarn build


Preview typically maps to:

http://127.0.0.1:<vite-port>/

🔧 Extending the System

If you want to expand v0.1 → v0.2 cleanly, you can:

Add new rails:

add to videoContent.json

Add new VIA messages:

add to viaInsights.json

Add new events:

add enum to eventTypes.js

log via useWashingtonEvents()

Add new pages:

define route in Router.jsx

Add new layouts:

modify LayoutShell.jsx

Add real API:

Replace VIA stub methods with API calls.

🏁 Status: v0.1 Complete

This project now forms the full guest-mode consumption loop:

Onboarding → Landing → View → VIA → Back → Explore

It is stable, self-contained, has no backend dependencies, and ready for either:

UI/UX polish

VIA logic expansion

Real player integration

Social + identity (Product 2)

Workspace (Product 3)
