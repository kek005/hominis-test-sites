import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

const statusColor = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
}

export default function Account() {
  const { user, orders } = useStore()

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign in to view your orders</h1>
        <p className="mt-2 text-gray-500">Your order history is tied to your account.</p>
        <Link to="/login" state={{ from: '/account' }} className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
      <p className="mt-1 text-sm text-gray-500">{orders.length} order{orders.length !== 1 && 's'} on file.</p>

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} data-testid="order-row" className="rounded-2xl border border-gray-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900">{o.id}</p>
                <p className="text-sm text-gray-500">Placed {o.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>
                {o.status}
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              {o.items.map((it) => (
                <li key={it.id}>{it.qty} × {it.name}</li>
              ))}
            </ul>
            <p className="mt-3 text-right font-bold text-gray-900">{money(o.total)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
