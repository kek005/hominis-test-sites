import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { EVENTS } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Checkout() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { placeOrder } = useStore()
  const event = EVENTS.find((e) => e.id === id)
  const sel = location.state

  const [form, setForm] = useState({ name: '', email: '', card: '', exp: '', cvc: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  if (!event || !sel) return <Navigate to={`/event/${id}`} replace />

  const fee = Math.round(sel.total * 0.12)
  const grand = sel.total + fee

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Enter a valid email.'
    if (!/^\d{16}$/.test(form.card.replace(/\s/g, ''))) err.card = 'Card number must be 16 digits.'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) err.exp = 'Use MM/YY.'
    if (!/^\d{3}$/.test(form.cvc)) err.cvc = 'CVC must be 3 digits.'
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setBusy(true)
    setTimeout(() => {
      const rec = placeOrder({
        eventId: event.id, eventTitle: event.title, section: sel.sectionName,
        seats: sel.seats, qty: sel.seats.length, total: grand,
      })
      navigate(`/confirmation/${rec.code}`, { state: { order: rec, event } })
    }, 1000)
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      <form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Your details</h2>
            <div className="grid gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Full name</span><input className={input('name')} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
            </div>
          </section>
          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Payment</h2>
            <div className="grid gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Card number</span><input className={input('card')} placeholder="4242 4242 4242 4242" value={form.card} onChange={(e) => setForm((f) => ({ ...f, card: e.target.value }))} />{errors.card && <span className="text-xs text-red-600">{errors.card}</span>}</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Expiry</span><input className={input('exp')} placeholder="MM/YY" value={form.exp} onChange={(e) => setForm((f) => ({ ...f, exp: e.target.value }))} />{errors.exp && <span className="text-xs text-red-600">{errors.exp}</span>}</label>
                <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">CVC</span><input className={input('cvc')} placeholder="123" value={form.cvc} onChange={(e) => setForm((f) => ({ ...f, cvc: e.target.value }))} />{errors.cvc && <span className="text-xs text-red-600">{errors.cvc}</span>}</label>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-semibold text-gray-900">{event.title}</h2>
          <p className="text-sm text-gray-500">{event.venue} · {event.city}</p>
          <p className="mt-3 text-sm text-gray-600">{sel.sectionName}</p>
          <p className="text-sm text-gray-600">{sel.seats.length} seat{sel.seats.length !== 1 ? 's' : ''}: {sel.seats.map((s) => { const [r, c] = s.split('-'); return String.fromCharCode(64 + Number(r)) + c }).join(', ')}</p>
          <dl className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{money(sel.total)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Service fee</dt><dd>{money(fee)}</dd></div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold"><dt>Total</dt><dd data-testid="checkout-total">{money(grand)}</dd></div>
          </dl>
          <button type="submit" disabled={busy} data-testid="place-order" className="mt-4 w-full rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">{busy ? 'Processing…' : `Pay ${money(grand)}`}</button>
        </aside>
      </form>
    </div>
  )
}
