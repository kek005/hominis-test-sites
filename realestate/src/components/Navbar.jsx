import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Navbar() {
  const { saved, resetDemo } = useStore()
  const link = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">🏠</span>
          Hearth
        </Link>
        <nav className="hidden gap-5 sm:flex">
          <NavLink to="/" end className={link}>Browse</NavLink>
          <NavLink to="/saved" className={link}>
            Saved {saved.length > 0 && <span className="ml-1 rounded-full bg-brand-100 px-1.5 text-xs text-brand-700">{saved.length}</span>}
          </NavLink>
          <NavLink to="/mortgage" className={link}>Mortgage</NavLink>
        </nav>
        <button onClick={resetDemo} className="ml-auto rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">Reset demo</button>
      </div>
    </header>
  )
}
