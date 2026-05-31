// Deterministic seed data for Hearth real estate.

export const TYPES = ['House', 'Condo', 'Townhouse', 'Apartment', 'Land']
export const CITIES = ['Austin, TX', 'Seattle, WA', 'Brooklyn, NY', 'Denver, CO', 'Asheville, NC', 'Portland, OR', 'Boulder, CO', 'Boston, MA']
export const STATUSES = ['For sale', 'Pending', 'New listing']

export const AGENTS = [
  { id: 'ag1', name: 'Olivia Sterling', avatar: 8, phone: '(415) 555-0188', email: 'olivia@hearth.test' },
  { id: 'ag2', name: 'Marcus Hale', avatar: 12, phone: '(206) 555-0142', email: 'marcus@hearth.test' },
  { id: 'ag3', name: 'Priya Khatri', avatar: 5, phone: '(212) 555-0123', email: 'priya@hearth.test' },
  { id: 'ag4', name: 'Daniel Frost', avatar: 14, phone: '(303) 555-0166', email: 'daniel@hearth.test' },
]

export const PROPERTIES = [
  { id: 'h1', title: 'Sunlit Craftsman bungalow', address: '1245 Maplewood Ave', city: 'Austin, TX', type: 'House', price: 685000, beds: 3, baths: 2, sqft: 1820, lot: 6500, year: 2002, status: 'For sale', img: 'house1', agentId: 'ag1', features: ['Front porch', 'Updated kitchen', 'Hardwood floors', 'Two-car garage', 'Fenced yard'], desc: 'Light-filled Craftsman on a quiet tree-lined street, walking distance to coffee shops and parks.' },
  { id: 'h2', title: 'Modern downtown loft', address: '88 Pike St, Unit 1402', city: 'Seattle, WA', type: 'Condo', price: 540000, beds: 1, baths: 1, sqft: 920, lot: 0, year: 2018, status: 'For sale', img: 'condo1', agentId: 'ag2', features: ['Floor-to-ceiling windows', 'Concierge', 'Gym', 'Rooftop deck'], desc: 'A stunning corner loft with skyline views, steps from the market and waterfront.' },
  { id: 'h3', title: 'Brownstone with garden', address: '420 Hicks St', city: 'Brooklyn, NY', type: 'Townhouse', price: 1850000, beds: 4, baths: 3.5, sqft: 3200, lot: 1800, year: 1898, status: 'For sale', img: 'house2', agentId: 'ag3', features: ['Original moldings', 'Chef\'s kitchen', 'South-facing garden', 'Wood-burning fireplace'], desc: 'Classic brownstone meticulously restored — original details and modern systems throughout.' },
  { id: 'h4', title: 'Mountain-view modern', address: '52 Boulder Crest', city: 'Boulder, CO', type: 'House', price: 1295000, beds: 4, baths: 3, sqft: 2900, lot: 9800, year: 2015, status: 'New listing', img: 'house3', agentId: 'ag4', features: ['Vaulted ceilings', 'Solar', 'Three-car garage', 'Heated floors'], desc: 'Architect-designed home with sweeping flatirons views and energy-efficient systems.' },
  { id: 'h5', title: 'Quaint cottage near the Blue Ridge', address: '8 Birch Lane', city: 'Asheville, NC', type: 'House', price: 420000, beds: 2, baths: 1, sqft: 1100, lot: 7200, year: 1976, status: 'For sale', img: 'house4', agentId: 'ag1', features: ['Wraparound porch', 'Wood stove', 'Garden beds', 'New roof'], desc: 'A charming retreat tucked at the foot of the mountains — perfect weekend escape or full-time home.' },
  { id: 'h6', title: 'Pearl District condo', address: '320 NW 11th Ave, #604', city: 'Portland, OR', type: 'Condo', price: 615000, beds: 2, baths: 2, sqft: 1280, lot: 0, year: 2008, status: 'For sale', img: 'condo2', agentId: 'ag2', features: ['Open floor plan', 'Balcony', 'Bike storage', 'Pet friendly'], desc: 'Modern condo in the heart of the Pearl with restaurants, parks, and the streetcar at your door.' },
  { id: 'h7', title: 'Updated mid-century', address: '301 Larimer Pl', city: 'Denver, CO', type: 'House', price: 825000, beds: 3, baths: 2, sqft: 1980, lot: 7100, year: 1962, status: 'For sale', img: 'house5', agentId: 'ag4', features: ['Open beams', 'Walls of glass', 'Den/office', 'Mature trees'], desc: 'A tastefully updated mid-century with a great-room floor plan and abundant natural light.' },
  { id: 'h8', title: 'Back Bay garden apartment', address: '160 Commonwealth Ave', city: 'Boston, MA', type: 'Apartment', price: 1150000, beds: 2, baths: 2, sqft: 1400, lot: 0, year: 1905, status: 'Pending', img: 'condo3', agentId: 'ag3', features: ['High ceilings', 'Crown molding', 'Common roof deck', 'Storage'], desc: 'Elegant pre-war apartment on a coveted Back Bay block, freshly painted and move-in ready.' },
  { id: 'h9', title: 'Lake-view A-frame', address: '4 Cedar Bay', city: 'Seattle, WA', type: 'House', price: 1650000, beds: 4, baths: 3, sqft: 2750, lot: 12500, year: 1999, status: 'For sale', img: 'house6', agentId: 'ag2', features: ['Private dock', 'Hot tub', 'Open kitchen', 'Loft office'], desc: 'A relaxed A-frame with year-round lake access and an entertainer\'s great room.' },
  { id: 'h10', title: 'Cozy first-floor condo', address: '215 N 4th St, #1A', city: 'Brooklyn, NY', type: 'Condo', price: 525000, beds: 1, baths: 1, sqft: 720, lot: 0, year: 2012, status: 'For sale', img: 'condo4', agentId: 'ag3', features: ['Exposed brick', 'In-unit laundry', 'Live/work zoning', 'Bike room'], desc: 'A bright Williamsburg condo with industrial details and a walk-to-everything location.' },
  { id: 'h11', title: 'Townhome with rooftop deck', address: '900 E 5th St', city: 'Austin, TX', type: 'Townhouse', price: 595000, beds: 3, baths: 2.5, sqft: 1650, lot: 1200, year: 2020, status: 'For sale', img: 'house7', agentId: 'ag1', features: ['Rooftop deck', 'Two-car garage', 'Smart home', 'EV charger'], desc: 'A nearly-new townhome with downtown views from the private rooftop deck.' },
  { id: 'h12', title: 'Family home on a corner lot', address: '8800 Eastview Dr', city: 'Denver, CO', type: 'House', price: 745000, beds: 4, baths: 3, sqft: 2400, lot: 8500, year: 1998, status: 'For sale', img: 'house8', agentId: 'ag4', features: ['Finished basement', 'Office', 'Eat-in kitchen', 'Wood deck'], desc: 'Spacious family home with thoughtful updates throughout — flexible layout for any lifestyle.' },
  { id: 'h13', title: 'Studio with city views', address: '500 NW Hoyt St, #2008', city: 'Portland, OR', type: 'Condo', price: 365000, beds: 0, baths: 1, sqft: 540, lot: 0, year: 2017, status: 'For sale', img: 'condo5', agentId: 'ag2', features: ['Murphy bed', 'In-unit laundry', 'Gym', 'Walk to MAX'], desc: 'A turn-key urban studio with smart storage and a south-facing window wall.' },
  { id: 'h14', title: 'Hill country acreage', address: 'Lot 7, FM 1431', city: 'Austin, TX', type: 'Land', price: 285000, beds: 0, baths: 0, sqft: 0, lot: 87120, year: null, status: 'For sale', img: 'land1', agentId: 'ag1', features: ['Live oaks', 'Seasonal creek', 'Build-ready', 'Hill country views'], desc: 'Two beautiful acres ready for your dream home, with easy access to town and trails.' },
  { id: 'h15', title: 'Charlestown townhouse', address: '17 Monument Ave', city: 'Boston, MA', type: 'Townhouse', price: 1095000, beds: 3, baths: 2.5, sqft: 2100, lot: 1000, year: 1872, status: 'New listing', img: 'house9', agentId: 'ag3', features: ['Original floors', 'Chef\'s kitchen', 'Garden patio', 'Two-car parking'], desc: 'Historic Charlestown townhouse blocks from the Navy Yard, freshly renovated kitchen and baths.' },
  { id: 'h16', title: 'Modern mountain retreat', address: '210 Aspen Way', city: 'Asheville, NC', type: 'House', price: 925000, beds: 3, baths: 2, sqft: 2200, lot: 21780, year: 2021, status: 'For sale', img: 'house10', agentId: 'ag4', features: ['Floor-to-ceiling windows', 'Wraparound deck', 'EV charger', 'Mini-split HVAC'], desc: 'A serene contemporary perched on half an acre, with hot tub and big-sky mountain views.' },
]

// Mortgage payment helper: monthly principal & interest.
export function monthlyPI(price, downPct, rate, years) {
  const principal = price * (1 - downPct / 100)
  const r = (rate / 100) / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

export const DEFAULT_MORTGAGE = { downPct: 20, rate: 6.5, years: 30 }
