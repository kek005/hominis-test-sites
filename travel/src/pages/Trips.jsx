import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

const statusColor = {
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Completed: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-700',
}

export default function Trips() {
  const { trips } = useStore()

  if (trips.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No trips yet</h1>
        <p className="mt-2 text-gray-500">Book a flight or hotel and it'll show up here.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Start planning</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My trips</h1>
      <div className="space-y-4">
        {trips.map((t) => (
          <div key={t.ref} data-testid="trip-row" className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-lg">{t.type === 'flight' ? '✈' : '🏨'}</span>
                <div>
                  <p className="font-semibold text-gray-900">{t.summary}</p>
                  <p className="text-sm text-gray-500">{t.detail}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[t.status] || 'bg-gray-100 text-gray-600'}`}>{t.status}</span>
                <p className="mt-1 font-bold text-gray-900">{money(t.total)}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">Ref {t.ref} · booked {t.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
