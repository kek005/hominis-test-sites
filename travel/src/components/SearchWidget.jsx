import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CITIES } from '../data/seed.js'

const today = new Date()
const plusDays = (n) => new Date(today.getTime() + n * 86400000).toISOString().slice(0, 10)

export default function SearchWidget({ initialTab = 'flights' }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState(initialTab)
  const [flight, setFlight] = useState({ from: 'PAR', to: 'TYO', depart: plusDays(14), ret: plusDays(21), pax: 1 })
  const [hotel, setHotel] = useState({ city: 'TYO', checkin: plusDays(14), checkout: plusDays(18), guests: 2 })

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  const searchFlights = () => {
    const p = new URLSearchParams({ from: flight.from, to: flight.to, depart: flight.depart, ret: flight.ret, pax: String(flight.pax) })
    navigate(`/flights?${p}`)
  }
  const searchHotels = () => {
    const p = new URLSearchParams({ city: hotel.city, checkin: hotel.checkin, checkout: hotel.checkout, guests: String(hotel.guests) })
    navigate(`/hotels?${p}`)
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg">
      <div className="mb-3 flex gap-2">
        {['flights', 'hotels'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${tab === t ? 'bg-brand-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            {t === 'flights' ? '✈ Flights' : '🏨 Hotels'}
          </button>
        ))}
      </div>

      {tab === 'flights' ? (
        <div className="grid gap-3 sm:grid-cols-5">
          <label className="block sm:col-span-1"><span className="mb-1 block text-xs font-medium text-gray-500">From</span>
            <select aria-label="From" className={input} value={flight.from} onChange={(e) => setFlight((f) => ({ ...f, from: e.target.value }))}>{CITIES.map((c) => <option key={c.code} value={c.code}>{c.city} ({c.code})</option>)}</select>
          </label>
          <label className="block sm:col-span-1"><span className="mb-1 block text-xs font-medium text-gray-500">To</span>
            <select aria-label="To" className={input} value={flight.to} onChange={(e) => setFlight((f) => ({ ...f, to: e.target.value }))}>{CITIES.map((c) => <option key={c.code} value={c.code}>{c.city} ({c.code})</option>)}</select>
          </label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Depart</span><input type="date" aria-label="Depart" className={input} value={flight.depart} onChange={(e) => setFlight((f) => ({ ...f, depart: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Return</span><input type="date" aria-label="Return" className={input} value={flight.ret} onChange={(e) => setFlight((f) => ({ ...f, ret: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Passengers</span>
            <select aria-label="Passengers" className={input} value={flight.pax} onChange={(e) => setFlight((f) => ({ ...f, pax: Number(e.target.value) }))}>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}</select>
          </label>
          <button onClick={searchFlights} data-testid="search-flights" className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700 sm:col-span-5">Search flights</button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-4">
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Destination</span>
            <select aria-label="Destination" className={input} value={hotel.city} onChange={(e) => setHotel((h) => ({ ...h, city: e.target.value }))}>{CITIES.map((c) => <option key={c.code} value={c.code}>{c.city}</option>)}</select>
          </label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Check-in</span><input type="date" aria-label="Check-in" className={input} value={hotel.checkin} onChange={(e) => setHotel((h) => ({ ...h, checkin: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Check-out</span><input type="date" aria-label="Check-out" className={input} value={hotel.checkout} onChange={(e) => setHotel((h) => ({ ...h, checkout: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-gray-500">Guests</span>
            <select aria-label="Guests" className={input} value={hotel.guests} onChange={(e) => setHotel((h) => ({ ...h, guests: Number(e.target.value) }))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}</select>
          </label>
          <button onClick={searchHotels} data-testid="search-hotels" className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700 sm:col-span-4">Search hotels</button>
        </div>
      )}
    </div>
  )
}
