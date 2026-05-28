import { Link, useLocation, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

export default function Confirmation() {
  const { ref } = useParams()
  const location = useLocation()
  const { trips } = useStore()
  const trip = location.state?.trip || trips.find((t) => t.ref === ref)

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✓</div>
      <h1 className="text-2xl font-bold text-gray-900">Booking confirmed!</h1>
      <p className="mt-2 text-gray-600">Your confirmation reference is <span data-testid="booking-ref" className="font-mono font-semibold text-gray-900">{ref}</span>.</p>

      {trip && (
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-gray-100 bg-white p-5 text-left">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{trip.type}</p>
          <p className="mt-1 font-semibold text-gray-900">{trip.summary}</p>
          <p className="text-sm text-gray-600">{trip.detail}</p>
          <p className="mt-3 text-right text-lg font-bold text-gray-900">{money(trip.total)}</p>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/trips" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">View my trips</Link>
        <Link to="/" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Back home</Link>
      </div>
    </div>
  )
}
