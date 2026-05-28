import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { POLICIES, CLAIMS, PAYMENTS, DOCUMENTS, DEMO_USER } from '../data/seed.js'

const KEY = 'assure.state.v1'

function freshState() {
  return { auth: false, claims: structuredClone(CLAIMS) }
}

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return freshState()
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const api = useMemo(
    () => ({
      ...state,
      user: DEMO_USER,
      policies: POLICIES,
      payments: PAYMENTS,
      documents: DOCUMENTS,
      policyById: (id) => POLICIES.find((p) => p.id === id),
      monthlyTotal: POLICIES.reduce((s, p) => s + p.premium, 0),

      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, auth: true }))
          return { ok: true }
        }
        return { ok: false, error: 'Incorrect email or password.' }
      },
      logout() { setState((s) => ({ ...s, auth: false })) },

      fileClaim(claim) {
        const id = 'CLM-' + (31000 + Math.floor((Date.now() / 1000) % 8999))
        const record = { id, status: 'Submitted', date: new Date().toISOString().slice(0, 10), ...claim }
        setState((s) => ({ ...s, claims: [record, ...s.claims] }))
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
