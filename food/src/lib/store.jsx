import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { RESTAURANTS, SEED_ORDERS } from '../data/seed.js'

const KEY = 'munch.state.v1'

function loadState() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r) } catch { /* */ }
  return { cart: { restaurantId: null, items: [] }, orders: SEED_ORDERS, address: '24 Cloud Lane, Seattle, WA' }
}

const StoreContext = createContext(null)
const newCode = () => 'MUN-' + (10000 + Math.floor((Date.now() / 1000) % 89999))

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const findItem = (restaurantId, itemId) => {
    const r = RESTAURANTS.find((x) => x.id === restaurantId)
    if (!r) return null
    for (const section of r.menu) {
      const it = section.items.find((i) => i.id === itemId)
      if (it) return it
    }
    return null
  }

  const cartTotal = state.cart.items.reduce((s, l) => s + (findItem(state.cart.restaurantId, l.id)?.price || 0) * l.qty, 0)
  const cartCount = state.cart.items.reduce((s, l) => s + l.qty, 0)

  const api = useMemo(() => ({
    ...state,
    restaurants: RESTAURANTS,
    restaurantById: (id) => RESTAURANTS.find((r) => r.id === id),
    findItem,
    cartTotal,
    cartCount,

    addToCart(restaurantId, itemId, qty = 1) {
      setState((s) => {
        // Switching restaurants clears cart
        if (s.cart.restaurantId && s.cart.restaurantId !== restaurantId) {
          return { ...s, cart: { restaurantId, items: [{ id: itemId, qty }] } }
        }
        const cart = s.cart.restaurantId ? { ...s.cart } : { restaurantId, items: [] }
        const existing = cart.items.find((l) => l.id === itemId)
        cart.items = existing
          ? cart.items.map((l) => (l.id === itemId ? { ...l, qty: l.qty + qty } : l))
          : [...cart.items, { id: itemId, qty }]
        return { ...s, cart }
      })
    },
    updateQty(itemId, qty) {
      setState((s) => {
        const items = s.cart.items.map((l) => (l.id === itemId ? { ...l, qty: Math.max(0, qty) } : l)).filter((l) => l.qty > 0)
        const cart = items.length === 0 ? { restaurantId: null, items: [] } : { ...s.cart, items }
        return { ...s, cart }
      })
    },
    removeFromCart(itemId) {
      setState((s) => {
        const items = s.cart.items.filter((l) => l.id !== itemId)
        const cart = items.length === 0 ? { restaurantId: null, items: [] } : { ...s.cart, items }
        return { ...s, cart }
      })
    },
    clearCart() {
      setState((s) => ({ ...s, cart: { restaurantId: null, items: [] } }))
    },
    setAddress(address) {
      setState((s) => ({ ...s, address }))
    },
    placeOrder(details) {
      const restaurant = RESTAURANTS.find((r) => r.id === state.cart.restaurantId)
      const items = state.cart.items.map((l) => {
        const it = findItem(state.cart.restaurantId, l.id)
        return { id: l.id, name: it.name, qty: l.qty, price: it.price }
      })
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
      const fee = restaurant?.fee || 2.49
      const tax = +(subtotal * 0.085).toFixed(2)
      const total = +(subtotal + fee + tax).toFixed(2)
      const code = newCode()
      const order = {
        code, restaurantId: restaurant.id, restaurantName: restaurant.name, items,
        subtotal, fee, tax, total, status: 'Confirmed',
        date: new Date().toISOString().slice(0, 10),
        address: details.address, instructions: details.instructions,
      }
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: { restaurantId: null, items: [] } }))
      return order
    },
    resetDemo() { localStorage.removeItem(KEY); window.location.href = '/' },
  }), [state, cartTotal, cartCount])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const c = useContext(StoreContext)
  if (!c) throw new Error('useStore must be used within StoreProvider')
  return c
}
