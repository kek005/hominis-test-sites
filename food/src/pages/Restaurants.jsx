import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CUISINES } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import Photo from '../components/Photo.jsx'

export default function Restaurants() {
  const { restaurants } = useStore()
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('All')
  const [sort, setSort] = useState('rating')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let l = restaurants.filter((r) =>
      (!q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q))
      && (cuisine === 'All' || r.cuisine === cuisine)
    )
    if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating)
    if (sort === 'eta') l = [...l].sort((a, b) => parseInt(a.eta) - parseInt(b.eta))
    if (sort === 'fee') l = [...l].sort((a, b) => a.fee - b.fee)
    return l
  }, [restaurants, query, cuisine, sort])

  return (
    <div>
      <div className="bg-gradient-to-r from-brand-700 to-brand-900 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold">Hungry? We've got you.</h1>
          <p className="mt-2 text-brand-100">{restaurants.length} restaurants delivering near you — order in seconds.</p>
          <input type="search" aria-label="Search restaurants" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants or cuisines…" className="mt-5 w-full max-w-lg rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {['All', ...CUISINES].map((c) => (
              <button key={c} onClick={() => setCuisine(c)} className={`rounded-full px-3 py-1 text-sm font-medium ${cuisine === c ? 'bg-brand-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>{c}</button>
            ))}
          </div>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
            <option value="rating">Top rated</option>
            <option value="eta">Fastest</option>
            <option value="fee">Lowest fee</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">No restaurants match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <Link key={r.id} to={`/restaurant/${r.id}`} data-testid="restaurant-card" className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md">
                <div className="relative">
                  <Photo src={`/img/restaurants/${r.img}.jpg`} alt={r.name} label={r.name} className="h-44 w-full transition group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">{r.cuisine}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.tags.join(' · ')}</p>
                    </div>
                    <span className="rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-700">★ {r.rating}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>⏱ {r.eta}</span>
                    <span>Delivery {money(r.fee)} · {r.reviews} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
