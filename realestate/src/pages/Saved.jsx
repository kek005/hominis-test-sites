import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money, num } from '../lib/format.js'
import Photo from '../components/Photo.jsx'

export default function Saved() {
  const { saved, propertyById, toggleSave } = useStore()
  const list = saved.map(propertyById).filter(Boolean)

  if (list.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-red-50 text-2xl text-red-500">♡</div>
        <h1 className="text-2xl font-bold text-gray-900">No saved homes yet</h1>
        <p className="mt-2 text-gray-500">Tap the heart on any listing to save it for later.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse homes</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Saved homes ({list.length})</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {list.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <Link to={`/property/${p.id}`}><Photo src={`/img/properties/${p.img}.jpg`} alt={p.title} label={p.title} className="h-44 w-full" /></Link>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">{money(p.price)}</p>
                  <p className="text-sm text-gray-700">{p.beds} bd · {p.baths} ba · {num(p.sqft)} sqft</p>
                  <p className="text-sm text-gray-500">{p.address}</p>
                </div>
                <button onClick={() => toggleSave(p.id)} className="text-sm text-gray-400 hover:text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
