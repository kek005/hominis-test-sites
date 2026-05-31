import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Navbar() {
  const { cartCount, address, resetDemo } = useStore()
  const link = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">🍴</span>
          Munch
        </Link>
        <div className="hidden flex-1 items-center gap-2 text-sm text-gray-500 sm:flex">
          <span className="text-gray-400">📍</span>
          <span className="truncate">{address}</span>
        </div>
        <nav className="hidden gap-5 sm:flex">
          <NavLink to="/" end className={link}>Restaurants</NavLink>
          <NavLink to="/orders" className={link}>Orders</NavLink>
        </nav>
        <button onClick={resetDemo} className="hidden rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 lg:block">Reset demo</button>
        <Link to="/cart" data-testid="cart-link" className="relative rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          Cart
          {cartCount > 0 && <span data-testid="cart-count" className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">{cartCount}</span>}
        </Link>
      </div>
    </header>
  )
}
