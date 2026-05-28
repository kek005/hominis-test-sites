import { Link, useLocation, useParams } from 'react-router-dom'
import { EVENTS } from '../data/seed.js'
import { useStore } from '../lib/store.jsx'
import { money, prettyDate } from '../lib/format.js'

const seatLabel = (s) => { const [r, c] = s.split('-'); return String.fromCharCode(64 + Number(r)) + c }

export default function Confirmation() {
  const { code } = useParams()
  const location = useLocation()
  const { orders } = useStore()
  const order = location.state?.order || orders.find((o) => o.code === code)
  const event = location.state?.event || (order && EVENTS.find((e) => e.id === order.eventId))

  return (
    <div className="mx-auto max-w-md px-4 py-12 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✓</div>
      <h1 className="text-2xl font-bold text-gray-900">You're going!</h1>
      <p className="mt-2 text-gray-600">Your tickets are confirmed. A receipt has been emailed to you.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white text-left">
        <div className="bg-brand-600 p-5 text-white">
          <p className="text-sm text-brand-100">{order?.section}</p>
          <p className="text-lg font-bold">{order?.eventTitle}</p>
          {event && <p className="text-sm text-brand-100">{event.venue} · {prettyDate(event.date)} · {event.time}</p>}
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500">Seats</p>
          <p className="font-medium text-gray-900">{order?.seats?.map(seatLabel).join(', ')}</p>
          <div className="my-4 grid place-items-center">
            {/* Synthetic scannable code */}
            <div className="grid grid-cols-8 gap-0.5" aria-label="Ticket code">
              {Array.from({ length: 64 }).map((_, i) => (
                <span key={i} className={`h-2 w-2 ${((code || '').charCodeAt(i % (code?.length || 1)) + i) % 2 ? 'bg-gray-900' : 'bg-white'}`} />
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400">Confirmation <span data-testid="order-code" className="font-mono font-semibold text-gray-700">{code}</span></p>
          <p className="mt-2 text-center text-lg font-bold text-gray-900">{money(order?.total || 0)}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/tickets" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">My tickets</Link>
        <Link to="/" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Browse more</Link>
      </div>
    </div>
  )
}
