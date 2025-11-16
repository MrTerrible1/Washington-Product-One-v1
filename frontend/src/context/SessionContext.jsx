import React, { createContext, useContext } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ sessionId, children }) {
  const value = React.useMemo(() => ({ sessionId }), [sessionId]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
