import { useEffect } from 'react'
import { useStore } from '../lib/store.jsx'
import Avatar from '../components/Avatar.jsx'
import { Link } from 'react-router-dom'

const iconFor = { like: '♥', comment: '💬', follow: '👤', mention: '@' }

export default function Notifications() {
  const { notifications, markAllRead, userByHandle } = useStore()

  useEffect(() => {
    const timeout = setTimeout(() => markAllRead(), 600)
    return () => clearTimeout(timeout)
  }, [markAllRead])

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">No notifications.</div>
      ) : (
        <ul className="mt-6 space-y-3">
          {notifications.map((n) => {
            const actor = userByHandle(n.actor)
            return (
              <li key={n.id} data-testid="notification" className={`flex items-center gap-3 rounded-2xl border p-4 ${n.read ? 'border-gray-100 bg-white' : 'border-brand-200 bg-brand-50'}`}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-base text-brand-700">{iconFor[n.kind] || '🔔'}</span>
                <Link to={`/profile/${actor?.handle}`}><Avatar name={actor?.name} src={`/avatars/${actor?.handle}.jpg`} className="h-9 w-9 text-xs" /></Link>
                <div className="min-w-0 flex-1 text-sm">
                  <Link to={`/profile/${actor?.handle}`} className="font-semibold text-gray-900 hover:underline">{actor?.name}</Link>
                  <span className="ml-1 text-gray-700">{n.text}</span>
                </div>
                <span className="text-xs text-gray-400">{n.time}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
