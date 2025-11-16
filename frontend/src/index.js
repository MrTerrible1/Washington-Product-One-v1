import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import App from "@/App";
import { SessionProvider } from "./context/SessionContext.jsx";
import { ViaContentProvider } from "./context/ViaContentContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Generate a simple session id once per load
const sessionId =
  "sess-" +
  Math.random().toString(16).slice(2, 10) +
  "-" +
  Date.now().toString(16);

root.render(
  <React.StrictMode>
    <SessionProvider sessionId={sessionId}>
      <ViaContentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ViaContentProvider>
    </SessionProvider>
  </React.StrictMode>,
);
