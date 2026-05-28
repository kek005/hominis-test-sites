import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Navbar() {
  const { user, logout, resetDemo, trips } = useStore()
  const link = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">✈</span>
          Voyage
        </Link>
        <nav className="hidden gap-5 sm:flex">
          <NavLink to="/flights" className={link}>Flights</NavLink>
          <NavLink to="/hotels" className={link}>Hotels</NavLink>
          <NavLink to="/trips" className={link}>
            My Trips {trips.length > 0 && <span className="ml-1 rounded-full bg-brand-100 px-1.5 text-xs text-brand-700">{trips.length}</span>}
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button onClick={resetDemo} className="hidden rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 sm:block">Reset demo</button>
          {user ? (
            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign out</button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}
