import { createContext, useContext, useState } from 'react'

const ViaContentContext = createContext(null)

export function ViaContentProvider({ children }) {
  const [currentContentId, setCurrentContentId] = useState(null)

  return (
    <ViaContentContext.Provider value={{ currentContentId, setCurrentContentId }}>
      {children}
    </ViaContentContext.Provider>
  )
}

export function useViaContent() {
  const ctx = useContext(ViaContentContext)
  if (!ctx) {
    throw new Error('useViaContent must be used within a ViaContentProvider')
  }
  return ctx
}
