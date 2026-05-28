import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SEED_TRIPS, DEMO_USER } from '../data/seed.js'

const KEY = 'voyage.state.v1'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return { user: null, trips: SEED_TRIPS }
}

const StoreContext = createContext(null)
const newRef = () => 'VYG-' + (10000 + Math.floor((Date.now() / 1000) % 89999))

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const api = useMemo(
    () => ({
      ...state,
      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, user: { email: DEMO_USER.email, name: DEMO_USER.name } }))
          return { ok: true }
        }
        return { ok: false, error: 'Invalid email or password.' }
      },
      logout() { setState((s) => ({ ...s, user: null })) },
      addTrip(trip) {
        const ref = newRef()
        const record = { ref, status: 'Confirmed', date: new Date().toISOString().slice(0, 10), ...trip }
        setState((s) => ({ ...s, trips: [record, ...s.trips] }))
        return record
      },
      resetDemo() { localStorage.removeItem(KEY); window.location.href = '/' },
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
