import { Link, Navigate, useParams } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import Photo from '../components/Photo.jsx'

export default function RestaurantDetail() {
  const { id } = useParams()
  const { restaurantById, addToCart, cart } = useStore()
  const toast = useToast()
  const r = restaurantById(id)
  if (!r) return <Navigate to="/" replace />

  const switching = cart.restaurantId && cart.restaurantId !== id && cart.items.length > 0

  const add = (item) => {
    addToCart(r.id, item.id)
    toast.show(`${item.name} added`)
  }

  return (
    <div>
      <Photo src={`/img/restaurants/${r.img}.jpg`} alt={r.name} label={r.name} className="h-56 w-full sm:h-72" />
      <div className="mx-auto -mt-12 max-w-4xl px-4">
        <Link to="/" className="text-sm text-white/80 hover:text-white">← All restaurants</Link>
        <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{r.name}</h1>
              <p className="text-sm text-gray-500">{r.cuisine} · {r.tags.join(' · ')}</p>
              <p className="mt-1 text-xs text-gray-400">{r.address}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <Stat label="Rating" value={`★ ${r.rating}`} />
              <Stat label="ETA" value={r.eta} />
              <Stat label="Delivery" value={money(r.fee)} />
            </div>
          </div>
        </div>

        {switching && (
          <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Heads up — adding items from {r.name} will replace your current cart.
          </div>
        )}

        <div className="mt-6 space-y-6">
          {r.menu.map((section) => (
            <section key={section.name}>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">{section.name}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.id} data-testid="menu-item" className="flex items-start justify-between rounded-2xl border border-gray-100 bg-white p-4">
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                      <p className="mt-2 font-bold text-gray-900">{money(item.price)}</p>
                    </div>
                    <button onClick={() => add(item)} data-testid="add-item" className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">+ Add</button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return <div className="text-center"><p className="text-xs text-gray-400">{label}</p><p className="font-semibold text-gray-900">{value}</p></div>
}
