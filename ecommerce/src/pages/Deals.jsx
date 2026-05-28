import { PRODUCTS } from '../data/seed.js'
import { money } from '../lib/format.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Deals() {
  const deals = PRODUCTS.filter((p) => p.was && p.was > p.price).sort(
    (a, b) => (1 - b.price / b.was) - (1 - a.price / a.was),
  )
  const totalSaved = deals.reduce((s, p) => s + (p.was - p.price), 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 p-8 text-white">
        <p className="text-sm font-medium text-red-200">Limited-time offers</p>
        <h1 className="mt-1 text-3xl font-bold">Deals & clearance</h1>
        <p className="mt-2 text-red-100">{deals.length} products on sale — up to {money(totalSaved)} in total savings across the catalog.</p>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
