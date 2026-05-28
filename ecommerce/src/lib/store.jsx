import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, SEED_ORDERS, DEMO_USER } from '../data/seed.js'

const KEY = 'nimbus.state.v1'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt state
  }
  return { cart: [], orders: SEED_ORDERS, user: null, newsletterDismissed: false }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo(() => {
    const productById = (id) => PRODUCTS.find((p) => p.id === id)

    return {
      ...state,
      productById,
      cartCount: state.cart.reduce((n, l) => n + l.qty, 0),
      cartSubtotal: state.cart.reduce((s, l) => s + (productById(l.id)?.price || 0) * l.qty, 0),

      addToCart(id, qty = 1) {
        setState((s) => {
          const existing = s.cart.find((l) => l.id === id)
          const cart = existing
            ? s.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...s.cart, { id, qty }]
          return { ...s, cart }
        })
      },
      updateQty(id, qty) {
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((l) => (l.id === id ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        }))
      },
      removeFromCart(id) {
        setState((s) => ({ ...s, cart: s.cart.filter((l) => l.id !== id) }))
      },
      clearCart() {
        setState((s) => ({ ...s, cart: [] }))
      },
      placeOrder(details) {
        const items = state.cart.map((l) => {
          const p = productById(l.id)
          return { id: l.id, name: p.name, price: p.price, qty: l.qty }
        })
        const total = items.reduce((s, i) => s + i.price * i.qty, 0)
        const order = {
          id: 'NMB-' + (10400 + Math.floor((Date.now() / 1000) % 9000)),
          date: new Date().toISOString().slice(0, 10),
          status: 'Processing',
          items,
          total,
          shipping: details,
        }
        setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }))
        return order
      },
      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, user: { email: DEMO_USER.email, name: DEMO_USER.name } }))
          return { ok: true }
        }
        return { ok: false, error: 'Invalid email or password.' }
      },
      logout() {
        setState((s) => ({ ...s, user: null }))
      },
      dismissNewsletter() {
        setState((s) => ({ ...s, newsletterDismissed: true }))
      },
      resetDemo() {
        localStorage.removeItem(KEY)
        window.location.href = '/'
      },
    }
  }, [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
