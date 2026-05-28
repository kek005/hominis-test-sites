import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ACCOUNTS, TRANSACTIONS, STATEMENTS, DEMO_USER } from '../data/seed.js'

const KEY = 'meridian.state.v1'

function freshState() {
  return {
    user: null,
    accounts: ACCOUNTS.map((a) => ({ ...a })),
    transactions: structuredClone(TRANSACTIONS),
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
