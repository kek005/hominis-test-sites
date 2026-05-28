import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { HOTELS, roomsFor } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import Photo from '../components/Photo.jsx'

export default function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { addTrip } = useStore()
  const hotel = HOTELS.find((h) => h.id === id)
  const [nights, setNights] = useState(4)

  if (!hotel) return <Navigate to="/hotels" replace />
  const rooms = roomsFor(hotel)

  const book = (room) => {
    const total = room.price * nights
    const rec = addTrip({
      type: 'hotel',
      summary: `${hotel.name}, ${hotel.city}`,
      detail: `${room.name} · ${nights} night${nights > 1 ? 's' : ''} · ${money(room.price)}/night`,
      total,
    })
    toast.show('Hotel booked')
    navigate(`/confirmation/${rec.ref}`, { state: { trip: rec } })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/hotels" className="text-sm text-gray-500 hover:text-gray-900">← Hotels</Link>
      <Photo src={`/img/hotels/${hotel.img}.jpg`} alt={hotel.name} label={hotel.name} className="mt-3 h-72 w-full rounded-2xl" />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
          <p className="text-gray-500">{hotel.area}, {hotel.city} · {'★'.repeat(hotel.stars)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hotel.amenities.map((a) => <span key={a} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{a}</span>)}
          </div>
        </div>
        <div className="rounded-xl bg-brand-50 px-4 py-2 text-center">
          <p className="text-2xl font-bold text-brand-700">{hotel.rating}</p>
          <p className="text-xs text-gray-500">{hotel.reviews} reviews</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Nights</label>
        <select value={nights} onChange={(e) => setNights(Number(e.target.value))} className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" aria-label="Nights">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Choose a room</h2>
      <div className="mt-3 space-y-3">
        {rooms.map((room) => (
          <div key={room.id} data-testid="room-row" className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4">
            <div>
              <p className="font-semibold text-gray-900">{room.name}</p>
              <p className="text-sm text-gray-500">{room.desc}</p>
              <div className="mt-1 flex flex-wrap gap-2">{room.perks.map((p) => <span key={p} className="text-xs text-emerald-600">✓ {p}</span>)}</div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{money(room.price)}<span className="text-xs font-normal text-gray-400"> /night</span></p>
              <p className="text-xs text-gray-400">{money(room.price * nights)} total</p>
              <button onClick={() => book(room)} data-testid="book-room" className="mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Book room</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
