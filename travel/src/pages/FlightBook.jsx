import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CITIES, generateFlights } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

const cityName = (code) => CITIES.find((c) => c.code === code)?.city || code
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8]
const COLS = ['A', 'B', 'C', 'D', 'E', 'F']
const SEAT_FEE = 18

export default function FlightBook() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const pax = Number(params.get('pax') || 1)
  const navigate = useNavigate()
  const toast = useToast()
  const { addTrip } = useStore()

  const from = id?.slice(0, 3)
  const to = id?.slice(3, 6)
  const flight = useMemo(() => generateFlights(from, to, '').find((f) => f.id === id), [from, to, id])

  const taken = useMemo(() => {
    const seed = (id || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const set = new Set()
    ROWS.forEach((r) => COLS.forEach((c, ci) => { if ((seed + r * 7 + ci * 3) % 5 === 0) set.add(`${r}${c}`) }))
    return set
  }, [id])

  const [form, setForm] = useState({ name: '', email: '', phone: '', bag: false })
  const [seats, setSeats] = useState([])
  const [errors, setErrors] = useState({})

  if (!flight) return <Navigate to="/flights" replace />

  const toggleSeat = (s) => {
    if (taken.has(s)) return
    setSeats((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : cur.length < pax ? [...cur, s] : cur))
  }

  const base = flight.price * pax
  const bagFee = form.bag ? 35 * pax : 0
  const seatFee = seats.length * SEAT_FEE
  const total = base + bagFee + seatFee

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Passenger name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Enter a valid email.'
    setErrors(err)
    if (Object.keys(err).length > 0) return
    const rec = addTrip({
      type: 'flight',
      summary: `${cityName(from)} (${from}) → ${cityName(to)} (${to})`,
      detail: `${flight.airline} ${flight.flightNo} · ${flight.depart}→${flight.arrive} · ${pax} passenger${pax > 1 ? 's' : ''}${seats.length ? ` · seats ${seats.join(', ')}` : ''}`,
      total,
    })
    toast.show('Booking confirmed')
    navigate(`/confirmation/${rec.ref}`, { state: { trip: rec } })
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Complete your booking</h1>
      <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm">
        <p className="font-semibold text-gray-900">{flight.airline} {flight.flightNo}</p>
        <p className="text-gray-600">{cityName(from)} ({from}) {flight.depart} → {cityName(to)} ({to}) {flight.arrive} · {flight.duration} · {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Lead passenger</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className="mb-1 block text-sm font-medium text-gray-700">Full name</span><input className={input('name')} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Phone</span><input className={input('phone')} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></label>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={form.bag} onChange={(e) => setForm((f) => ({ ...f, bag: e.target.checked }))} className="accent-brand-600" /> Add checked bag (+{money(35)} / passenger)</label>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="mb-1 font-semibold text-gray-900">Choose your seats</h2>
            <p className="mb-4 text-xs text-gray-500">Pick up to {pax} seat{pax > 1 ? 's' : ''} (+{money(SEAT_FEE)} each). Grey seats are taken.</p>
            <div className="space-y-2">
              {ROWS.map((r) => (
                <div key={r} className="flex items-center justify-center gap-2">
                  <span className="w-5 text-right text-xs text-gray-400">{r}</span>
                  {COLS.map((c, ci) => {
                    const s = `${r}${c}`
                    const isTaken = taken.has(s)
                    const sel = seats.includes(s)
                    return (
                      <span key={c} className="flex items-center">
                        <button type="button" disabled={isTaken} onClick={() => toggleSeat(s)} data-testid="seat" aria-label={`Seat ${s}`}
                          className={`h-7 w-7 rounded text-xs font-medium ${isTaken ? 'cursor-not-allowed bg-gray-200 text-gray-400' : sel ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700 hover:bg-brand-200'}`}>{c}</button>
                        {ci === 2 && <span className="w-4" />}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
            {seats.length > 0 && <p className="mt-3 text-sm text-gray-600">Selected: <span className="font-medium text-gray-900">{seats.join(', ')}</span></p>}
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 font-semibold text-gray-900">Price summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Fare × {pax}</dt><dd>{money(base)}</dd></div>
            {bagFee > 0 && <div className="flex justify-between"><dt className="text-gray-500">Checked bags</dt><dd>{money(bagFee)}</dd></div>}
            {seatFee > 0 && <div className="flex justify-between"><dt className="text-gray-500">Seats</dt><dd>{money(seatFee)}</dd></div>}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold"><dt>Total</dt><dd data-testid="book-total">{money(total)}</dd></div>
          </dl>
          <button type="submit" data-testid="confirm-booking" className="mt-4 w-full rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">Confirm & pay</button>
        </aside>
      </form>
    </div>
  )
}
