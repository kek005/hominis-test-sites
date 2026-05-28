import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/seed.js'
import ProductCard from '../components/ProductCard.jsx'
import { ProductCardSkeleton } from '../components/Skeleton.jsx'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  const query = params.get('q') || ''
  const category = params.get('category') || 'All'
  const brand = params.get('brand') || 'All'
  const sort = params.get('sort') || 'featured'
  const maxPrice = Number(params.get('max') || 0)
  const onSaleOnly = params.get('sale') === '1'

  const setParam = (k, v) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'All' || v === '0' || v === false) next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [query, category, brand, sort, maxPrice, onSaleOnly])

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || p.category === category
      const matchesBrand = brand === 'All' || p.brand === brand
      const matchesPrice = !maxPrice || p.price <= maxPrice
      const matchesSale = !onSaleOnly || (p.was && p.was > p.price)
      return matchesQuery && matchesCategory && matchesBrand && matchesPrice && matchesSale
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category, brand, sort, maxPrice, onSaleOnly])

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category === 'All' ? 'All products' : category}</h1>
          <p className="text-sm text-gray-500">{loading ? 'Loading…' : `${products.length} product${products.length !== 1 ? 's' : ''}`}{query && ` for “${query}”`}</p>
        </div>
        <select aria-label="Sort products" value={sort} onChange={(e) => setParam('sort', e.target.value)} className={sel}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit space-y-5 rounded-2xl border border-gray-100 p-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Search</label>
            <input type="search" aria-label="Search products" value={query} onChange={(e) => setParam('q', e.target.value)} placeholder="Search…" className={`${sel} w-full`} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Category</label>
            <select aria-label="Category" value={category} onChange={(e) => setParam('category', e.target.value)} className={`${sel} w-full`}>
              <option>All</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Brand</label>
            <select aria-label="Brand" value={brand} onChange={(e) => setParam('brand', e.target.value)} className={`${sel} w-full`}>
              <option>All</option>{BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Max price: {maxPrice ? `$${maxPrice}` : 'Any'}</label>
            <input type="range" min="0" max="900" step="50" value={maxPrice} onChange={(e) => setParam('max', e.target.value)} className="w-full accent-brand-600" aria-label="Maximum price" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={onSaleOnly} onChange={(e) => setParam('sale', e.target.checked ? '1' : '')} className="accent-brand-600" />
            On sale only
          </label>
          <button onClick={() => setParams({}, { replace: true })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">Clear filters</button>
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">{Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center text-gray-500">
              <p className="text-lg font-medium">No products match your filters.</p>
              <p className="text-sm">Try clearing some filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
