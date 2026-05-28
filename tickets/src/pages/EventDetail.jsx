import { Link, useParams } from 'react-router-dom'
import { EVENTS, sectionsFor } from '../data/seed.js'
import { money, prettyDate } from '../lib/format.js'
import Photo from '../components/Photo.jsx'

export default function EventDetail() {
  const { id } = useParams()
  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-gray-700">Event not found.</p>
        <Link to="/" className="mt-2 inline-block text-brand-600 hover:underline">Back to events</Link>
      </div>
    )
  }

  const sections = sectionsFor(event)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← All events</Link>
      <div className="mt-3 grid gap-6 md:grid-cols-2">
        <Photo src={`/img/events/${event.img}.jpg`} alt={event.title} label={event.title} className="h-72 w-full rounded-2xl" />
        <div>
          <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{event.category}</span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{event.title}</h1>
          <p className="mt-2 text-gray-600">{event.blurb}</p>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex gap-2"><dt className="w-20 text-gray-400">Venue</dt><dd className="font-medium text-gray-900">{event.venue}</dd></div>
            <div className="flex gap-2"><dt className="w-20 text-gray-400">Location</dt><dd className="text-gray-700">{event.city}</dd></div>
            <div className="flex gap-2"><dt className="w-20 text-gray-400">Date</dt><dd className="text-gray-700">{prettyDate(event.date)} · {event.time}</dd></div>
          </dl>
          <Link to={`/event/${event.id}/seats`} data-testid="get-tickets" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Get tickets</Link>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-gray-900">Price tiers</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <div key={s.id} className="rounded-2xl border border-gray-100 bg-white p-5">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: s.color }} />
            <p className="mt-2 font-semibold text-gray-900">{s.name}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{money(s.price)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
