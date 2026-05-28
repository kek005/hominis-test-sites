import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Navbar() {
  const { cartCount, user, logout, resetDemo } = useStore()

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">N</span>
          Nimbus
        </Link>
        <nav className="hidden gap-4 text-sm font-medium text-gray-600 sm:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-brand-700' : 'hover:text-gray-900')}>
            Shop
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => (isActive ? 'text-brand-700' : 'hover:text-gray-900')}>
            Orders
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={resetDemo}
            title="Reset demo data"
            className="hidden rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 sm:block"
          >
            Reset demo
          </button>
          {user ? (
            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign out
            </button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
          )}
          <Link
            to="/cart"
            data-testid="cart-link"
            className="relative rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Cart
            {cartCount > 0 && (
              <span
                data-testid="cart-count"
                className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-xs font-bold text-white"
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
