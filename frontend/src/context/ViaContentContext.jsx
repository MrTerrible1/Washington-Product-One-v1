import React, { createContext, useContext, useState } from "react";

const ViaContentContext = createContext(null);

export function ViaContentProvider({ children }) {
  const [currentContentId, setCurrentContentId] = useState(null);

  const value = React.useMemo(
    () => ({ currentContentId, setCurrentContentId }),
    [currentContentId],
  );

  return <ViaContentContext.Provider value={value}>{children}</ViaContentContext.Provider>;
}

export function useViaContent() {
  const ctx = useContext(ViaContentContext);
  if (!ctx) {
    throw new Error("useViaContent must be used within a ViaContentProvider");
  }
  return ctx;
}
