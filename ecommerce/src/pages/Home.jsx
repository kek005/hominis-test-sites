import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/seed.js'
import ProductCard from '../components/ProductCard.jsx'

function Rail({ title, products, to }) {
  if (products.length === 0) return null
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {to && <Link to={to} className="text-sm font-medium text-brand-700 hover:underline">View all →</Link>}
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}

export default function Home() {
  const deals = PRODUCTS.filter((p) => p.was && p.was > p.price)
  const newArrivals = PRODUCTS.filter((p) => p.tags?.includes('new'))
  const bestsellers = PRODUCTS.filter((p) => p.tags?.includes('bestseller'))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white sm:col-span-2">
          <p className="text-sm font-medium text-brand-200">New season, new gear</p>
          <h1 className="mt-2 text-3xl font-bold">Tech that keeps up with you</h1>
          <p className="mt-2 max-w-md text-brand-100">Audio, wearables, cameras, and smart home — free shipping over $100, free returns always.</p>
          <Link to="/shop" className="mt-5 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">Shop all products</Link>
        </div>
        <Link to="/deals" className="flex flex-col justify-between rounded-2xl bg-red-600 p-8 text-white hover:bg-red-700">
          <div>
            <p className="text-sm font-medium text-red-200">Limited time</p>
            <h2 className="mt-2 text-2xl font-bold">Deals up to 20% off</h2>
          </div>
          <span className="mt-5 inline-block text-sm font-semibold underline">Browse deals →</span>
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="rounded-xl border border-gray-100 bg-white p-4 text-center text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:text-brand-700">
              {c}
            </Link>
          ))}
        </div>
      </section>

      <Rail title="Bestsellers" products={bestsellers} to="/shop?sort=rating" />
      <Rail title="New arrivals" products={newArrivals} to="/shop" />
      <Rail title="On sale now" products={deals} to="/deals" />
    </div>
  )
}
