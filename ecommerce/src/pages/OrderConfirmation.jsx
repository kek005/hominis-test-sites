import { Link, useLocation, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

export default function OrderConfirmation() {
  const { id } = useParams()
  const location = useLocation()
  const { orders } = useStore()
  const order = location.state?.order || orders.find((o) => o.id === id)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✓</div>
      <h1 className="text-2xl font-bold text-gray-900">Thank you for your order!</h1>
      <p className="mt-2 text-gray-500">
        Your order <span data-testid="order-id" className="font-semibold text-gray-900">{id}</span> has been placed.
        A confirmation email is on its way.
      </p>

      {order && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gray-100 p-6 text-left">
          <ul className="divide-y divide-gray-100">
            {order.items.map((it) => (
              <li key={it.id} className="flex justify-between py-2 text-sm">
                <span className="text-gray-700">{it.qty} × {it.name}</span>
                <span className="font-medium">{money(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 font-bold">
            <span>Total</span><span>{money(order.total)}</span>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Continue shopping</Link>
        <Link to="/account" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">View orders</Link>
      </div>
    </div>
  )
}
