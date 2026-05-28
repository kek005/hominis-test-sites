// Deterministic seed data for Nimbus Store. No randomness — re-seeding always
// produces the same catalog so test scenarios are reproducible.

export const CATEGORIES = [
  'Audio', 'Wearables', 'Home', 'Accessories', 'Cameras',
  'Gaming', 'Office', 'Outdoors', 'Kitchen', 'Phones',
]

export const BRANDS = ['Nimbus', 'Aurora', 'Pulse', 'Vista', 'Halo', 'Drift', 'Summit', 'Echo', 'Comet', 'Orbit']

// price < was  => on sale. tags drive the New Arrivals / Bestseller rails.
export const PRODUCTS = [
  { id: 'p1', name: 'Aurora Wireless Headphones', category: 'Audio', brand: 'Aurora', price: 169.0, was: 199.0, rating: 4.6, reviews: 482, stock: 24, blurb: 'Over-ear noise-cancelling headphones with 30-hour battery.', color: '#6366f1', tags: ['bestseller'] },
  { id: 'p2', name: 'Pulse Bluetooth Earbuds', category: 'Audio', brand: 'Pulse', price: 89.0, rating: 4.3, reviews: 1203, stock: 60, blurb: 'Compact earbuds with wireless charging case.', color: '#0ea5e9', tags: ['bestseller'] },
  { id: 'p3', name: 'Nimbus Smartwatch S2', category: 'Wearables', brand: 'Nimbus', price: 249.0, rating: 4.7, reviews: 356, stock: 12, blurb: 'AMOLED fitness watch with GPS and ECG.', color: '#10b981', tags: ['new'] },
  { id: 'p4', name: 'Trailband Fitness Tracker', category: 'Wearables', brand: 'Summit', price: 49.0, was: 59.0, rating: 4.1, reviews: 902, stock: 0, blurb: 'Slim activity band with 7-day battery.', color: '#f59e0b' },
  { id: 'p5', name: 'Ember Smart Mug', category: 'Kitchen', brand: 'Halo', price: 99.0, rating: 4.4, reviews: 211, stock: 33, blurb: 'Temperature-controlled mug, app connected.', color: '#ef4444' },
  { id: 'p6', name: 'Halo Desk Lamp', category: 'Home', brand: 'Halo', price: 59.0, was: 74.0, rating: 4.5, reviews: 178, stock: 18, blurb: 'Dimmable LED lamp with wireless charging base.', color: '#eab308', tags: ['sale'] },
  { id: 'p7', name: 'Cumulus Bluetooth Speaker', category: 'Audio', brand: 'Echo', price: 129.0, rating: 4.5, reviews: 640, stock: 27, blurb: '360° sound, waterproof, 20-hour playtime.', color: '#8b5cf6' },
  { id: 'p8', name: 'Vista 4K Action Camera', category: 'Cameras', brand: 'Vista', price: 299.0, was: 329.0, rating: 4.8, reviews: 297, stock: 9, blurb: 'Waterproof 4K60 action cam with stabilization.', color: '#06b6d4', tags: ['bestseller'] },
  { id: 'p9', name: 'Lens Pro Webcam', category: 'Cameras', brand: 'Vista', price: 119.0, rating: 4.2, reviews: 421, stock: 41, blurb: '1080p webcam with auto-framing and privacy shutter.', color: '#3b82f6' },
  { id: 'p10', name: 'Stratus Laptop Sleeve', category: 'Accessories', brand: 'Drift', price: 39.0, rating: 4.0, reviews: 88, stock: 88, blurb: 'Water-resistant 14" sleeve with accessory pocket.', color: '#64748b' },
  { id: 'p11', name: 'Drift USB-C Hub', category: 'Accessories', brand: 'Drift', price: 49.0, rating: 4.3, reviews: 512, stock: 54, blurb: '7-in-1 hub: HDMI, USB-A, SD, 100W passthrough.', color: '#475569', tags: ['bestseller'] },
  { id: 'p12', name: 'Comet Mechanical Keyboard', category: 'Office', brand: 'Comet', price: 139.0, rating: 4.7, reviews: 733, stock: 16, blurb: 'Hot-swappable 75% board with PBT keycaps.', color: '#ec4899', tags: ['new'] },
  { id: 'p13', name: 'Orbit Wireless Mouse', category: 'Office', brand: 'Orbit', price: 45.0, rating: 4.4, reviews: 994, stock: 72, blurb: 'Ergonomic silent-click mouse, USB-C.', color: '#14b8a6' },
  { id: 'p14', name: 'Solace Sleep Headband', category: 'Wearables', brand: 'Halo', price: 79.0, rating: 3.9, reviews: 64, stock: 21, blurb: 'Sleep tracking headband with soothing audio.', color: '#a855f7' },
  { id: 'p15', name: 'Breeze Smart Fan', category: 'Home', brand: 'Nimbus', price: 139.0, was: 159.0, rating: 4.2, reviews: 142, stock: 7, blurb: 'Bladeless oscillating fan with air quality sensor.', color: '#22c55e', tags: ['sale'] },
  { id: 'p16', name: 'Glow Ring Light', category: 'Cameras', brand: 'Halo', price: 65.0, rating: 4.1, reviews: 203, stock: 0, blurb: '18" bicolor ring light with phone mount.', color: '#f97316' },
  { id: 'p17', name: 'Nimbus Power Bank 20K', category: 'Accessories', brand: 'Nimbus', price: 55.0, rating: 4.6, reviews: 1502, stock: 95, blurb: '20,000mAh fast-charge bank with display.', color: '#0d9488', tags: ['bestseller'] },
  { id: 'p18', name: 'Echo Studio Microphone', category: 'Audio', brand: 'Echo', price: 149.0, rating: 4.5, reviews: 318, stock: 13, blurb: 'USB condenser mic with shock mount.', color: '#7c3aed' },
  { id: 'p19', name: 'Summit Travel Backpack', category: 'Outdoors', brand: 'Summit', price: 119.0, rating: 4.7, reviews: 877, stock: 29, blurb: '28L anti-theft backpack with USB port.', color: '#1e293b', tags: ['bestseller'] },
  { id: 'p20', name: 'Frost Mini Projector', category: 'Home', brand: 'Vista', price: 199.0, was: 219.0, rating: 4.0, reviews: 156, stock: 5, blurb: '1080p portable projector with built-in speaker.', color: '#2563eb', tags: ['sale'] },
  { id: 'p21', name: 'Pulse Pro ANC Earbuds', category: 'Audio', brand: 'Pulse', price: 159.0, rating: 4.6, reviews: 540, stock: 38, blurb: 'Flagship earbuds with adaptive noise cancelling.', color: '#0284c7', tags: ['new'] },
  { id: 'p22', name: 'Nimbus Watch SE', category: 'Wearables', brand: 'Nimbus', price: 149.0, was: 179.0, rating: 4.3, reviews: 289, stock: 44, blurb: 'Everyday smartwatch with 5-day battery.', color: '#16a34a', tags: ['sale'] },
  { id: 'p23', name: 'Aurora Soundbar 2.1', category: 'Audio', brand: 'Aurora', price: 219.0, rating: 4.4, reviews: 167, stock: 19, blurb: 'Compact soundbar with wireless subwoofer.', color: '#4f46e5' },
  { id: 'p24', name: 'Vista Mirrorless Camera', category: 'Cameras', brand: 'Vista', price: 899.0, rating: 4.9, reviews: 132, stock: 6, blurb: '24MP mirrorless body with 4K video.', color: '#0891b2', tags: ['new'] },
  { id: 'p25', name: 'Vista 50mm Prime Lens', category: 'Cameras', brand: 'Vista', price: 229.0, rating: 4.8, reviews: 98, stock: 22, blurb: 'Fast f/1.8 prime for portraits.', color: '#155e75' },
  { id: 'p26', name: 'Comet Low-Profile Keyboard', category: 'Office', brand: 'Comet', price: 109.0, rating: 4.5, reviews: 254, stock: 31, blurb: 'Slim wireless keyboard, multi-device.', color: '#db2777' },
  { id: 'p27', name: 'Orbit Vertical Mouse', category: 'Office', brand: 'Orbit', price: 59.0, rating: 4.3, reviews: 187, stock: 47, blurb: 'Ergonomic vertical mouse for wrist comfort.', color: '#0f766e' },
  { id: 'p28', name: 'Halo Monitor Light Bar', category: 'Office', brand: 'Halo', price: 89.0, was: 99.0, rating: 4.6, reviews: 376, stock: 28, blurb: 'Asymmetric desk light that clips to your monitor.', color: '#ca8a04', tags: ['sale', 'bestseller'] },
  { id: 'p29', name: 'Summit Insulated Bottle', category: 'Outdoors', brand: 'Summit', price: 29.0, rating: 4.7, reviews: 1320, stock: 140, blurb: '24oz vacuum bottle, 24h cold / 12h hot.', color: '#334155', tags: ['bestseller'] },
  { id: 'p30', name: 'Summit Trekking Poles', category: 'Outdoors', brand: 'Summit', price: 69.0, rating: 4.5, reviews: 210, stock: 33, blurb: 'Collapsible carbon poles with cork grips.', color: '#1e40af' },
  { id: 'p31', name: 'Drift Wireless Charger', category: 'Accessories', brand: 'Drift', price: 35.0, rating: 4.2, reviews: 654, stock: 120, blurb: '15W Qi pad with anti-slip surface.', color: '#525252' },
  { id: 'p32', name: 'Drift 3-in-1 Charging Stand', category: 'Accessories', brand: 'Drift', price: 69.0, was: 79.0, rating: 4.6, reviews: 312, stock: 26, blurb: 'Charge phone, watch, and earbuds at once.', color: '#404040', tags: ['sale'] },
  { id: 'p33', name: 'Ember Smart Kettle', category: 'Kitchen', brand: 'Halo', price: 129.0, rating: 4.4, reviews: 145, stock: 17, blurb: 'Gooseneck kettle with precise temperature control.', color: '#dc2626' },
  { id: 'p34', name: 'Nimbus Air Fryer 6L', category: 'Kitchen', brand: 'Nimbus', price: 119.0, was: 139.0, rating: 4.5, reviews: 489, stock: 23, blurb: 'Digital air fryer with 8 presets.', color: '#65a30d', tags: ['sale'] },
  { id: 'p35', name: 'Nimbus Espresso Machine', category: 'Kitchen', brand: 'Nimbus', price: 349.0, rating: 4.7, reviews: 211, stock: 8, blurb: '15-bar pump espresso maker with steam wand.', color: '#7c2d12', tags: ['new'] },
  { id: 'p36', name: 'Comet Game Controller', category: 'Gaming', brand: 'Comet', price: 59.0, rating: 4.4, reviews: 760, stock: 64, blurb: 'Low-latency wireless controller with hall sensors.', color: '#be185d' },
  { id: 'p37', name: 'Orbit Gaming Headset', category: 'Gaming', brand: 'Orbit', price: 99.0, was: 119.0, rating: 4.3, reviews: 540, stock: 30, blurb: 'Surround headset with detachable mic.', color: '#0e7490', tags: ['sale'] },
  { id: 'p38', name: 'Comet RGB Mousepad XL', category: 'Gaming', brand: 'Comet', price: 29.0, rating: 4.2, reviews: 388, stock: 90, blurb: 'Extended desk pad with USB RGB edge.', color: '#9d174d' },
  { id: 'p39', name: 'Pulse Portable DAC', category: 'Audio', brand: 'Pulse', price: 79.0, rating: 4.6, reviews: 142, stock: 18, blurb: 'USB-C headphone amp for hi-res audio.', color: '#0369a1' },
  { id: 'p40', name: 'Aurora Bookshelf Speakers', category: 'Audio', brand: 'Aurora', price: 279.0, rating: 4.7, reviews: 96, stock: 11, blurb: 'Powered bookshelf pair with Bluetooth + optical.', color: '#4338ca' },
  { id: 'p41', name: 'Nimbus Robot Vacuum', category: 'Home', brand: 'Nimbus', price: 399.0, was: 449.0, rating: 4.4, reviews: 367, stock: 9, blurb: 'LiDAR mapping vacuum + mop with auto-empty.', color: '#15803d', tags: ['sale', 'bestseller'] },
  { id: 'p42', name: 'Halo Smart Bulb 4-Pack', category: 'Home', brand: 'Halo', price: 45.0, rating: 4.3, reviews: 880, stock: 76, blurb: 'Color smart bulbs, no hub required.', color: '#facc15' },
  { id: 'p43', name: 'Halo Smart Thermostat', category: 'Home', brand: 'Halo', price: 149.0, rating: 4.6, reviews: 254, stock: 14, blurb: 'Learning thermostat with energy reports.', color: '#a16207', tags: ['new'] },
  { id: 'p44', name: 'Vista Doorbell Camera', category: 'Cameras', brand: 'Vista', price: 129.0, rating: 4.2, reviews: 612, stock: 25, blurb: '2K video doorbell with package detection.', color: '#0c4a6e' },
  { id: 'p45', name: 'Vista Indoor Security Cam', category: 'Cameras', brand: 'Vista', price: 49.0, was: 59.0, rating: 4.1, reviews: 743, stock: 58, blurb: 'Pan-tilt 1080p cam with night vision.', color: '#075985', tags: ['sale'] },
  { id: 'p46', name: 'Orbit Laptop Stand', category: 'Office', brand: 'Orbit', price: 39.0, rating: 4.5, reviews: 421, stock: 67, blurb: 'Aluminum adjustable stand, foldable.', color: '#134e4a' },
  { id: 'p47', name: 'Comet Webcam Cover', category: 'Office', brand: 'Comet', price: 9.0, rating: 4.0, reviews: 130, stock: 200, blurb: 'Ultra-thin privacy sliders, 3-pack.', color: '#831843' },
  { id: 'p48', name: 'Summit Rain Jacket', category: 'Outdoors', brand: 'Summit', price: 99.0, rating: 4.6, reviews: 188, stock: 40, blurb: 'Packable waterproof shell, taped seams.', color: '#1e3a8a' },
  { id: 'p49', name: 'Summit Camp Lantern', category: 'Outdoors', brand: 'Summit', price: 34.0, rating: 4.4, reviews: 256, stock: 72, blurb: 'Rechargeable LED lantern + power bank.', color: '#0f172a' },
  { id: 'p50', name: 'Nimbus Phone 12', category: 'Phones', brand: 'Nimbus', price: 699.0, rating: 4.5, reviews: 421, stock: 15, blurb: '6.5" OLED, triple camera, 5G.', color: '#1d4ed8', tags: ['new', 'bestseller'] },
  { id: 'p51', name: 'Nimbus Phone 12 Mini', category: 'Phones', brand: 'Nimbus', price: 599.0, rating: 4.3, reviews: 187, stock: 20, blurb: 'Compact flagship with all-day battery.', color: '#2563eb' },
  { id: 'p52', name: 'Nimbus Phone SE', category: 'Phones', brand: 'Nimbus', price: 399.0, was: 449.0, rating: 4.1, reviews: 312, stock: 34, blurb: 'Affordable 5G phone with great camera.', color: '#3b82f6', tags: ['sale'] },
  { id: 'p53', name: 'Drift Tempered Glass 2-Pack', category: 'Phones', brand: 'Drift', price: 15.0, rating: 4.2, reviews: 540, stock: 180, blurb: 'Case-friendly screen protectors with applicator.', color: '#737373' },
  { id: 'p54', name: 'Drift Silicone Phone Case', category: 'Phones', brand: 'Drift', price: 25.0, rating: 4.4, reviews: 366, stock: 110, blurb: 'Soft-touch case with microfiber lining.', color: '#a3a3a3' },
  { id: 'p55', name: 'Echo Lavalier Mic', category: 'Audio', brand: 'Echo', price: 69.0, rating: 4.3, reviews: 144, stock: 41, blurb: 'Wireless clip-on mic for creators.', color: '#6d28d9', tags: ['new'] },
  { id: 'p56', name: 'Comet Stream Deck Mini', category: 'Gaming', brand: 'Comet', price: 89.0, rating: 4.6, reviews: 233, stock: 27, blurb: '6-key macro pad with LCD keys.', color: '#9f1239' },
  { id: 'p57', name: 'Orbit Cooling Pad', category: 'Gaming', brand: 'Orbit', price: 39.0, rating: 4.1, reviews: 175, stock: 53, blurb: 'Laptop cooler with dual quiet fans.', color: '#155e63' },
  { id: 'p58', name: 'Nimbus Standing Desk Mat', category: 'Office', brand: 'Nimbus', price: 49.0, rating: 4.5, reviews: 119, stock: 38, blurb: 'Anti-fatigue mat with massage points.', color: '#3f6212' },
  { id: 'p59', name: 'Halo Sunrise Alarm Clock', category: 'Home', brand: 'Halo', price: 55.0, was: 69.0, rating: 4.4, reviews: 298, stock: 24, blurb: 'Wake-up light with sunrise simulation.', color: '#d97706', tags: ['sale'] },
  { id: 'p60', name: 'Ember Cold Brew Maker', category: 'Kitchen', brand: 'Halo', price: 39.0, rating: 4.3, reviews: 162, stock: 49, blurb: 'Airtight cold brew pitcher, 1L.', color: '#b91c1c' },
  { id: 'p61', name: 'Aurora Turntable', category: 'Audio', brand: 'Aurora', price: 199.0, rating: 4.5, reviews: 87, stock: 12, blurb: 'Belt-drive turntable with built-in preamp.', color: '#3730a3', tags: ['new'] },
  { id: 'p62', name: 'Summit Hammock', category: 'Outdoors', brand: 'Summit', price: 45.0, rating: 4.7, reviews: 410, stock: 60, blurb: 'Lightweight double hammock with straps.', color: '#14532d' },
]

const SPEC_TEMPLATES = {
  Audio: [['Connectivity', 'Bluetooth 5.3'], ['Battery life', 'Up to 30 hours'], ['Weight', '254 g']],
  Wearables: [['Display', 'AMOLED'], ['Water resistance', '5 ATM'], ['Battery', '7 days']],
  Home: [['Power', '110–240V'], ['Connectivity', 'Wi-Fi + app'], ['Warranty', '2 years']],
  Accessories: [['Material', 'Recycled aluminum'], ['Compatibility', 'Universal USB-C'], ['Warranty', '1 year']],
  Cameras: [['Sensor', '1/2.3" CMOS'], ['Video', '4K @ 60fps'], ['Storage', 'microSD up to 512GB']],
  Gaming: [['Connection', '2.4GHz + USB-C'], ['Latency', '<1 ms'], ['Compatibility', 'PC / console']],
  Office: [['Layout', '75% / wireless'], ['Battery', 'Rechargeable'], ['Warranty', '2 years']],
  Outdoors: [['Material', 'Ripstop nylon'], ['Weight', '780 g'], ['Warranty', 'Lifetime']],
  Kitchen: [['Capacity', '1.0 L'], ['Power', '1200 W'], ['Warranty', '2 years']],
  Phones: [['Display', '6.5" OLED'], ['Network', '5G'], ['Storage', '128 GB']],
}

export function specsFor(product) {
  const base = SPEC_TEMPLATES[product.category] || [['Warranty', '1 year']]
  return [['Brand', product.brand], ...base]
}

const REVIEW_AUTHORS = ['Jamie L.', 'Sam R.', 'Priya K.', 'Diego M.', 'Casey T.', 'Morgan P.', 'Avery N.', 'Robin S.']
const REVIEW_TITLES = ['Exactly what I needed', 'Great value', 'Pretty good', 'Love it', 'Would buy again', 'Solid but not perfect']
const REVIEW_BODIES = [
  'Build quality is excellent and setup was painless. Highly recommend.',
  'Works as advertised. A couple of minor quirks but nothing dealbreaking.',
  'Been using it daily for a few weeks now and no complaints.',
  'Good for the price, though the instructions could be clearer.',
  'Exceeded my expectations — the little details are well thought out.',
  'Does the job. Shipping was fast and packaging was nice.',
]

// Deterministic per-product reviews derived from the id hash.
export function reviewsFor(product) {
  const seed = product.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const count = 3 + (seed % 2)
  return Array.from({ length: count }).map((_, i) => {
    const k = seed + i * 7
    const stars = Math.max(3, Math.min(5, Math.round(product.rating) + ((k % 3) - 1)))
    const d = ((k % 26) + 1).toString().padStart(2, '0')
    return {
      id: `${product.id}-r${i}`,
      author: REVIEW_AUTHORS[k % REVIEW_AUTHORS.length],
      title: REVIEW_TITLES[k % REVIEW_TITLES.length],
      body: REVIEW_BODIES[(k + 2) % REVIEW_BODIES.length],
      rating: stars,
      date: `2026-04-${d}`,
    }
  })
}

export const COUPONS = { NIMBUS10: 0.1, SAVE20: 0.2 }

export const SEED_ORDERS = [
  { id: 'NMB-10231', date: '2026-04-12', status: 'Delivered', items: [
      { id: 'p1', name: 'Aurora Wireless Headphones', price: 169.0, qty: 1 },
      { id: 'p13', name: 'Orbit Wireless Mouse', price: 45.0, qty: 2 },
    ], total: 259.0 },
  { id: 'NMB-10198', date: '2026-03-02', status: 'Delivered', items: [
      { id: 'p7', name: 'Cumulus Bluetooth Speaker', price: 129.0, qty: 1 },
    ], total: 129.0 },
  { id: 'NMB-10342', date: '2026-05-20', status: 'Shipped', items: [
      { id: 'p3', name: 'Nimbus Smartwatch S2', price: 249.0, qty: 1 },
    ], total: 249.0 },
]

export const DEMO_USER = {
  email: 'demo@hominis.test',
  password: 'password',
  name: 'Demo Shopper',
  phone: '(555) 014-2200',
  addresses: [
    { id: 'a1', label: 'Home', line1: '24 Cloud Lane', city: 'Seattle', state: 'WA', zip: '98101', default: true },
    { id: 'a2', label: 'Work', line1: '900 Market St, Floor 6', city: 'Seattle', state: 'WA', zip: '98109', default: false },
  ],
}
