import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { TRACKING_STAGES } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'

export default function OrderTracking() {
  const { code } = useParams()
  const location = useLocation()
  const { orders } = useStore()
  const order = location.state?.order || orders.find((o) => o.code === code)
  const [stage, setStage] = useState(0)

  // Simulated live progression through the stages.
  useEffect(() => {
    if (!order || order.status === 'Delivered') return
    if (stage >= TRACKING_STAGES.length - 1) return
    const id = setTimeout(() => setStage((s) => s + 1), 3500)
    return () => clearTimeout(id)
  }, [stage, order])

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-gray-700">Order not found.</p>
        <Link to="/" className="mt-2 inline-block text-brand-600 hover:underline">Back to restaurants</Link>
      </div>
    )
  }

  const current = order.status === 'Delivered' ? TRACKING_STAGES.length - 1 : stage

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Order {order.code}</p>
            <h1 className="text-xl font-bold text-gray-900">{order.restaurantName}</h1>
          </div>
          <span data-testid="tracking-status" className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{TRACKING_STAGES[current]}</span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            {TRACKING_STAGES.map((s, i, arr) => (
              <span key={s} className="flex flex-1 items-center">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i <= current ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</span>
                {i < arr.length - 1 && <span className={`h-0.5 flex-1 ${i < current ? 'bg-brand-600' : 'bg-gray-200'}`} />}
              </span>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs">
            {TRACKING_STAGES.map((s, i) => (
              <span key={s} className={i <= current ? 'font-medium text-gray-900' : 'text-gray-400'}>{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          <p><span className="font-medium text-gray-900">Delivering to:</span> {order.address}</p>
          {order.instructions && <p className="mt-1"><span className="font-medium text-gray-900">Instructions:</span> {order.instructions}</p>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Order summary</h2>
        <ul className="mt-3 divide-y divide-gray-100">
          {order.items.map((it) => (
            <li key={it.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">{it.qty} × {it.name}</span>
              <span className="font-medium text-gray-900">{money(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-right text-lg font-bold text-gray-900">{money(order.total)}</p>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/orders" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">View all orders</Link>
        <Link to="/" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Order again</Link>
      </div>
    </div>
  )
}
