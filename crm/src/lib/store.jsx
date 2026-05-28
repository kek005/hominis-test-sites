import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CONTACTS, DEALS, STAGES, DEMO_USER, COMPANIES, ACTIVITIES } from '../data/seed.js'

const KEY = 'pipeline.state.v2'

function freshState() {
  return {
    user: null,
    contacts: CONTACTS.map((c) => ({ ...c })),
    deals: structuredClone(DEALS),
    activities: structuredClone(ACTIVITIES),
  }
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
      companies: COMPANIES,
      contactById: (id) => state.contacts.find((c) => c.id === id),
      dealById: (id) => state.deals.find((d) => d.id === id),
      dealsForContact: (id) => state.deals.filter((d) => d.contactId === id),
      activitiesForContact: (id) => state.activities.filter((a) => a.contactId === id),
      activitiesForDeal: (id) => state.activities.filter((a) => a.dealId === id),
      companyByName: (name) => COMPANIES.find((c) => c.name === name),

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
      createDeal({ title, company, contactId, value, stage, close }) {
        const deal = { id: nextId('d'), title, company, contactId, value: Number(value) || 0, stage: stage || 'Lead', owner: DEMO_USER.name, close, notes: [] }
        setState((s) => ({ ...s, deals: [deal, ...s.deals] }))
        return deal
      },
      updateDeal(id, patch) {
        setState((s) => ({ ...s, deals: s.deals.map((d) => (d.id === id ? { ...d, ...patch } : d)) }))
      },
      addActivity({ type, title, contactId, dealId, due }) {
        const act = { id: nextId('a'), type, title, contactId, dealId, due, done: false }
        setState((s) => ({ ...s, activities: [act, ...s.activities] }))
        return act
      },
      toggleActivity(id) {
        setState((s) => ({ ...s, activities: s.activities.map((a) => (a.id === id ? { ...a, done: !a.done } : a)) }))
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
