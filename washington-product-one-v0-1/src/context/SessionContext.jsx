import { createContext, useContext, useMemo } from 'react'

export const SessionContext = createContext(null)

export function SessionProvider({ sessionId, children }) {
  const value = useMemo(() => ({ sessionId }), [sessionId])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  return useContext(SessionContext)
}
