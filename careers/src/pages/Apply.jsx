import { useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import {
  EXPERIENCE_LEVELS, DEGREES, GRAD_YEARS, SOURCES, NOTICE_PERIODS, PRONOUNS,
  GENDERS, ETHNICITIES, VETERAN_STATUS, DISABILITY_STATUS,
} from '../data/seed.js'

const STEPS = ['Personal', 'Experience', 'Education', 'Questions', 'Voluntary', 'Review']
const COVER_MAX = 2000

const input = (err) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${err ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-brand-500'}`

function Field({ label, required, error, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label} {required && <span className="text-red-500">*</span>}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

function Radio({ name, value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-4 pt-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} className="accent-brand-600" /> {opt}
        </label>
      ))}
    </div>
  )
}

export default function Apply() {
  const { id } = useParams()
  const { jobById, submitApplication, hasApplied } = useStore()
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const job = jobById(id)

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '',
    resumeName: '', currentTitle: '', currentCompany: '', experience: '',
    workAuthorized: '', requiresSponsorship: '', willingToRelocate: '', desiredSalary: '',
    noticePeriod: '', startDate: '', source: '', cover: '',
    pronouns: '', gender: '', ethnicity: '', veteran: '', disability: '', consent: false,
  })
  const [education, setEducation] = useState([{ degree: '', field: '', school: '', gradYear: '' }])
  const [work, setWork] = useState([])

  if (!job) return <Navigate to="/" replace />
  if (hasApplied(job.id)) return <Navigate to={`/job/${job.id}`} replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const setEdu = (i, k, v) => setEducation((arr) => arr.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)))
  const setWork_ = (i, k, v) => setWork((arr) => arr.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)))

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'First name is required.'
      if (!form.lastName.trim()) e.lastName = 'Last name is required.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email address.'
      if (!/^[\d\s()+-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
      if (!form.location.trim()) e.location = 'Current location is required.'
    }
    if (step === 1) {
      if (!form.resumeName) e.resumeName = 'Please attach your résumé.'
      if (!form.experience) e.experience = 'Select your years of experience.'
      work.forEach((w, i) => {
        if (!w.title.trim()) e[`work_${i}_title`] = 'Required.'
        if (!w.company.trim()) e[`work_${i}_company`] = 'Required.'
      })
    }
    if (step === 2) {
      const first = education[0]
      if (!first.degree) e.edu0degree = 'Select a degree.'
      if (!first.school.trim()) e.edu0school = 'School is required.'
      if (!first.gradYear) e.edu0gradYear = 'Select a graduation year.'
    }
    if (step === 3) {
      if (!form.workAuthorized) e.workAuthorized = 'This field is required.'
      if (!form.requiresSponsorship) e.requiresSponsorship = 'This field is required.'
      if (!form.willingToRelocate) e.willingToRelocate = 'This field is required.'
      if (!form.noticePeriod) e.noticePeriod = 'Select your notice period.'
      if (!form.startDate) e.startDate = 'Select your earliest start date.'
      if (!form.source) e.source = 'Let us know how you heard about us.'
      if (form.cover.trim().length < 50) e.cover = 'Please write at least 50 characters.'
    }
    if (step === 5) {
      if (!form.consent) e.consent = 'You must certify the information is accurate.'
    }
    return e
  }

  const next = () => {
    const e = validateStep()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setStep((s) => Math.min(STEPS.length - 1, s + 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector('[data-invalid="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  const back = () => { setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const submit = () => {
    const e = validateStep()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setSubmitting(true)
    setTimeout(() => {
      const rec = submitApplication({ jobId: job.id, jobTitle: job.title, ...form, education, work })
      navigate(`/job/${job.id}/applied`, { state: { ref: rec.ref } })
    }, 1200)
  }

  const wrap = (cond, node) => <div data-invalid={!!cond}>{node}</div>

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to={`/job/${job.id}`} className="text-sm text-gray-500 hover:text-gray-900">← Back to role</Link>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Apply: {job.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{job.department} · {job.location}</p>

      <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`grid h-6 w-6 place-items-center rounded-full font-bold ${i < step ? 'bg-brand-600 text-white' : i === step ? 'bg-brand-600 text-white ring-2 ring-brand-200' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</span>
            <span className={i === step ? 'font-semibold text-gray-900' : 'text-gray-400'}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-1 h-px w-5 bg-gray-200" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-5">
        {step === 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {wrap(errors.firstName, <Field label="First name" required error={errors.firstName}><input className={input(errors.firstName)} value={form.firstName} onChange={set('firstName')} /></Field>)}
              {wrap(errors.lastName, <Field label="Last name" required error={errors.lastName}><input className={input(errors.lastName)} value={form.lastName} onChange={set('lastName')} /></Field>)}
            </div>
            {wrap(errors.email, <Field label="Email" required error={errors.email}><input className={input(errors.email)} value={form.email} onChange={set('email')} /></Field>)}
            {wrap(errors.phone, <Field label="Phone" required error={errors.phone}><input className={input(errors.phone)} value={form.phone} onChange={set('phone')} placeholder="+1 (555) 123-4567" /></Field>)}
            {wrap(errors.location, <Field label="Current location" required error={errors.location} hint="City, State/Country"><input className={input(errors.location)} value={form.location} onChange={set('location')} placeholder="Austin, TX" /></Field>)}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="LinkedIn" hint="Optional"><input className={input()} value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/…" /></Field>
              <Field label="Portfolio / website" hint="Optional"><input className={input()} value={form.portfolio} onChange={set('portfolio')} placeholder="https://…" /></Field>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            {wrap(errors.resumeName, (
              <Field label="Résumé" required error={errors.resumeName} hint="PDF or DOCX, up to 5MB (demo — no file is uploaded).">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Choose file</button>
                  <span className="text-sm text-gray-500">{form.resumeName || 'No file chosen'}</span>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setForm((f) => ({ ...f, resumeName: e.target.files?.[0]?.name || '' }))} />
                </div>
              </Field>
            ))}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Current job title"><input className={input()} value={form.currentTitle} onChange={set('currentTitle')} /></Field>
              <Field label="Current company"><input className={input()} value={form.currentCompany} onChange={set('currentCompany')} /></Field>
            </div>
            {wrap(errors.experience, (
              <Field label="Total years of experience" required error={errors.experience}>
                <select className={input(errors.experience)} value={form.experience} onChange={set('experience')}>
                  <option value="">Select…</option>{EXPERIENCE_LEVELS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </Field>
            ))}

            <div className="rounded-xl border border-gray-100 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Work history <span className="font-normal text-gray-400">(optional)</span></h3>
                <button type="button" onClick={() => setWork((w) => [...w, { title: '', company: '', startYear: '', endYear: '', current: false }])} className="text-sm font-medium text-brand-700 hover:underline">+ Add role</button>
              </div>
              {work.length === 0 && <p className="text-sm text-gray-400">Add previous roles to strengthen your application.</p>}
              <div className="space-y-4">
                {work.map((w, i) => (
                  <div key={i} className="rounded-lg bg-gray-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {wrap(errors[`work_${i}_title`], <Field label="Title" required error={errors[`work_${i}_title`]}><input className={input(errors[`work_${i}_title`])} value={w.title} onChange={(e) => setWork_(i, 'title', e.target.value)} /></Field>)}
                      {wrap(errors[`work_${i}_company`], <Field label="Company" required error={errors[`work_${i}_company`]}><input className={input(errors[`work_${i}_company`])} value={w.company} onChange={(e) => setWork_(i, 'company', e.target.value)} /></Field>)}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Field label="Start year"><select className={input()} value={w.startYear} onChange={(e) => setWork_(i, 'startYear', e.target.value)}><option value="">—</option>{GRAD_YEARS.map((y) => <option key={y}>{y}</option>)}</select></Field>
                      <Field label="End year"><select className={input()} value={w.endYear} disabled={w.current} onChange={(e) => setWork_(i, 'endYear', e.target.value)}><option value="">—</option>{GRAD_YEARS.map((y) => <option key={y}>{y}</option>)}</select></Field>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={w.current} onChange={(e) => setWork_(i, 'current', e.target.checked)} className="accent-brand-600" /> I currently work here</label>
                      <button type="button" onClick={() => setWork((arr) => arr.filter((_, idx) => idx !== i))} className="text-sm text-gray-400 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="rounded-xl border border-gray-100 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Education</h3>
              <button type="button" onClick={() => setEducation((arr) => [...arr, { degree: '', field: '', school: '', gradYear: '' }])} className="text-sm font-medium text-brand-700 hover:underline">+ Add education</button>
            </div>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <div key={i} className="rounded-lg bg-gray-50 p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {wrap(i === 0 && errors.edu0degree, (
                      <Field label="Degree" required={i === 0} error={i === 0 ? errors.edu0degree : null}>
                        <select className={input(i === 0 && errors.edu0degree)} value={ed.degree} onChange={(e) => setEdu(i, 'degree', e.target.value)}><option value="">Select…</option>{DEGREES.map((d) => <option key={d}>{d}</option>)}</select>
                      </Field>
                    ))}
                    <Field label="Field of study"><input className={input()} value={ed.field} onChange={(e) => setEdu(i, 'field', e.target.value)} placeholder="e.g. Computer Science" /></Field>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {wrap(i === 0 && errors.edu0school, <Field label="School" required={i === 0} error={i === 0 ? errors.edu0school : null}><input className={input(i === 0 && errors.edu0school)} value={ed.school} onChange={(e) => setEdu(i, 'school', e.target.value)} /></Field>)}
                    {wrap(i === 0 && errors.edu0gradYear, (
                      <Field label="Graduation year" required={i === 0} error={i === 0 ? errors.edu0gradYear : null}>
                        <select className={input(i === 0 && errors.edu0gradYear)} value={ed.gradYear} onChange={(e) => setEdu(i, 'gradYear', e.target.value)}><option value="">Select…</option>{GRAD_YEARS.map((y) => <option key={y}>{y}</option>)}</select>
                      </Field>
                    ))}
                  </div>
                  {i > 0 && <button type="button" onClick={() => setEducation((arr) => arr.filter((_, idx) => idx !== i))} className="mt-2 text-sm text-gray-400 hover:text-red-600">Remove</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            {wrap(errors.workAuthorized, <Field label="Are you authorized to work in the role's location?" required error={errors.workAuthorized}><Radio name="workAuthorized" value={form.workAuthorized} onChange={set('workAuthorized')} options={['Yes', 'No']} /></Field>)}
            {wrap(errors.requiresSponsorship, <Field label="Will you now or in the future require visa sponsorship?" required error={errors.requiresSponsorship}><Radio name="requiresSponsorship" value={form.requiresSponsorship} onChange={set('requiresSponsorship')} options={['Yes', 'No']} /></Field>)}
            {wrap(errors.willingToRelocate, <Field label="Are you willing to relocate if required?" required error={errors.willingToRelocate}><Radio name="willingToRelocate" value={form.willingToRelocate} onChange={set('willingToRelocate')} options={['Yes', 'No', 'Open to discussion']} /></Field>)}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Desired salary" hint="Optional"><input className={input()} value={form.desiredSalary} onChange={set('desiredSalary')} placeholder="e.g. $150,000" /></Field>
              {wrap(errors.noticePeriod, <Field label="Notice period" required error={errors.noticePeriod}><select className={input(errors.noticePeriod)} value={form.noticePeriod} onChange={set('noticePeriod')}><option value="">Select…</option>{NOTICE_PERIODS.map((n) => <option key={n}>{n}</option>)}</select></Field>)}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {wrap(errors.startDate, <Field label="Earliest start date" required error={errors.startDate}><input type="date" className={input(errors.startDate)} value={form.startDate} onChange={set('startDate')} /></Field>)}
              {wrap(errors.source, <Field label="How did you hear about us?" required error={errors.source}><select className={input(errors.source)} value={form.source} onChange={set('source')}><option value="">Select…</option>{SOURCES.map((s) => <option key={s}>{s}</option>)}</select></Field>)}
            </div>
            {wrap(errors.cover, (
              <Field label="Why do you want this role?" required error={errors.cover}>
                <textarea rows={6} maxLength={COVER_MAX} className={input(errors.cover)} value={form.cover} onChange={set('cover')} placeholder="Tell us what excites you about this role and what you'd bring…" />
                <span className="mt-1 block text-right text-xs text-gray-400">{form.cover.length}/{COVER_MAX}</span>
              </Field>
            ))}
          </>
        )}

        {step === 4 && (
          <>
            <div className="rounded-lg bg-brand-50 p-4 text-sm text-brand-900">
              <p className="font-medium">Voluntary self-identification</p>
              <p className="mt-1 text-brand-800/80">Northwind is an equal opportunity employer. The questions below are entirely voluntary and will not be used in hiring decisions. You may decline to answer any of them.</p>
            </div>
            <Field label="Pronouns"><select className={input()} value={form.pronouns} onChange={set('pronouns')}><option value="">Prefer not to say</option>{PRONOUNS.map((p) => <option key={p}>{p}</option>)}</select></Field>
            <Field label="Gender"><select className={input()} value={form.gender} onChange={set('gender')}><option value="">Select…</option>{GENDERS.map((g) => <option key={g}>{g}</option>)}</select></Field>
            <Field label="Race / ethnicity"><select className={input()} value={form.ethnicity} onChange={set('ethnicity')}><option value="">Select…</option>{ETHNICITIES.map((x) => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Veteran status"><select className={input()} value={form.veteran} onChange={set('veteran')}><option value="">Select…</option>{VETERAN_STATUS.map((v) => <option key={v}>{v}</option>)}</select></Field>
            <Field label="Disability status"><select className={input()} value={form.disability} onChange={set('disability')}><option value="">Select…</option>{DISABILITY_STATUS.map((d) => <option key={d}>{d}</option>)}</select></Field>
          </>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Review your application</h3>
            <Summary title="Personal" rows={[['Name', `${form.firstName} ${form.lastName}`], ['Email', form.email], ['Phone', form.phone], ['Location', form.location], ['LinkedIn', form.linkedin || '—'], ['Portfolio', form.portfolio || '—']]} />
            <Summary title="Experience" rows={[['Résumé', form.resumeName], ['Current role', [form.currentTitle, form.currentCompany].filter(Boolean).join(' @ ') || '—'], ['Years', form.experience], ['Roles listed', String(work.length)]]} />
            <Summary title="Education" rows={education.map((e, i) => [`#${i + 1}`, [e.degree, e.field, e.school, e.gradYear].filter(Boolean).join(' · ') || '—'])} />
            <Summary title="Questions" rows={[['Work authorized', form.workAuthorized], ['Needs sponsorship', form.requiresSponsorship], ['Willing to relocate', form.willingToRelocate], ['Desired salary', form.desiredSalary || '—'], ['Notice period', form.noticePeriod], ['Earliest start', form.startDate], ['Heard via', form.source]]} />
            {wrap(errors.consent, (
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 accent-brand-600" />
                <span>I certify that the information provided is accurate and complete to the best of my knowledge. {errors.consent && <span className="block text-xs text-red-600">{errors.consent}</span>}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
        <button onClick={step === 0 ? () => navigate(`/job/${job.id}`) : back} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {step === 0 ? 'Cancel' : 'Back'}
        </button>
        {step < STEPS.length - 1 ? (
          <button onClick={next} data-testid="step-continue" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Continue</button>
        ) : (
          <button onClick={submit} disabled={submitting} data-testid="submit-application" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        )}
      </div>
    </div>
  )
}

function Summary({ title, rows }) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <h4 className="mb-2 text-sm font-semibold text-gray-900">{title}</h4>
      <dl className="grid gap-1 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4"><dt className="text-gray-500">{k}</dt><dd className="text-right text-gray-900">{v}</dd></div>
        ))}
      </dl>
    </div>
  )
}
