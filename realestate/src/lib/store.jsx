import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PROPERTIES, AGENTS } from '../data/seed.js'

const KEY = 'hearth.state.v1'

function loadState() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r) } catch { /* */ }
  return { saved: [], tours: [] }
}

const StoreContext = createContext(null)
const newRef = () => 'TR-' + (10000 + Math.floor((Date.now() / 1000) % 89999))

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const api = useMemo(() => ({
    ...state,
    properties: PROPERTIES,
    propertyById: (id) => PROPERTIES.find((p) => p.id === id),
    agents: AGENTS,
    agentById: (id) => AGENTS.find((a) => a.id === id),
    isSaved: (id) => state.saved.includes(id),
    toggleSave(id) {
      setState((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] }))
    },
    requestTour(req) {
      const ref = newRef()
      const record = { ref, status: 'Requested', requestedAt: new Date().toISOString().slice(0, 10), ...req }
      setState((s) => ({ ...s, tours: [record, ...s.tours] }))
      return record
    },
    resetDemo() { localStorage.removeItem(KEY); window.location.href = '/' },
  }), [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const c = useContext(StoreContext)
  if (!c) throw new Error('useStore must be used within StoreProvider')
  return c
}
