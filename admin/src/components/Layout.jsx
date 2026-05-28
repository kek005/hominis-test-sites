import { NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/users', label: 'Users', icon: '👥' },
  { to: '/roles', label: 'Roles', icon: '🔑' },
  { to: '/audit', label: 'Audit log', icon: '📜' },
  { to: '/billing', label: 'Billing', icon: '💳' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

export default function Layout({ children }) {
  const { auth, logout, resetDemo } = useStore()
  const location = useLocation()

  if (!auth) return <Navigate to="/login" state={{ from: location.pathname }} replace />

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="hidden w-60 shrink-0 flex-col bg-brand-900 p-4 text-brand-100 sm:flex">
        <Link to="/users" className="mb-8 flex items-center gap-2 px-2 text-lg font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">C</span>
          Console
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-brand-300 hover:bg-white/5 hover:text-white'}`}>
              <span aria-hidden>{n.icon}</span> {n.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={resetDemo} className="mb-2 rounded-lg px-3 py-2 text-left text-xs text-brand-400 hover:bg-white/5">Reset demo</button>
        <div className="border-t border-white/10 pt-3">
          <p className="px-3 text-sm font-medium text-white">Admin User</p>
          <button onClick={logout} className="px-3 text-xs text-brand-300 hover:text-white">Sign out</button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between bg-brand-900 px-6 py-4 text-white sm:hidden">
          <span className="font-bold">Console</span>
          <button onClick={logout} className="text-sm text-brand-300">Sign out</button>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
