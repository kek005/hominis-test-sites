import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CONTACTS, DEALS, STAGES, DEMO_USER } from '../data/seed.js'

const KEY = 'pipeline.state.v1'

function freshState() {
  return { user: null, contacts: CONTACTS.map((c) => ({ ...c })), deals: structuredClone(DEALS) }
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
const nextId = (prefix) => `${prefix}${++idSeq}`

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(
    () => ({
      ...state,
      stages: STAGES,
      contactById: (id) => state.contacts.find((c) => c.id === id),
      dealById: (id) => state.deals.find((d) => d.id === id),

      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, user: { email: DEMO_USER.email, name: DEMO_USER.name } }))
          return { ok: true }
        }
        return { ok: false, error: 'Incorrect email or password.' }
      },
      logout() {
        setState((s) => ({ ...s, user: null }))
      },

      saveContact(contact) {
        setState((s) => {
          if (contact.id) {
            return { ...s, contacts: s.contacts.map((c) => (c.id === contact.id ? { ...c, ...contact } : c)) }
          }
          return { ...s, contacts: [{ ...contact, id: nextId('c') }, ...s.contacts] }
        })
      },
      deleteContact(id) {
        setState((s) => ({ ...s, contacts: s.contacts.filter((c) => c.id !== id) }))
      },

      moveDeal(dealId, stage) {
        setState((s) => ({ ...s, deals: s.deals.map((d) => (d.id === dealId ? { ...d, stage } : d)) }))
      },
      addNote(dealId, text) {
        const note = { id: nextId('n'), at: new Date().toISOString().slice(0, 10), text }
        setState((s) => ({
          ...s,
          deals: s.deals.map((d) => (d.id === dealId ? { ...d, notes: [note, ...(d.notes || [])] } : d)),
        }))
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
