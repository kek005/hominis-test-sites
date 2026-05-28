import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES, AIRLINES, generateFlights } from '../data/seed.js'
import { money } from '../lib/format.js'
import SearchWidget from '../components/SearchWidget.jsx'

const cityName = (code) => CITIES.find((c) => c.code === code)?.city || code

export default function Flights() {
  const [params] = useSearchParams()
  const from = params.get('from') || 'PAR'
  const to = params.get('to') || 'TYO'
  const depart = params.get('depart') || ''
  const pax = params.get('pax') || '1'

  const [sort, setSort] = useState('price')
  const [maxStops, setMaxStops] = useState('any')
  const [airline, setAirline] = useState('All')

  const all = useMemo(() => generateFlights(from, to, depart), [from, to, depart])
  const flights = useMemo(() => {
    let list = all.filter((f) =>
      (maxStops === 'any' || (maxStops === 'nonstop' && f.stops === 0)) &&
      (airline === 'All' || f.airline === airline),
    )
    if (sort === 'price') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'depart') list = [...list].sort((a, b) => a.depart.localeCompare(b.depart))
    if (sort === 'duration') list = [...list].sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
    return list
  }, [all, sort, maxStops, airline])

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <SearchWidget initialTab="flights" />

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{cityName(from)} → {cityName(to)}</h1>
        <p className="text-sm text-gray-500">{flights.length} flights · {pax} passenger{pax !== '1' ? 's' : ''}</p>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit space-y-4 rounded-2xl border border-gray-100 p-4">
          <div><label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Sort by</label>
            <select className={`${sel} w-full`} value={sort} onChange={(e) => setSort(e.target.value)}><option value="price">Cheapest</option><option value="depart">Earliest</option><option value="duration">Shortest</option></select>
          </div>
          <div><label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Stops</label>
            <select className={`${sel} w-full`} value={maxStops} onChange={(e) => setMaxStops(e.target.value)}><option value="any">Any</option><option value="nonstop">Nonstop only</option></select>
          </div>
          <div><label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Airline</label>
            <select className={`${sel} w-full`} value={airline} onChange={(e) => setAirline(e.target.value)}><option>All</option>{AIRLINES.map((a) => <option key={a}>{a}</option>)}</select>
          </div>
        </aside>

        <div className="space-y-3">
          {flights.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">No flights match your filters.</div>
          ) : flights.map((f) => (
            <div key={f.id} data-testid="flight-card" className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
              <div className="w-32 shrink-0">
                <p className="font-semibold text-gray-900">{f.airline}</p>
                <p className="text-xs text-gray-400">{f.flightNo}</p>
              </div>
              <div className="flex flex-1 items-center gap-4">
                <div className="text-center"><p className="text-lg font-bold text-gray-900">{f.depart}</p><p className="text-xs text-gray-400">{f.from}</p></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-400">{f.duration}</p>
                  <div className="my-1 h-px bg-gray-200" />
                  <p className="text-xs text-gray-500">{f.stops === 0 ? 'Nonstop' : `${f.stops} stop`}</p>
                </div>
                <div className="text-center"><p className="text-lg font-bold text-gray-900">{f.arrive}</p><p className="text-xs text-gray-400">{f.to}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-gray-900">{money(f.price)}</p>
                <Link to={`/flights/${f.id}/book?pax=${pax}`} data-testid="select-flight" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Select</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
