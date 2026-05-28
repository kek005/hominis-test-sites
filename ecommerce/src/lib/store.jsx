import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, SEED_ORDERS, DEMO_USER, COUPONS } from '../data/seed.js'

const KEY = 'nimbus.state.v2'

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt state
  }
  return { cart: [], orders: SEED_ORDERS, user: null, wishlist: [], coupon: null, newsletterDismissed: false }
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
      wishlistCount: state.wishlist.length,
      isWishlisted: (id) => state.wishlist.includes(id),
      couponRate: state.coupon ? COUPONS[state.coupon] || 0 : 0,

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
        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
        const rate = state.coupon ? COUPONS[state.coupon] || 0 : 0
        const discount = +(subtotal * rate).toFixed(2)
        const ship = subtotal > 100 ? 0 : 9.99
        const total = +(subtotal - discount + ship).toFixed(2)
        const order = {
          id: 'NMB-' + (10400 + Math.floor((Date.now() / 1000) % 9000)),
          date: new Date().toISOString().slice(0, 10),
          status: 'Processing',
          items,
          subtotal,
          discount,
          coupon: state.coupon,
          shippingCost: ship,
          total,
          shipping: details,
        }
        setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [], coupon: null }))
        return order
      },
      toggleWishlist(id) {
        setState((s) => ({
          ...s,
          wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id],
        }))
      },
      applyCoupon(code) {
        const key = code.trim().toUpperCase()
        if (COUPONS[key]) {
          setState((s) => ({ ...s, coupon: key }))
          return { ok: true, rate: COUPONS[key] }
        }
        return { ok: false, error: 'That code is not valid.' }
      },
      removeCoupon() {
        setState((s) => ({ ...s, coupon: null }))
      },
      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          const { password: _pw, ...profile } = DEMO_USER
          setState((s) => ({ ...s, user: profile }))
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
