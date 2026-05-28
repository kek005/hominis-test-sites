import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import ProductThumb from '../components/ProductThumb.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Cart() {
  const { cart, productById, updateQty, removeFromCart, cartSubtotal, coupon, couponRate, applyCoupon, removeCoupon } = useStore()
  const navigate = useNavigate()
  const toast = useToast()
  const [code, setCode] = useState('')

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-2xl">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Browse the shop and add something you like.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
          Continue shopping
        </Link>
      </div>
    )
  }

  const discount = +(cartSubtotal * couponRate).toFixed(2)
  const shipping = cartSubtotal > 100 ? 0 : 9.99
  const total = +(cartSubtotal - discount + shipping).toFixed(2)

  const submitCoupon = () => {
    const res = applyCoupon(code)
    if (res.ok) { toast.show(`Coupon applied — ${Math.round(res.rate * 100)}% off`); setCode('') }
    else toast.show(res.error, 'error')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
            {cart.map((line) => {
              const p = productById(line.id)
              return (
                <li key={line.id} data-testid="cart-item" className="flex items-center gap-4 p-4">
                  <ProductThumb product={p} className="h-20 w-20 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${p.id}`} className="font-semibold text-gray-900 hover:text-brand-700">
                      {p.name}
                    </Link>
                    <p className="text-sm text-gray-500">{money(p.price)} each</p>
                  </div>
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button aria-label="Decrease" onClick={() => updateQty(line.id, line.qty - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50">−</button>
                    <span className="w-8 text-center">{line.qty}</span>
                    <button aria-label="Increase" onClick={() => updateQty(line.id, line.qty + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50">+</button>
                  </div>
                  <div className="w-20 text-right font-semibold text-gray-900">{money(p.price * line.qty)}</div>
                  <button onClick={() => removeFromCart(line.id)} className="text-sm text-gray-400 hover:text-red-600">Remove</button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="h-fit rounded-2xl border border-gray-100 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Order summary</h2>

          <div className="mb-4">
            {coupon ? (
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm">
                <span className="font-medium text-emerald-700">Code {coupon} applied</span>
                <button onClick={removeCoupon} className="text-xs text-emerald-700 hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" aria-label="Promo code" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
                <button onClick={submitCoupon} data-testid="apply-coupon" className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Apply</button>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-400">Try <span className="font-mono">NIMBUS10</span> or <span className="font-mono">SAVE20</span>.</p>
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd className="font-medium">{money(cartSubtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount ({coupon})</dt><dd className="font-medium">−{money(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-gray-500">Shipping</dt><dd className="font-medium">{shipping === 0 ? 'Free' : money(shipping)}</dd></div>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 text-base"><dt className="font-semibold">Total</dt><dd data-testid="cart-total" className="font-bold">{money(total)}</dd></div>
          </dl>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
