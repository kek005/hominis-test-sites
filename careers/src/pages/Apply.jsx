import { useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const COVER_MAX = 1500

function Field({ label, required, error, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export default function Apply() {
  const { id } = useParams()
  const { jobById, submitApplication, hasApplied } = useStore()
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const job = jobById(id)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    experience: '', authorized: '', startDate: '', cover: '', resumeName: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!job) return <Navigate to="/" replace />
  if (hasApplied(job.id)) return <Navigate to={`/job/${job.id}`} replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!/^[\d\s()+-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.resumeName) e.resumeName = 'Please attach your résumé.'
    if (!form.experience) e.experience = 'Select your years of experience.'
    if (!form.authorized) e.authorized = 'This field is required.'
    if (!form.startDate) e.startDate = 'Select your earliest start date.'
    if (form.cover.trim().length < 40) e.cover = 'Tell us a little more — at least 40 characters.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) {
      const first = document.querySelector('[data-invalid="true"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const rec = submitApplication({ jobId: job.id, jobTitle: job.title, ...form })
      navigate(`/job/${job.id}/applied`, { state: { ref: rec.ref } })
    }, 1200)
  }

  const input = (k) =>
    `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to={`/job/${job.id}`} className="text-sm text-gray-500 hover:text-gray-900">← Back to role</Link>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Apply: {job.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{job.department} · {job.location}</p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div data-invalid={!!errors.firstName}><Field label="First name" required error={errors.firstName}><input className={input('firstName')} value={form.firstName} onChange={set('firstName')} /></Field></div>
          <div data-invalid={!!errors.lastName}><Field label="Last name" required error={errors.lastName}><input className={input('lastName')} value={form.lastName} onChange={set('lastName')} /></Field></div>
        </div>
        <div data-invalid={!!errors.email}><Field label="Email" required error={errors.email}><input className={input('email')} value={form.email} onChange={set('email')} /></Field></div>
        <div data-invalid={!!errors.phone}><Field label="Phone" required error={errors.phone}><input className={input('phone')} value={form.phone} onChange={set('phone')} placeholder="+1 (555) 123-4567" /></Field></div>

        <div data-invalid={!!errors.resumeName}>
          <Field label="Résumé" required error={errors.resumeName} hint="PDF or DOCX, up to 5MB (demo — no file is uploaded).">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Choose file
              </button>
              <span className="text-sm text-gray-500">{form.resumeName || 'No file chosen'}</span>
              <input
                ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                onChange={(e) => setForm((f) => ({ ...f, resumeName: e.target.files?.[0]?.name || '' }))}
              />
            </div>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div data-invalid={!!errors.experience}>
            <Field label="Years of experience" required error={errors.experience}>
              <select className={input('experience')} value={form.experience} onChange={set('experience')}>
                <option value="">Select…</option>
                <option>0–1 years</option><option>2–4 years</option><option>5–7 years</option><option>8+ years</option>
              </select>
            </Field>
          </div>
          <div data-invalid={!!errors.startDate}>
            <Field label="Earliest start date" required error={errors.startDate}>
              <input type="date" className={input('startDate')} value={form.startDate} onChange={set('startDate')} />
            </Field>
          </div>
        </div>

        <div data-invalid={!!errors.authorized}>
          <Field label="Are you authorized to work in the role's location?" required error={errors.authorized}>
            <div className="flex gap-4 pt-1">
              {['Yes', 'No'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="radio" name="authorized" value={opt} checked={form.authorized === opt} onChange={set('authorized')} />
                  {opt}
                </label>
              ))}
            </div>
          </Field>
        </div>

        <div data-invalid={!!errors.cover}>
          <Field label="Why are you a good fit?" required error={errors.cover}>
            <textarea
              rows={5}
              maxLength={COVER_MAX}
              className={input('cover')}
              value={form.cover}
              onChange={set('cover')}
              placeholder="A few sentences about why this role excites you…"
            />
            <span className="mt-1 block text-right text-xs text-gray-400">{form.cover.length}/{COVER_MAX}</span>
          </Field>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <Link to={`/job/${job.id}`} className="text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</Link>
          <button type="submit" disabled={submitting} data-testid="submit-application" className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        </div>
      </form>
    </div>
  )
}
