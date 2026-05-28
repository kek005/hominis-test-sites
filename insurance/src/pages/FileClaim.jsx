import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

const STEPS = ['Policy', 'Incident', 'Photos', 'Review']

export default function FileClaim() {
  const { policies, fileClaim } = useStore()
  const navigate = useNavigate()
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ policyId: '', type: '', date: '', amount: '', desc: '', photos: [] })

  const policy = policies.find((p) => p.id === form.policyId)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (step === 0 && !form.policyId) e.policyId = 'Select a policy.'
    if (step === 1) {
      if (!form.type.trim()) e.type = 'Describe the incident type.'
      if (!form.date) e.date = 'Select the incident date.'
      if (!form.amount || isNaN(parseFloat(form.amount))) e.amount = 'Enter an estimated amount.'
      if (form.desc.trim().length < 20) e.desc = 'Please add at least 20 characters.'
    }
    return e
  }

  const next = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }

  const submit = () => {
    setBusy(true)
    setTimeout(() => {
      const rec = fileClaim({
        policyId: form.policyId, policyName: policy.name, type: form.type,
        amount: parseFloat(form.amount), desc: form.desc,
      })
      toast.show(`Claim ${rec.id} submitted`)
      navigate('/claims')
    }, 1000)
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">File a claim</h1>

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
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Which policy is this claim for?</p>
            {policies.map((p) => (
              <label key={p.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${form.policyId === p.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input type="radio" name="policy" value={p.id} checked={form.policyId === p.id} onChange={(e) => set('policyId', e.target.value)} className="accent-brand-600" />
                <span className="text-xl">{p.icon}</span>
                <span><span className="block font-medium text-gray-900">{p.name}</span><span className="block text-xs text-gray-400">{p.number}</span></span>
              </label>
            ))}
            {errors.policyId && <p className="text-xs text-red-600">{errors.policyId}</p>}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Incident type</span><input className={input('type')} value={form.type} onChange={(e) => set('type', e.target.value)} placeholder="e.g. Collision, Water damage" />{errors.type && <span className="text-xs text-red-600">{errors.type}</span>}</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Date of incident</span><input type="date" className={input('date')} value={form.date} onChange={(e) => set('date', e.target.value)} />{errors.date && <span className="text-xs text-red-600">{errors.date}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Estimated amount</span><input className={input('amount')} value={form.amount} onChange={(e) => set('amount', e.target.value)} placeholder="$" inputMode="decimal" />{errors.amount && <span className="text-xs text-red-600">{errors.amount}</span>}</label>
            </div>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">What happened?</span><textarea rows={4} className={input('desc')} value={form.desc} onChange={(e) => set('desc', e.target.value)} />{errors.desc && <span className="text-xs text-red-600">{errors.desc}</span>}</label>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-3 text-sm text-gray-600">Add photos of the damage (optional — demo, no files are uploaded).</p>
            <div className="grid grid-cols-3 gap-3">
              {form.photos.map((p, i) => (
                <div key={i} className="grid aspect-square place-items-center rounded-xl bg-emerald-50 text-emerald-600">✓ {p}</div>
              ))}
              {form.photos.length < 6 && (
                <button type="button" onClick={() => set('photos', [...form.photos, `Photo ${form.photos.length + 1}`])} data-testid="add-photo" className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:bg-gray-50">+ Add</button>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2 text-sm">
            <h2 className="text-lg font-semibold text-gray-900">Review your claim</h2>
            <div className="flex justify-between"><span className="text-gray-500">Policy</span><span className="font-medium text-gray-900">{policy?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="text-gray-900">{form.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="text-gray-900">{form.date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Estimated amount</span><span className="text-gray-900">{money(parseFloat(form.amount || 0))}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Photos</span><span className="text-gray-900">{form.photos.length}</span></div>
            <p className="pt-2 text-gray-600">{form.desc}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => (step === 0 ? navigate('/dashboard') : setStep((s) => s - 1))} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">{step === 0 ? 'Cancel' : 'Back'}</button>
        {step < STEPS.length - 1 ? (
          <button onClick={next} data-testid="claim-continue" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Continue</button>
        ) : (
          <button onClick={submit} disabled={busy} data-testid="submit-claim" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">{busy ? 'Submitting…' : 'Submit claim'}</button>
        )}
      </div>
    </div>
  )
}
