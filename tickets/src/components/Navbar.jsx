import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Navbar() {
  const { orders, resetDemo } = useStore()
  const link = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">🎟</span>
          Showtime
        </Link>
        <nav className="hidden gap-5 sm:flex">
          <NavLink to="/" end className={link}>Events</NavLink>
          <NavLink to="/tickets" className={link}>
            My Tickets {orders.length > 0 && <span className="ml-1 rounded-full bg-brand-100 px-1.5 text-xs text-brand-700">{orders.length}</span>}
          </NavLink>
        </nav>
        <button onClick={resetDemo} className="ml-auto rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">Reset demo</button>
      </div>
    </header>
  )
}
