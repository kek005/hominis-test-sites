import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { CATEGORIES } from '../data/seed.js'

export default function Navbar() {
  const { cartCount, wishlistCount, user, logout, resetDemo } = useStore()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">N</span>
          Nimbus
        </Link>

        <form onSubmit={submitSearch} className="hidden flex-1 md:block">
          <input
            type="search"
            aria-label="Search products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands, categories…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <button onClick={resetDemo} title="Reset demo data" className="hidden rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 lg:block">Reset demo</button>
          {user ? (
            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign out</button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign in</Link>
          )}
          <Link to="/wishlist" data-testid="wishlist-link" className="relative text-gray-600 hover:text-gray-900" aria-label="Wishlist">
            <span className="text-xl">♡</span>
            {wishlistCount > 0 && <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" data-testid="cart-link" className="relative rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Cart
            {cartCount > 0 && <span data-testid="cart-count" className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-xs font-bold text-white">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 pb-2 text-sm">
        <NavLink to="/shop" className={({ isActive }) => `shrink-0 rounded-full px-3 py-1 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>All</NavLink>
        {CATEGORIES.map((c) => (
          <NavLink key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="shrink-0 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-50">{c}</NavLink>
        ))}
        <NavLink to="/deals" className="shrink-0 rounded-full px-3 py-1 font-semibold text-red-600 hover:bg-red-50">Deals</NavLink>
        <NavLink to="/account" className="ml-auto shrink-0 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-50">Orders</NavLink>
      </nav>
    </header>
  )
}
