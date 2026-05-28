import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SEED_ORDERS } from '../data/seed.js'

const KEY = 'showtime.state.v1'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return { orders: SEED_ORDERS }
}

const StoreContext = createContext(null)
const newCode = () => 'SHW-' + (10000 + Math.floor((Date.now() / 1000) % 89999))

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const api = useMemo(
    () => ({
      ...state,
      placeOrder(order) {
        const code = newCode()
        const record = { code, status: 'Upcoming', date: new Date().toISOString().slice(0, 10), ...order }
        setState((s) => ({ ...s, orders: [record, ...s.orders] }))
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
