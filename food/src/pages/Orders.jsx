import { Link } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'

const statusColor = {
  Confirmed: 'bg-brand-100 text-brand-700',
  Preparing: 'bg-amber-100 text-amber-700',
  'Out for delivery': 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
}

export default function Orders() {
  const { orders } = useStore()

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No orders yet</h1>
        <p className="mt-2 text-gray-500">Place an order and it'll show up here.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse restaurants</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <Link key={o.code} to={`/order/${o.code}`} data-testid="order-row" className="block rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900">{o.restaurantName}</p>
                <p className="text-xs text-gray-400">Ref {o.code} · {o.date}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                <p className="mt-1 font-bold text-gray-900">{money(o.total)}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-1">
              {o.items.map((i) => `${i.qty} × ${i.name}`).join(' · ')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
