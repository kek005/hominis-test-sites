import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DEFAULT_MORTGAGE, monthlyPI } from '../data/seed.js'
import { money, num } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import Modal from '../components/Modal.jsx'
import Photo from '../components/Photo.jsx'

export default function PropertyDetail() {
  const { id } = useParams()
  const { propertyById, agentById, isSaved, toggleSave, requestTour } = useStore()
  const toast = useToast()
  const property = propertyById(id)
  const [tourOpen, setTourOpen] = useState(false)
  const [tour, setTour] = useState({ name: '', email: '', phone: '', date: '', time: '14:00', message: '' })
  const [errors, setErrors] = useState({})
  const [gallery, setGallery] = useState(0)
  const [m, setM] = useState(DEFAULT_MORTGAGE)

  if (!property) return <Navigate to="/" replace />

  const agent = agentById(property.agentId)
  const pi = monthlyPI(property.price, m.downPct, m.rate, m.years)
  const taxesIns = (property.price * 0.013) / 12  // rough est: 1.3%/yr property tax + ins
  const monthly = pi + taxesIns

  const submitTour = () => {
    const err = {}
    if (!tour.name.trim()) err.name = 'Required'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(tour.email)) err.email = 'Valid email required'
    if (!tour.date) err.date = 'Pick a date'
    setErrors(err)
    if (Object.keys(err).length > 0) return
    const rec = requestTour({ propertyId: property.id, propertyTitle: property.title, agentName: agent?.name, ...tour })
    toast.show(`Tour requested — ${rec.ref}`)
    setTourOpen(false)
    setTour({ name: '', email: '', phone: '', date: '', time: '14:00', message: '' })
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← Listings</Link>

      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        <Photo src={`/img/properties/${property.img}.jpg`} alt={property.title} label={property.title} className="h-80 w-full rounded-2xl sm:col-span-3" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {[0, 1, 2].map((i) => (
            <Photo key={i} src={`/img/properties/${property.img}.jpg`} alt={`${property.title} ${i + 1}`} label={`Photo ${i + 1}`} className={`h-24 w-full rounded-xl ${gallery === i ? 'ring-2 ring-brand-500' : ''}`} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">{money(property.price)}</p>
              <p className="mt-1 text-gray-700">{property.beds} bd · {property.baths} ba · {property.sqft ? `${num(property.sqft)} sqft` : `${num(property.lot)} sqft lot`}</p>
              <p className="mt-1 text-sm text-gray-500">{property.address} · {property.city}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleSave(property.id)} data-testid="save-property" className={`rounded-lg border px-4 py-2 text-sm font-medium ${isSaved(property.id) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                {isSaved(property.id) ? '♥ Saved' : '♡ Save'}
              </button>
              <button onClick={() => setTourOpen(true)} data-testid="schedule-tour" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Schedule a tour</button>
            </div>
          </div>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">About this home</h2>
          <p className="mt-2 text-gray-700">{property.desc}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec label="Type" value={property.type} />
            <Spec label="Year built" value={property.year || '—'} />
            <Spec label="Sqft" value={property.sqft ? num(property.sqft) : '—'} />
            <Spec label="Lot" value={property.lot ? `${num(property.lot)} sqft` : '—'} />
          </div>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">Features</h2>
          <ul className="mt-2 grid gap-1 text-sm text-gray-700 sm:grid-cols-2">
            {property.features.map((f) => <li key={f}>✓ {f}</li>)}
          </ul>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Listing agent</h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-base font-bold text-brand-700">{agent?.name.split(' ').map((w) => w[0]).join('')}</div>
              <div>
                <p className="font-medium text-gray-900">{agent?.name}</p>
                <p className="text-xs text-gray-500">Hearth Realty</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-brand-700">{agent?.email}</p>
            <p className="text-sm text-gray-600">{agent?.phone}</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Monthly payment estimate</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900" data-testid="monthly-payment">{money(monthly)}</p>
            <p className="text-xs text-gray-500">{money(pi)} P&I + {money(taxesIns)} taxes/ins.</p>
            <div className="mt-4 grid gap-3 text-sm">
              <label><span className="mb-1 block text-xs font-medium text-gray-700">Down payment: {m.downPct}%</span>
                <input type="range" min="0" max="50" value={m.downPct} onChange={(e) => setM((x) => ({ ...x, downPct: Number(e.target.value) }))} className="w-full accent-brand-600" aria-label="Down payment percent" />
              </label>
              <label><span className="mb-1 block text-xs font-medium text-gray-700">Rate: {m.rate}%</span>
                <input type="range" min="3" max="10" step="0.1" value={m.rate} onChange={(e) => setM((x) => ({ ...x, rate: Number(e.target.value) }))} className="w-full accent-brand-600" aria-label="Interest rate" />
              </label>
              <label><span className="mb-1 block text-xs font-medium text-gray-700">Term: {m.years} years</span>
                <input type="range" min="10" max="30" step="5" value={m.years} onChange={(e) => setM((x) => ({ ...x, years: Number(e.target.value) }))} className="w-full accent-brand-600" aria-label="Loan term" />
              </label>
            </div>
          </div>
        </aside>
      </div>

      <Modal open={tourOpen} onClose={() => setTourOpen(false)} title="Schedule a tour" testid="tour-modal">
        <p className="mb-3 text-sm text-gray-600">Pick a date and we'll have {agent?.name.split(' ')[0]} reach out to confirm.</p>
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Full name</span><input className={input('name')} value={tour.name} onChange={(e) => setTour((t) => ({ ...t, name: e.target.value }))} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={tour.email} onChange={(e) => setTour((t) => ({ ...t, email: e.target.value }))} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Phone</span><input className={input('phone')} value={tour.phone} onChange={(e) => setTour((t) => ({ ...t, phone: e.target.value }))} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Date</span><input type="date" className={input('date')} value={tour.date} onChange={(e) => setTour((t) => ({ ...t, date: e.target.value }))} />{errors.date && <span className="text-xs text-red-600">{errors.date}</span>}</label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Time</span>
              <select className={input('time')} value={tour.time} onChange={(e) => setTour((t) => ({ ...t, time: e.target.value }))}>
                {['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Message <span className="text-gray-400">(optional)</span></span><textarea rows={3} className={input('message')} value={tour.message} onChange={(e) => setTour((t) => ({ ...t, message: e.target.value }))} /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setTourOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={submitTour} data-testid="submit-tour" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Request tour</button>
        </div>
      </Modal>
    </div>
  )
}

function Spec({ label, value }) {
  return <div className="rounded-xl border border-gray-100 p-3"><p className="text-xs text-gray-400">{label}</p><p className="mt-1 font-semibold text-gray-900">{value}</p></div>
}
