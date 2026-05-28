import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ACCOUNTS, TRANSACTIONS, STATEMENTS, DEMO_USER, PAYEES, SCHEDULED_PAYMENTS, CARDS, BUDGETS, PROFILE } from '../data/seed.js'

const KEY = 'meridian.state.v2'

function freshState() {
  return {
    user: null,
    accounts: ACCOUNTS.map((a) => ({ ...a })),
    transactions: structuredClone(TRANSACTIONS),
    payees: PAYEES.map((p) => ({ ...p })),
    scheduled: structuredClone(SCHEDULED_PAYMENTS),
    cards: CARDS.map((c) => ({ ...c })),
    profile: structuredClone(PROFILE),
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

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(
    () => ({
      ...state,
      accountById: (id) => state.accounts.find((a) => a.id === id),
      txFor: (id) => state.transactions[id] || [],
      statements: STATEMENTS,
      budgets: BUDGETS,
      netWorth: state.accounts.reduce((s, a) => s + a.balance, 0),

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
      transfer({ fromId, toId, amount, memo }) {
        const from = state.accounts.find((a) => a.id === fromId)
        if (!from) return { ok: false, error: 'Source account not found.' }
        if (from.type !== 'Credit' && amount > from.balance) {
          return { ok: false, error: 'Insufficient funds in the selected account.' }
        }
        const today = new Date().toISOString().slice(0, 10)
        setState((s) => {
          const accounts = s.accounts.map((a) => {
            if (a.id === fromId) return { ...a, balance: +(a.balance - amount).toFixed(2) }
            if (a.id === toId) return { ...a, balance: +(a.balance + amount).toFixed(2) }
            return a
          })
          const tx = structuredClone(s.transactions)
          const mkId = () => 'tx-' + Math.random().toString(36).slice(2, 8)
          const toName = s.accounts.find((a) => a.id === toId)?.name || 'account'
          const fromName = from.name
          tx[fromId] = [{ id: mkId(), date: today, desc: `Transfer to ${toName}`, category: 'Transfer', amount: -amount, memo }, ...(tx[fromId] || [])]
          tx[toId] = [{ id: mkId(), date: today, desc: `Transfer from ${fromName}`, category: 'Transfer', amount: amount, memo }, ...(tx[toId] || [])]
          return { ...s, accounts, transactions: tx }
        })
        return { ok: true }
      },
      payBill({ fromId, payeeId, amount, date, memo }) {
        const from = state.accounts.find((a) => a.id === fromId)
        const payee = state.payees.find((p) => p.id === payeeId)
        if (!from || !payee) return { ok: false, error: 'Select an account and a payee.' }
        if (from.type !== 'Credit' && amount > from.balance) return { ok: false, error: 'Insufficient funds in the selected account.' }
        const today = new Date().toISOString().slice(0, 10)
        const future = date && date > today
        setState((s) => {
          let accounts = s.accounts
          let tx = s.transactions
          if (!future) {
            accounts = s.accounts.map((a) => (a.id === fromId ? { ...a, balance: +(a.balance - amount).toFixed(2) } : a))
            tx = structuredClone(s.transactions)
            tx[fromId] = [{ id: 'tx-' + Math.random().toString(36).slice(2, 8), date: date || today, desc: `Payment — ${payee.name}`, category: 'Bills', amount: -amount, memo }, ...(tx[fromId] || [])]
          }
          const scheduled = future
            ? [{ id: 'sp-' + Math.random().toString(36).slice(2, 7), payeeId, payee: payee.name, amount, date, frequency: 'One-time' }, ...s.scheduled]
            : s.scheduled
          return { ...s, accounts, transactions: tx, scheduled }
        })
        return { ok: true, scheduled: future }
      },
      addPayee({ name, category, account }) {
        const payee = { id: 'pay-' + Math.random().toString(36).slice(2, 7), name, category, account }
        setState((s) => ({ ...s, payees: [...s.payees, payee] }))
        return payee
      },
      cancelScheduled(id) {
        setState((s) => ({ ...s, scheduled: s.scheduled.filter((p) => p.id !== id) }))
      },
      toggleCardFreeze(id) {
        setState((s) => ({ ...s, cards: s.cards.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)) }))
      },
      setCardLimit(id, monthlyLimit) {
        setState((s) => ({ ...s, cards: s.cards.map((c) => (c.id === id ? { ...c, monthlyLimit } : c)) }))
      },
      depositCheck({ accountId, amount }) {
        const today = new Date().toISOString().slice(0, 10)
        setState((s) => {
          const accounts = s.accounts.map((a) => (a.id === accountId ? { ...a, balance: +(a.balance + amount).toFixed(2) } : a))
          const tx = structuredClone(s.transactions)
          tx[accountId] = [{ id: 'tx-' + Math.random().toString(36).slice(2, 8), date: today, desc: 'Mobile check deposit', category: 'Deposit', amount }, ...(tx[accountId] || [])]
          return { ...s, accounts, transactions: tx }
        })
        return { ok: true }
      },
      updateProfile(patch) {
        setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))
      },
      toggleAlert(key) {
        setState((s) => ({ ...s, profile: { ...s.profile, alerts: { ...s.profile.alerts, [key]: !s.profile.alerts[key] } } }))
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
