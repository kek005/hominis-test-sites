import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { JOBS } from '../data/seed.js'

const KEY = 'northwind.state.v1'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return { saved: [], applications: [] }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(
    () => ({
      ...state,
      jobById: (id) => JOBS.find((j) => j.id === id),
      isSaved: (id) => state.saved.includes(id),
      toggleSave(id) {
        setState((s) => ({
          ...s,
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
        }))
      },
      hasApplied: (id) => state.applications.some((a) => a.jobId === id),
      submitApplication(app) {
        const ref = 'NW-' + (50000 + Math.floor((Date.now() / 1000) % 9000))
        const record = { ...app, ref, submittedAt: new Date().toISOString().slice(0, 10) }
        setState((s) => ({ ...s, applications: [record, ...s.applications] }))
        return record
      },
      resetDemo() {
        localStorage.removeItem(KEY)
        window.location.href = '/'
      },
    }),
    [state],
  )

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
