import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES, HOTELS } from '../data/seed.js'
import { money } from '../lib/format.js'
import SearchWidget from '../components/SearchWidget.jsx'
import Photo from '../components/Photo.jsx'

export default function Hotels() {
  const [params] = useSearchParams()
  const city = params.get('city') || 'All'
  const [sort, setSort] = useState('rating')
  const [minStars, setMinStars] = useState(0)

  const cityName = CITIES.find((c) => c.code === city)?.city

  const hotels = useMemo(() => {
    let list = HOTELS.filter((h) => (city === 'All' || h.cityCode === city) && h.stars >= minStars)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [city, sort, minStars])

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <SearchWidget initialTab="hotels" />

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{cityName ? `Hotels in ${cityName}` : 'All hotels'}</h1>
        <div className="flex gap-3">
          <select className={sel} value={minStars} onChange={(e) => setMinStars(Number(e.target.value))} aria-label="Minimum stars"><option value={0}>Any rating</option><option value={4}>4+ stars</option><option value={5}>5 stars</option></select>
          <select className={sel} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort hotels"><option value="rating">Top rated</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
        </div>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">No hotels match your filters.</div>
        ) : hotels.map((h) => (
          <Link key={h.id} to={`/hotels/${h.id}`} data-testid="hotel-card" className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md">
            <Photo src={`/img/hotels/${h.img}.jpg`} alt={h.name} label={h.name} className="h-44 w-full transition group-hover:scale-105" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900">{h.name}</p>
                  <p className="text-xs text-gray-500">{h.area}, {h.city} · {'★'.repeat(h.stars)}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-700">{h.rating}</span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-xs text-gray-400">{h.reviews} reviews</p>
                <p className="text-lg font-bold text-gray-900">{money(h.price)}<span className="text-xs font-normal text-gray-400"> /night</span></p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
