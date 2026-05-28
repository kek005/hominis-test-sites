import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { USERS, SETTINGS, DEMO_USER } from '../data/seed.js'

const KEY = 'console.state.v1'

function freshState() {
  return { auth: false, users: USERS.map((u) => ({ ...u })), settings: { ...SETTINGS } }
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
let idSeq = Date.now()

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(
    () => ({
      ...state,
      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, auth: true }))
          return { ok: true }
        }
        return { ok: false, error: 'Incorrect email or password.' }
      },
      logout() {
        setState((s) => ({ ...s, auth: false }))
      },
      saveUser(user) {
        setState((s) => {
          if (user.id) return { ...s, users: s.users.map((u) => (u.id === user.id ? { ...u, ...user } : u)) }
          return { ...s, users: [{ ...user, id: 'u' + ++idSeq, lastActive: new Date().toISOString().slice(0, 10) }, ...s.users] }
        })
      },
      deleteUsers(ids) {
        const set = new Set(ids)
        setState((s) => ({ ...s, users: s.users.filter((u) => !set.has(u.id)) }))
      },
      setStatus(ids, status) {
        const set = new Set(ids)
        setState((s) => ({ ...s, users: s.users.map((u) => (set.has(u.id) ? { ...u, status } : u)) }))
      },
      saveSettings(settings) {
        setState((s) => ({ ...s, settings: { ...s.settings, ...settings } }))
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
