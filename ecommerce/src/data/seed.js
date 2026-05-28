// Deterministic seed data for Nimbus Store. No randomness — re-seeding
// always produces the same catalog so test scenarios are reproducible.

export const CATEGORIES = ['Audio', 'Wearables', 'Home', 'Accessories', 'Cameras']

export const PRODUCTS = [
  { id: 'p1', name: 'Aurora Wireless Headphones', category: 'Audio', price: 199.0, rating: 4.6, stock: 24, blurb: 'Over-ear noise-cancelling headphones with 30-hour battery.', color: '#6366f1' },
  { id: 'p2', name: 'Pulse Bluetooth Earbuds', category: 'Audio', price: 89.0, rating: 4.3, stock: 60, blurb: 'Compact earbuds with wireless charging case.', color: '#0ea5e9' },
  { id: 'p3', name: 'Nimbus Smartwatch S2', category: 'Wearables', price: 249.0, rating: 4.7, stock: 12, blurb: 'AMOLED fitness watch with GPS and ECG.', color: '#10b981' },
  { id: 'p4', name: 'Trailband Fitness Tracker', category: 'Wearables', price: 59.0, rating: 4.1, stock: 0, blurb: 'Slim activity band with 7-day battery.', color: '#f59e0b' },
  { id: 'p5', name: 'Ember Smart Mug', category: 'Home', price: 99.0, rating: 4.4, stock: 33, blurb: 'Temperature-controlled mug, app connected.', color: '#ef4444' },
  { id: 'p6', name: 'Halo Desk Lamp', category: 'Home', price: 74.0, rating: 4.5, stock: 18, blurb: 'Dimmable LED lamp with wireless charging base.', color: '#eab308' },
  { id: 'p7', name: 'Cumulus Bluetooth Speaker', category: 'Audio', price: 129.0, rating: 4.5, stock: 27, blurb: '360° sound, waterproof, 20-hour playtime.', color: '#8b5cf6' },
  { id: 'p8', name: 'Vista 4K Action Camera', category: 'Cameras', price: 329.0, rating: 4.8, stock: 9, blurb: 'Waterproof 4K60 action cam with stabilization.', color: '#06b6d4' },
  { id: 'p9', name: 'Lens Pro Webcam', category: 'Cameras', price: 119.0, rating: 4.2, stock: 41, blurb: '1080p webcam with auto-framing and privacy shutter.', color: '#3b82f6' },
  { id: 'p10', name: 'Stratus Laptop Sleeve', category: 'Accessories', price: 39.0, rating: 4.0, stock: 88, blurb: 'Water-resistant 14" sleeve with accessory pocket.', color: '#64748b' },
  { id: 'p11', name: 'Drift USB-C Hub', category: 'Accessories', price: 49.0, rating: 4.3, stock: 54, blurb: '7-in-1 hub: HDMI, USB-A, SD, 100W passthrough.', color: '#475569' },
  { id: 'p12', name: 'Comet Mechanical Keyboard', category: 'Accessories', price: 139.0, rating: 4.7, stock: 16, blurb: 'Hot-swappable 75% board with PBT keycaps.', color: '#ec4899' },
  { id: 'p13', name: 'Orbit Wireless Mouse', category: 'Accessories', price: 45.0, rating: 4.4, stock: 72, blurb: 'Ergonomic silent-click mouse, USB-C.', color: '#14b8a6' },
  { id: 'p14', name: 'Solace Sleep Headband', category: 'Wearables', price: 79.0, rating: 3.9, stock: 21, blurb: 'Sleep tracking headband with soothing audio.', color: '#a855f7' },
  { id: 'p15', name: 'Breeze Smart Fan', category: 'Home', price: 159.0, rating: 4.2, stock: 7, blurb: 'Bladeless oscillating fan with air quality sensor.', color: '#22c55e' },
  { id: 'p16', name: 'Glow Ring Light', category: 'Cameras', price: 65.0, rating: 4.1, stock: 0, blurb: '18" bicolor ring light with phone mount.', color: '#f97316' },
  { id: 'p17', name: 'Nimbus Power Bank 20K', category: 'Accessories', price: 55.0, rating: 4.6, stock: 95, blurb: '20,000mAh fast-charge bank with display.', color: '#0d9488' },
  { id: 'p18', name: 'Echo Studio Microphone', category: 'Audio', price: 149.0, rating: 4.5, stock: 13, blurb: 'USB condenser mic with shock mount.', color: '#7c3aed' },
  { id: 'p19', name: 'Summit Travel Backpack', category: 'Accessories', price: 119.0, rating: 4.7, stock: 29, blurb: '28L anti-theft backpack with USB port.', color: '#1e293b' },
  { id: 'p20', name: 'Frost Mini Projector', category: 'Home', price: 219.0, rating: 4.0, stock: 5, blurb: '1080p portable projector with built-in speaker.', color: '#2563eb' },
]

// Seeded order history for the demo account.
export const SEED_ORDERS = [
  {
    id: 'NMB-10231',
    date: '2026-04-12',
    status: 'Delivered',
    items: [
      { id: 'p1', name: 'Aurora Wireless Headphones', price: 199.0, qty: 1 },
      { id: 'p13', name: 'Orbit Wireless Mouse', price: 45.0, qty: 2 },
    ],
    total: 289.0,
  },
  {
    id: 'NMB-10198',
    date: '2026-03-02',
    status: 'Delivered',
    items: [{ id: 'p7', name: 'Cumulus Bluetooth Speaker', price: 129.0, qty: 1 }],
    total: 129.0,
  },
  {
    id: 'NMB-10342',
    date: '2026-05-20',
    status: 'Shipped',
    items: [{ id: 'p3', name: 'Nimbus Smartwatch S2', price: 249.0, qty: 1 }],
    total: 249.0,
  },
]

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Demo Shopper' }
