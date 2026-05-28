// Deterministic seed data for Voyage travel booking.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Alex Traveler' }

export const CITIES = [
  { code: 'PAR', city: 'Paris', country: 'France', img: 'paris', blurb: 'Cafés, art, and the Eiffel Tower.' },
  { code: 'TYO', city: 'Tokyo', country: 'Japan', img: 'tokyo', blurb: 'Neon nights and ancient shrines.' },
  { code: 'NYC', city: 'New York', country: 'USA', img: 'newyork', blurb: 'The city that never sleeps.' },
  { code: 'ROM', city: 'Rome', country: 'Italy', img: 'rome', blurb: 'Ruins, pasta, and piazzas.' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', img: 'barcelona', blurb: 'Gaudí, beaches, and tapas.' },
  { code: 'LON', city: 'London', country: 'UK', img: 'london', blurb: 'History meets the modern.' },
  { code: 'DXB', city: 'Dubai', country: 'UAE', img: 'dubai', blurb: 'Sky-high luxury in the desert.' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', img: 'sydney', blurb: 'Harbour views and golden sand.' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', img: 'bangkok', blurb: 'Street food and gilded temples.' },
  { code: 'CPT', city: 'Cape Town', country: 'South Africa', img: 'capetown', blurb: 'Mountains meet the sea.' },
]

export const AIRLINES = ['Voyage Air', 'Skyline', 'Atlas Airways', 'Nimbus Jet', 'Aurora Air', 'Meridian Wings']

const TIMES = ['06:10', '08:45', '11:20', '13:05', '15:40', '18:15', '20:50', '22:30']

// Deterministic flight list for a route, derived from the city codes.
export function generateFlights(fromCode, toCode, date) {
  const seed = (fromCode + toCode).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return Array.from({ length: 6 }).map((_, i) => {
    const k = seed + i * 17
    const dep = TIMES[(k) % TIMES.length]
    const durH = 2 + ((k * 3) % 11)
    const durM = (k * 13) % 60
    const stops = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 0
    const price = 120 + ((k * 7) % 760)
    const airline = AIRLINES[k % AIRLINES.length]
    const [dh, dm] = dep.split(':').map(Number)
    const arrTotal = (dh * 60 + dm + durH * 60 + durM) % (24 * 60)
    const arr = `${String(Math.floor(arrTotal / 60)).padStart(2, '0')}:${String(arrTotal % 60).padStart(2, '0')}`
    return {
      id: `${fromCode}${toCode}-${i}`,
      airline,
      flightNo: airline.split(' ')[0].slice(0, 2).toUpperCase() + (100 + ((k * 9) % 899)),
      from: fromCode, to: toCode, date,
      depart: dep, arrive: arr,
      duration: `${durH}h ${durM}m`,
      stops,
      price,
      cabin: 'Economy',
    }
  }).sort((a, b) => a.price - b.price)
}

export const HOTELS = [
  { id: 'h1', name: 'Hôtel Lumière', cityCode: 'PAR', city: 'Paris', img: 'hotel1', rating: 4.7, reviews: 1284, price: 210, stars: 5, area: 'Le Marais', amenities: ['Free WiFi', 'Breakfast', 'Spa', 'Bar'] },
  { id: 'h2', name: 'Seine Boutique', cityCode: 'PAR', city: 'Paris', img: 'hotel2', rating: 4.4, reviews: 642, price: 145, stars: 4, area: 'Latin Quarter', amenities: ['Free WiFi', 'Pet friendly'] },
  { id: 'h3', name: 'Shibuya Sky Hotel', cityCode: 'TYO', city: 'Tokyo', img: 'hotel3', rating: 4.6, reviews: 980, price: 175, stars: 4, area: 'Shibuya', amenities: ['Free WiFi', 'Gym', 'Onsen'] },
  { id: 'h4', name: 'Ginza Mandarin', cityCode: 'TYO', city: 'Tokyo', img: 'hotel4', rating: 4.9, reviews: 510, price: 320, stars: 5, area: 'Ginza', amenities: ['Free WiFi', 'Spa', 'Fine dining', 'Pool'] },
  { id: 'h5', name: 'Manhattan Grand', cityCode: 'NYC', city: 'New York', img: 'hotel5', rating: 4.3, reviews: 2103, price: 260, stars: 4, area: 'Midtown', amenities: ['Free WiFi', 'Gym', 'Bar'] },
  { id: 'h6', name: 'Brooklyn Loft Stay', cityCode: 'NYC', city: 'New York', img: 'hotel6', rating: 4.5, reviews: 744, price: 190, stars: 3, area: 'Williamsburg', amenities: ['Free WiFi', 'Kitchen', 'Rooftop'] },
  { id: 'h7', name: 'Roma Antica Suites', cityCode: 'ROM', city: 'Rome', img: 'hotel7', rating: 4.6, reviews: 856, price: 165, stars: 4, area: 'Trastevere', amenities: ['Free WiFi', 'Breakfast', 'Terrace'] },
  { id: 'h8', name: 'Barceló Marina', cityCode: 'BCN', city: 'Barcelona', img: 'hotel8', rating: 4.5, reviews: 1320, price: 155, stars: 4, area: 'Barceloneta', amenities: ['Free WiFi', 'Pool', 'Beach access'] },
  { id: 'h9', name: 'The Thames Court', cityCode: 'LON', city: 'London', img: 'hotel9', rating: 4.4, reviews: 1675, price: 230, stars: 4, area: 'Westminster', amenities: ['Free WiFi', 'Bar', 'Gym'] },
  { id: 'h10', name: 'Palm Desert Resort', cityCode: 'DXB', city: 'Dubai', img: 'hotel10', rating: 4.8, reviews: 990, price: 340, stars: 5, area: 'Palm Jumeirah', amenities: ['Free WiFi', 'Pool', 'Spa', 'Private beach'] },
  { id: 'h11', name: 'Harbour View Sydney', cityCode: 'SYD', city: 'Sydney', img: 'hotel11', rating: 4.6, reviews: 612, price: 245, stars: 4, area: 'Circular Quay', amenities: ['Free WiFi', 'Pool', 'Harbour view'] },
  { id: 'h12', name: 'Table Mountain Lodge', cityCode: 'CPT', city: 'Cape Town', img: 'hotel12', rating: 4.7, reviews: 433, price: 130, stars: 4, area: 'City Bowl', amenities: ['Free WiFi', 'Breakfast', 'Mountain view'] },
]

export function roomsFor(hotel) {
  return [
    { id: 'standard', name: 'Standard Room', price: hotel.price, desc: '1 queen bed · 22 m² · city view', perks: ['Free cancellation'] },
    { id: 'deluxe', name: 'Deluxe Room', price: Math.round(hotel.price * 1.35), desc: '1 king bed · 30 m² · premium view', perks: ['Free cancellation', 'Breakfast included'] },
    { id: 'suite', name: 'Junior Suite', price: Math.round(hotel.price * 1.9), desc: 'King bed + lounge · 45 m²', perks: ['Free cancellation', 'Breakfast included', 'Lounge access'] },
  ]
}

export const SEED_TRIPS = [
  {
    ref: 'VYG-88120', type: 'flight', date: '2026-04-02',
    summary: 'Paris (PAR) → Rome (ROM)', detail: 'Voyage Air VA204 · 08:45 → 10:55 · 1 passenger',
    total: 168, status: 'Completed',
  },
]
