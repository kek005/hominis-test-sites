// Deterministic seed data for Showtime ticket booking.

export const CATEGORIES = ['Concert', 'Sports', 'Theater', 'Comedy', 'Festival', 'Movie']

export const EVENTS = [
  { id: 'e1', title: 'Aurora — World Tour', category: 'Concert', img: 'concert1', venue: 'Skyline Arena', city: 'New York, NY', date: '2026-07-12', time: '20:00', base: 65, blurb: 'The synth-pop sensation returns with an all-new stage production.' },
  { id: 'e2', title: 'The Midnight Echoes', category: 'Concert', img: 'concert2', venue: 'Harborfront Hall', city: 'Boston, MA', date: '2026-06-28', time: '19:30', base: 55, blurb: 'An intimate evening of indie rock anthems.' },
  { id: 'e3', title: 'City FC vs United', category: 'Sports', img: 'sports1', venue: 'Grand Stadium', city: 'Chicago, IL', date: '2026-06-20', time: '15:00', base: 40, blurb: 'Top-of-the-table clash you won\'t want to miss.' },
  { id: 'e4', title: 'Metro Hoops Finals', category: 'Sports', img: 'sports2', venue: 'Center Court', city: 'Los Angeles, CA', date: '2026-07-02', time: '18:00', base: 75, blurb: 'Championship basketball under the lights.' },
  { id: 'e5', title: 'Hamilton', category: 'Theater', img: 'theater1', venue: 'Royale Theatre', city: 'New York, NY', date: '2026-07-05', time: '19:00', base: 99, blurb: 'The award-winning musical phenomenon.' },
  { id: 'e6', title: 'A Midsummer Night\'s Dream', category: 'Theater', img: 'theater2', venue: 'Old Vic', city: 'London, UK', date: '2026-06-30', time: '19:30', base: 60, blurb: 'Shakespeare\'s beloved comedy, reimagined.' },
  { id: 'e7', title: 'Dave Quinn: Live', category: 'Comedy', img: 'comedy1', venue: 'Laugh Factory', city: 'Austin, TX', date: '2026-06-25', time: '21:00', base: 35, blurb: 'Sharp, fast, and relentlessly funny.' },
  { id: 'e8', title: 'Improv All-Stars', category: 'Comedy', img: 'comedy2', venue: 'The Annex', city: 'Seattle, WA', date: '2026-07-09', time: '20:30', base: 28, blurb: 'No script, no net — pure improvised chaos.' },
  { id: 'e9', title: 'Sunset Sounds Festival', category: 'Festival', img: 'festival1', venue: 'Riverside Park', city: 'Austin, TX', date: '2026-08-15', time: '14:00', base: 120, blurb: 'Three stages, twenty artists, one unforgettable day.' },
  { id: 'e10', title: 'Electric Bloom', category: 'Festival', img: 'festival2', venue: 'Desert Grounds', city: 'Phoenix, AZ', date: '2026-08-22', time: '16:00', base: 110, blurb: 'The dance music event of the summer.' },
  { id: 'e11', title: 'Nebula — IMAX Premiere', category: 'Movie', img: 'movie1', venue: 'Cineplex Dome', city: 'San Francisco, CA', date: '2026-06-22', time: '19:45', base: 22, blurb: 'The year\'s biggest sci-fi epic on the largest screen.' },
  { id: 'e12', title: 'Classic Noir Night', category: 'Movie', img: 'movie2', venue: 'The Rialto', city: 'Portland, OR', date: '2026-07-01', time: '20:00', base: 18, blurb: 'A double feature of restored film-noir classics.' },
  { id: 'e13', title: 'Symphonic Nights', category: 'Concert', img: 'concert3', venue: 'Concert Hall', city: 'Berlin, DE', date: '2026-07-18', time: '19:00', base: 70, blurb: 'A full orchestra performs cinematic favorites.' },
  { id: 'e14', title: 'Rivals Derby', category: 'Sports', img: 'sports3', venue: 'North Park', city: 'Manchester, UK', date: '2026-07-25', time: '16:30', base: 50, blurb: 'The fiercest rivalry in the league.' },
  { id: 'e15', title: 'The Phantom Returns', category: 'Theater', img: 'theater3', venue: 'Majestic', city: 'New York, NY', date: '2026-08-01', time: '19:30', base: 85, blurb: 'The legendary production, back by demand.' },
  { id: 'e16', title: 'Late Night Laughs Tour', category: 'Comedy', img: 'comedy3', venue: 'Civic Theatre', city: 'Denver, CO', date: '2026-07-14', time: '20:00', base: 42, blurb: 'Four headliners, one big night of comedy.' },
]

// Price tiers (sections) derived from the event base price.
export function sectionsFor(event) {
  return [
    { id: 'ga', name: 'General Admission', price: event.base, color: '#94a3b8' },
    { id: 'lower', name: 'Lower Tier', price: Math.round(event.base * 1.8), color: '#e11d48' },
    { id: 'vip', name: 'VIP / Front', price: Math.round(event.base * 3), color: '#7c3aed' },
  ]
}

// Deterministic taken-seat set per event+section.
export function takenSeats(eventId, sectionId, rows, cols) {
  const seed = (eventId + sectionId).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const set = new Set()
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if ((seed + r * 5 + c * 3) % 4 === 0) set.add(`${r + 1}-${c + 1}`)
  }
  return set
}

export const SEED_ORDERS = [
  { code: 'SHW-44021', eventId: 'e5', eventTitle: 'Hamilton', date: '2026-04-18', section: 'Lower Tier', seats: ['3-5', '3-6'], qty: 2, total: 356, status: 'Upcoming' },
]
