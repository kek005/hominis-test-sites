import { Link, useNavigate } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'

export default function Cart() {
  const { cart, findItem, updateQty, removeFromCart, restaurantById, cartTotal } = useStore()
  const navigate = useNavigate()
  const restaurant = restaurantById(cart.restaurantId)

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-2xl">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Pick a restaurant and start adding items.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse restaurants</Link>
      </div>
    )
  }

  const fee = restaurant?.fee || 0
  const tax = +(cartTotal * 0.085).toFixed(2)
  const total = +(cartTotal + fee + tax).toFixed(2)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Your order</h1>
      <p className="mt-1 text-sm text-gray-500">From <Link to={`/restaurant/${restaurant?.id}`} className="font-medium text-brand-700 hover:underline">{restaurant?.name}</Link></p>

      <ul className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
        {cart.items.map((line) => {
          const it = findItem(cart.restaurantId, line.id)
          return (
            <li key={line.id} data-testid="cart-item" className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{it.name}</p>
                <p className="text-xs text-gray-500">{money(it.price)} each</p>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300">
                <button aria-label="Decrease" onClick={() => updateQty(line.id, line.qty - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50">−</button>
                <span className="w-8 text-center">{line.qty}</span>
                <button aria-label="Increase" onClick={() => updateQty(line.id, line.qty + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50">+</button>
              </div>
              <div className="w-20 text-right font-semibold text-gray-900">{money(it.price * line.qty)}</div>
              <button onClick={() => removeFromCart(line.id)} className="text-sm text-gray-400 hover:text-red-600">Remove</button>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_280px]">
        <Link to="/" className="rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">Add more items</Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Summary</h2>
          <dl className="space-y-1 text-sm">
            <Row label="Subtotal" value={money(cartTotal)} />
            <Row label="Delivery fee" value={money(fee)} />
            <Row label="Tax" value={money(tax)} />
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900"><dt>Total</dt><dd data-testid="cart-total">{money(total)}</dd></div>
          </dl>
          <button onClick={() => navigate('/checkout')} data-testid="to-checkout" className="mt-4 w-full rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Checkout</button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between text-gray-600"><dt>{label}</dt><dd className="text-gray-900">{value}</dd></div>
}
