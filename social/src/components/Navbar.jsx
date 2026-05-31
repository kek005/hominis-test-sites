import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import Avatar from './Avatar.jsx'

export default function Navbar() {
  const { me, notifications, resetDemo } = useStore()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const unread = notifications.filter((n) => !n.read).length
  const link = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">🐝</span>
          Buzz
        </Link>
        <form onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q)}`) }} className="hidden flex-1 md:block">
          <input type="search" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts, people, hashtags…" className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-brand-500 focus:bg-white focus:outline-none" />
        </form>
        <nav className="hidden gap-5 sm:flex">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/explore" className={link}>Explore</NavLink>
          <NavLink to="/notifications" className={link}>
            Notifications {unread > 0 && <span data-testid="unread-badge" className="ml-1 rounded-full bg-brand-600 px-1.5 text-xs text-white">{unread}</span>}
          </NavLink>
        </nav>
        <button onClick={resetDemo} className="hidden rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 lg:block">Reset demo</button>
        <Link to={`/profile/${me.handle}`}><Avatar name={me.name} src={`/avatars/${me.handle}.jpg`} className="h-9 w-9 text-xs" /></Link>
      </div>
    </header>
  )
}
