import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

const STEPS = ['Shipping', 'Payment', 'Review']

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const { cart, cartSubtotal, placeOrder } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '',
    card: '', exp: '', cvc: '',
  })
  const [errors, setErrors] = useState({})

  if (cart.length === 0) return <Navigate to="/cart" replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const shipping = cartSubtotal > 100 ? 0 : 9.99
  const total = cartSubtotal + shipping

  const validateShipping = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.address.trim()) e.address = 'Address is required.'
    if (!form.city.trim()) e.city = 'City is required.'
    if (!/^\d{5}$/.test(form.zip)) e.zip = 'Enter a 5-digit ZIP code.'
    return e
  }
  const validatePayment = () => {
    const e = {}
    if (!/^\d{16}$/.test(form.card.replace(/\s/g, ''))) e.card = 'Card number must be 16 digits.'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = 'Use MM/YY format.'
    if (!/^\d{3}$/.test(form.cvc)) e.cvc = 'CVC must be 3 digits.'
    return e
  }

  const next = () => {
    const e = step === 0 ? validateShipping() : step === 1 ? validatePayment() : {}
    setErrors(e)
    if (Object.keys(e).length === 0) setStep((s) => s + 1)
  }

  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      const order = placeOrder({ name: form.name, email: form.email, address: form.address, city: form.city, zip: form.zip })
      navigate(`/order/${order.id}`, { state: { order } })
    }, 1200)
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <ol className="mb-8 flex items-center gap-2 text-sm">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i <= step ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</span>
            <span className={i <= step ? 'font-medium text-gray-900' : 'text-gray-400'}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-2 h-px w-8 bg-gray-200" />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-4">
          <Field label="Full name" error={errors.name}><input className={input} value={form.name} onChange={set('name')} /></Field>
          <Field label="Email" error={errors.email}><input className={input} value={form.email} onChange={set('email')} /></Field>
          <Field label="Street address" error={errors.address}><input className={input} value={form.address} onChange={set('address')} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" error={errors.city}><input className={input} value={form.city} onChange={set('city')} /></Field>
            <Field label="ZIP" error={errors.zip}><input className={input} value={form.zip} onChange={set('zip')} /></Field>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4">
          <Field label="Card number" error={errors.card}><input className={input} placeholder="4242 4242 4242 4242" value={form.card} onChange={set('card')} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry (MM/YY)" error={errors.exp}><input className={input} placeholder="12/28" value={form.exp} onChange={set('exp')} /></Field>
            <Field label="CVC" error={errors.cvc}><input className={input} placeholder="123" value={form.cvc} onChange={set('cvc')} /></Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl border border-gray-100 p-6">
          <h2 className="mb-3 font-semibold text-gray-900">Review your order</h2>
          <p className="text-sm text-gray-600">Shipping to <span className="font-medium text-gray-900">{form.name}</span>, {form.address}, {form.city} {form.zip}</p>
          <p className="text-sm text-gray-600">Paying with card ending {form.card.replace(/\s/g, '').slice(-4)}</p>
          <dl className="mt-4 space-y-1 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{money(cartSubtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Shipping</dt><dd>{shipping === 0 ? 'Free' : money(shipping)}</dd></div>
            <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => (step === 0 ? navigate('/cart') : setStep((s) => s - 1))}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {step === 0 ? 'Back to cart' : 'Back'}
        </button>
        {step < 2 ? (
          <button onClick={next} className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Continue
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            data-testid="place-order"
            className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400"
          >
            {submitting ? 'Placing order…' : `Place order · ${money(total)}`}
          </button>
        )}
      </div>
    </div>
  )
}
