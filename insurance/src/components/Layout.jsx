import { NavLink, Link, Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/claims', label: 'Claims', icon: '📋' },
  { to: '/file-claim', label: 'File a claim', icon: '➕' },
  { to: '/quote', label: 'Get a quote', icon: '🧮' },
  { to: '/payments', label: 'Payments', icon: '💳' },
  { to: '/documents', label: 'Documents', icon: '📄' },
]

export default function Layout({ children }) {
  const { auth, logout, resetDemo, user } = useStore()
  const location = useLocation()
  if (!auth) return <Navigate to="/login" state={{ from: location.pathname }} replace />

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-100 bg-white p-4 sm:flex">
        <Link to="/dashboard" className="mb-8 flex items-center gap-2 px-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">🛡</span>
          Assure
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span aria-hidden>{n.icon}</span> {n.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={resetDemo} className="mb-2 rounded-lg px-3 py-2 text-left text-xs text-gray-400 hover:bg-gray-50">Reset demo</button>
        <div className="border-t border-gray-100 pt-3">
          <p className="px-3 text-sm font-medium text-gray-900">{user.name}</p>
          <p className="px-3 text-xs text-gray-400">Member {user.member}</p>
          <button onClick={logout} className="px-3 text-xs text-gray-500 hover:text-gray-900">Sign out</button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 sm:hidden">
          <span className="font-bold text-brand-700">Assure</span>
          <button onClick={logout} className="text-sm text-gray-500">Sign out</button>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
