import { Link } from 'react-router-dom'
import { EVENTS } from '../data/seed.js'
import { useStore } from '../lib/store.jsx'
import { money, prettyDate } from '../lib/format.js'

const seatLabel = (s) => { const [r, c] = s.split('-'); return String.fromCharCode(64 + Number(r)) + c }

export default function MyTickets() {
  const { orders } = useStore()

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No tickets yet</h1>
        <p className="mt-2 text-gray-500">When you book an event, your tickets show up here.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse events</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My tickets</h1>
      <div className="space-y-4">
        {orders.map((o) => {
          const event = EVENTS.find((e) => e.id === o.eventId)
          return (
            <div key={o.code} data-testid="ticket-row" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-5">
              <div>
                <p className="font-semibold text-gray-900">{o.eventTitle}</p>
                <p className="text-sm text-gray-500">{event ? `${event.venue} · ${prettyDate(event.date)}` : o.date}</p>
                <p className="mt-1 text-xs text-gray-400">{o.section} · {o.seats?.map(seatLabel).join(', ')} · Ref {o.code}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{o.status}</span>
                <p className="mt-1 font-bold text-gray-900">{money(o.total)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
