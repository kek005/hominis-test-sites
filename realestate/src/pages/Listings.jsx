import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES, TYPES } from '../data/seed.js'
import { money, num } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import Photo from '../components/Photo.jsx'

const statusColor = {
  'For sale': 'bg-emerald-100 text-emerald-700',
  'New listing': 'bg-brand-100 text-brand-700',
  Pending: 'bg-amber-100 text-amber-700',
}

export default function Listings() {
  const [params, setParams] = useSearchParams()
  const { properties, isSaved, toggleSave } = useStore()

  const query = params.get('q') || ''
  const city = params.get('city') || 'All'
  const type = params.get('type') || 'All'
  const minBeds = Number(params.get('beds') || 0)
  const maxPrice = Number(params.get('max') || 0)
  const sort = params.get('sort') || 'newest'

  const setParam = (k, v) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'All' || v === '0' || v === 0) next.delete(k); else next.set(k, v)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    let l = properties.filter((p) => {
      const q = query.trim().toLowerCase()
      return (!q || p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.address.toLowerCase().includes(q))
        && (city === 'All' || p.city === city)
        && (type === 'All' || p.type === type)
        && (minBeds === 0 || p.beds >= minBeds)
        && (!maxPrice || p.price <= maxPrice)
    })
    if (sort === 'price-asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'beds') l = [...l].sort((a, b) => b.beds - a.beds)
    return l
  }, [properties, query, city, type, minBeds, maxPrice, sort])

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-white">
        <h1 className="text-3xl font-bold">Find a place that feels like home</h1>
        <p className="mt-2 text-brand-100">{properties.length} properties across {CITIES.length} cities. Search, save, and schedule a tour.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit space-y-4 rounded-2xl border border-gray-100 p-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Search</label>
            <input type="search" aria-label="Search properties" value={query} onChange={(e) => setParam('q', e.target.value)} placeholder="Address, city, title…" className={`${sel} w-full`} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">City</label>
            <select aria-label="City" value={city} onChange={(e) => setParam('city', e.target.value)} className={`${sel} w-full`}>
              <option>All</option>{CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Type</label>
            <select aria-label="Type" value={type} onChange={(e) => setParam('type', e.target.value)} className={`${sel} w-full`}>
              <option>All</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Beds</label>
            <select aria-label="Beds" value={minBeds} onChange={(e) => setParam('beds', e.target.value)} className={`${sel} w-full`}>
              <option value={0}>Any</option><option value={1}>1+</option><option value={2}>2+</option><option value={3}>3+</option><option value={4}>4+</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Max price {maxPrice ? `(${money(maxPrice)})` : ''}</label>
            <input type="range" min="0" max="2000000" step="50000" value={maxPrice} onChange={(e) => setParam('max', e.target.value)} className="w-full accent-brand-600" aria-label="Max price" />
          </div>
          <button onClick={() => setParams({}, { replace: true })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">Clear filters</button>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">{list.length} result{list.length !== 1 ? 's' : ''}</p>
            <select aria-label="Sort" value={sort} onChange={(e) => setParam('sort', e.target.value)} className={sel}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="beds">Most bedrooms</option>
            </select>
          </div>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">No properties match your filters.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {list.map((p) => (
                <div key={p.id} data-testid="property-card" className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md">
                  <Link to={`/property/${p.id}`} className="block">
                    <div className="relative">
                      <Photo src={`/img/properties/${p.img}.jpg`} alt={p.title} label={p.title} className="h-52 w-full transition group-hover:scale-105" />
                      <span className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${statusColor[p.status] || 'bg-gray-100 text-gray-700'}`}>{p.status}</span>
                    </div>
                  </Link>
                  <button onClick={() => toggleSave(p.id)} aria-label="Toggle save" data-testid="save-toggle" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white">
                    <span className={isSaved(p.id) ? 'text-red-500' : 'text-gray-400'}>{isSaved(p.id) ? '♥' : '♡'}</span>
                  </button>
                  <div className="p-4">
                    <p className="text-xl font-bold text-gray-900">{money(p.price)}</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">{p.beds} bd · {p.baths} ba · {p.sqft ? `${num(p.sqft)} sqft` : `${num(p.lot)} sqft lot`}</p>
                    <Link to={`/property/${p.id}`} className="mt-1 block text-sm text-gray-500 hover:text-brand-700">{p.address} · {p.city}</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
