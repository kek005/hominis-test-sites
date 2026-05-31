import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'

export default function Checkout() {
  const { cart, restaurantById, cartTotal, address, setAddress, placeOrder } = useStore()
  const navigate = useNavigate()
  const restaurant = restaurantById(cart.restaurantId)
  const [form, setForm] = useState({
    address: address || '', instructions: '', when: 'ASAP', time: '12:30',
    name: '', card: '', exp: '', cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  // Don't redirect while a submit is in flight — placeOrder clears the cart and
  // the navigation to the confirmation page would otherwise lose the race.
  if (cart.items.length === 0 && !busy) return <Navigate to="/cart" replace />

  const fee = restaurant?.fee || 0
  const tax = +(cartTotal * 0.085).toFixed(2)
  const total = +(cartTotal + fee + tax).toFixed(2)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.address.trim()) err.address = 'Address is required.'
    if (!form.name.trim()) err.name = 'Cardholder name is required.'
    if (!/^\d{16}$/.test(form.card.replace(/\s/g, ''))) err.card = 'Card number must be 16 digits.'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) err.exp = 'Use MM/YY.'
    if (!/^\d{3}$/.test(form.cvc)) err.cvc = 'CVC must be 3 digits.'
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setBusy(true)
    setTimeout(() => {
      setAddress(form.address)
      const order = placeOrder({ address: form.address, instructions: form.instructions })
      navigate(`/order/${order.code}`, { state: { order } })
    }, 900)
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      <form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Delivery</h2>
            <div className="grid gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Address</span><input className={input('address')} value={form.address} onChange={set('address')} />{errors.address && <span className="text-xs text-red-600">{errors.address}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Delivery instructions <span className="text-gray-400">(optional)</span></span><input className={input('instructions')} value={form.instructions} onChange={set('instructions')} placeholder="e.g. Leave at door, ring buzzer 4B" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">When</span>
                  <select className={input('when')} value={form.when} onChange={set('when')}><option>ASAP</option><option>Scheduled</option></select>
                </label>
                {form.when === 'Scheduled' && (
                  <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Time</span>
                    <select className={input('time')} value={form.time} onChange={set('time')}>
                      {['11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Payment</h2>
            <div className="grid gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Cardholder name</span><input className={input('name')} value={form.name} onChange={set('name')} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Card number</span><input className={input('card')} placeholder="4242 4242 4242 4242" value={form.card} onChange={set('card')} />{errors.card && <span className="text-xs text-red-600">{errors.card}</span>}</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Expiry</span><input className={input('exp')} placeholder="MM/YY" value={form.exp} onChange={set('exp')} />{errors.exp && <span className="text-xs text-red-600">{errors.exp}</span>}</label>
                <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">CVC</span><input className={input('cvc')} placeholder="123" value={form.cvc} onChange={set('cvc')} />{errors.cvc && <span className="text-xs text-red-600">{errors.cvc}</span>}</label>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{restaurant?.name}</h2>
          <p className="text-xs text-gray-400">{restaurant?.eta}</p>
          <dl className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
            <Row label="Subtotal" value={money(cartTotal)} />
            <Row label="Delivery fee" value={money(fee)} />
            <Row label="Tax" value={money(tax)} />
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900"><dt>Total</dt><dd data-testid="checkout-total">{money(total)}</dd></div>
          </dl>
          <button type="submit" disabled={busy} data-testid="place-order" className="mt-4 w-full rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">{busy ? 'Placing…' : `Place order · ${money(total)}`}</button>
        </aside>
      </form>
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between text-gray-600"><dt>{label}</dt><dd className="text-gray-900">{value}</dd></div>
}
