import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS, CATEGORIES } from '../data/seed.js'
import { money, prettyDate } from '../lib/format.js'
import Photo from '../components/Photo.jsx'

export default function Events() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const events = useMemo(() => {
    const q = query.trim().toLowerCase()
    return EVENTS.filter((e) =>
      (!q || e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)) &&
      (cat === 'All' || e.category === cat),
    )
  }, [query, cat])

  return (
    <div>
      <div className="bg-gradient-to-r from-brand-700 to-brand-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold">Find your next night out</h1>
          <p className="mt-2 text-brand-100">Concerts, sports, theater, comedy and more — book in seconds.</p>
          <input type="search" aria-label="Search events" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artists, teams, venues, cities…" className="mt-5 w-full max-w-lg rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? 'bg-brand-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>{c}</button>
          ))}
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">No events match your search.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <Link key={e.id} to={`/event/${e.id}`} data-testid="event-card" className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md">
                <div className="relative">
                  <Photo src={`/img/events/${e.img}.jpg`} alt={e.title} label={e.title} className="h-48 w-full transition group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">{e.category}</span>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900">{e.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{e.venue} · {e.city}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-gray-400">{prettyDate(e.date)} · {e.time}</p>
                    <p className="text-sm font-bold text-gray-900">from {money(e.base)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
