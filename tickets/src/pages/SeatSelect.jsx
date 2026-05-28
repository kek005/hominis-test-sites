import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { EVENTS, sectionsFor, takenSeats } from '../data/seed.js'
import { money } from '../lib/format.js'

const ROWS = 6
const COLS = 10
const MAX = 8

export default function SeatSelect() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = EVENTS.find((e) => e.id === id)
  const sections = event ? sectionsFor(event) : []
  const [sectionId, setSectionId] = useState(sections[1]?.id || 'ga')
  const [seats, setSeats] = useState([])

  const taken = useMemo(() => takenSeats(id, sectionId, ROWS, COLS), [id, sectionId])

  if (!event) return <Navigate to="/" replace />
  const section = sections.find((s) => s.id === sectionId)

  const changeSection = (sid) => { setSectionId(sid); setSeats([]) }
  const toggle = (s) => {
    if (taken.has(s)) return
    setSeats((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : cur.length < MAX ? [...cur, s] : cur))
  }

  const total = seats.length * section.price

  const checkout = () => {
    navigate(`/event/${id}/checkout`, { state: { sectionName: section.name, price: section.price, seats, total } })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to={`/event/${id}`} className="text-sm text-gray-500 hover:text-gray-900">← {event.title}</Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900">Select your seats</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {sections.map((s) => (
          <button key={s.id} onClick={() => changeSection(s.id)} data-testid="section-tab" className={`rounded-full px-4 py-1.5 text-sm font-medium ${sectionId === s.id ? 'bg-brand-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            {s.name} · {money(s.price)}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mx-auto mb-6 w-2/3 rounded bg-gray-800 py-1 text-center text-xs font-medium text-white">STAGE</div>
        <div className="space-y-2">
          {Array.from({ length: ROWS }).map((_, r) => (
            <div key={r} className="flex items-center justify-center gap-1.5">
              <span className="w-5 text-right text-xs text-gray-400">{String.fromCharCode(65 + r)}</span>
              {Array.from({ length: COLS }).map((_, c) => {
                const s = `${r + 1}-${c + 1}`
                const isTaken = taken.has(s)
                const sel = seats.includes(s)
                return (
                  <button key={c} type="button" disabled={isTaken} onClick={() => toggle(s)} data-testid="seat" aria-label={`Seat ${String.fromCharCode(65 + r)}${c + 1}`}
                    className={`h-6 w-6 rounded-t text-[10px] ${isTaken ? 'cursor-not-allowed bg-gray-200 text-gray-400' : sel ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700 hover:bg-brand-200'}`}>
                    {c + 1}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-100" /> Available</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-600" /> Selected</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-gray-200" /> Taken</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4">
        <div>
          <p className="text-sm text-gray-500">{seats.length} seat{seats.length !== 1 ? 's' : ''} in {section.name}</p>
          {seats.length > 0 && <p className="text-xs text-gray-400">{seats.map((s) => { const [r, c] = s.split('-'); return String.fromCharCode(64 + Number(r)) + c }).join(', ')}</p>}
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-gray-900" data-testid="seat-total">{money(total)}</p>
          <button onClick={checkout} disabled={seats.length === 0} data-testid="to-checkout" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-gray-300">Checkout</button>
        </div>
      </div>
    </div>
  )
}
