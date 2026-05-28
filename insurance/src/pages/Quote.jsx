import { useState } from 'react'
import { QUOTE_TYPES } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

const STEPS = ['Coverage', 'Details', 'Contact', 'Quote']

export default function Quote() {
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ type: '', zip: '', level: 'Standard', age: '', name: '', email: '', phone: '' })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  // Deterministic estimated premium from inputs.
  const estimate = (() => {
    const base = { auto: 120, home: 90, renters: 22, life: 35, pet: 40 }[form.type] || 80
    const lvlMult = { Basic: 0.85, Standard: 1, Premium: 1.4 }[form.level] || 1
    const ageAdj = form.age ? 1 + Math.max(0, (Number(form.age) - 30)) * 0.004 : 1
    return Math.round(base * lvlMult * ageAdj)
  })()

  const validate = () => {
    const e = {}
    if (step === 0 && !form.type) e.type = 'Pick a coverage type.'
    if (step === 1) {
      if (!/^\d{5}$/.test(form.zip)) e.zip = 'Enter a 5-digit ZIP.'
      if (!form.age || isNaN(Number(form.age))) e.age = 'Enter your age.'
    }
    if (step === 2) {
      if (!form.name.trim()) e.name = 'Name is required.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email.'
    }
    return e
  }
  const next = () => { const e = validate(); setErrors(e); if (Object.keys(e).length === 0) setStep((s) => Math.min(STEPS.length - 1, s + 1)) }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Get a quote</h1>

      <ol className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`grid h-6 w-6 place-items-center rounded-full font-bold ${i <= step ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</span>
            <span className={i === step ? 'font-semibold text-gray-900' : 'text-gray-400'}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-1 h-px w-5 bg-gray-200" />}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        {step === 0 && (
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">What would you like to insure?</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {QUOTE_TYPES.map((t) => (
                <button key={t.id} type="button" onClick={() => set('type', t.id)} data-testid="quote-type" className={`rounded-xl border p-4 text-center ${form.type === t.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="text-2xl">{t.icon}</div>
                  <p className="mt-1 text-sm font-medium text-gray-900">{t.label}</p>
                </button>
              ))}
            </div>
            {errors.type && <p className="mt-2 text-xs text-red-600">{errors.type}</p>}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">ZIP code</span><input className={input('zip')} value={form.zip} onChange={(e) => set('zip', e.target.value)} />{errors.zip && <span className="text-xs text-red-600">{errors.zip}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Age</span><input className={input('age')} value={form.age} onChange={(e) => set('age', e.target.value)} inputMode="numeric" />{errors.age && <span className="text-xs text-red-600">{errors.age}</span>}</label>
            </div>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Coverage level</span>
              <select className={input('level')} value={form.level} onChange={(e) => set('level', e.target.value)}><option>Basic</option><option>Standard</option><option>Premium</option></select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Full name</span><input className={input('name')} value={form.name} onChange={(e) => set('name', e.target.value)} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={form.email} onChange={(e) => set('email', e.target.value)} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Phone</span><input className={input('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} /></label>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="text-sm text-gray-500">Your estimated premium</p>
            <p className="my-2 text-4xl font-bold text-brand-700" data-testid="quote-estimate">{money(estimate)}<span className="text-base font-normal text-gray-400">/month</span></p>
            <p className="text-sm text-gray-600">Based on a {form.level.toLowerCase()} {QUOTE_TYPES.find((t) => t.id === form.type)?.label.toLowerCase()} policy in {form.zip}.</p>
            <button onClick={() => toast.show('Quote saved — an agent will reach out')} className="mt-5 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Save this quote</button>
          </div>
        )}
      </div>

      {step < STEPS.length - 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40">Back</button>
          <button onClick={next} data-testid="quote-continue" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{step === 2 ? 'See my quote' : 'Continue'}</button>
        </div>
      )}
    </div>
  )
}
