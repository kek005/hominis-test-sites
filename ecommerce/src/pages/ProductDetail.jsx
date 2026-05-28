import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCTS, specsFor, reviewsFor } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import ProductThumb from '../components/ProductThumb.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const toast = useToast()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('details')

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-700">Product not found.</p>
        <Link to="/shop" className="mt-2 inline-block text-brand-600 hover:underline">Back to shop</Link>
      </div>
    )
  }

  const outOfStock = product.stock === 0
  const onSale = product.was && product.was > product.price
  const wished = isWishlisted(product.id)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const specs = specsFor(product)
  const reviews = reviewsFor(product)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/shop" className="hover:text-gray-900">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-900">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ProductThumb product={product} className="h-80 w-full" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <ProductThumb key={i} product={{ ...product, name: product.brand + ' ' + (i + 1) }} className="h-16 w-full opacity-80" />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">{product.brand} · {product.category}</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-amber-500">
            <span aria-hidden>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
          </div>
          <p className="mt-4 text-gray-600">{product.blurb}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">{money(product.price)}</span>
            {onSale && <span className="text-lg text-gray-400 line-through">{money(product.was)}</span>}
            {onSale && <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Save {money(product.was - product.price)}</span>}
          </div>

          <p className={`mt-2 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
            {outOfStock ? 'Out of stock' : `In stock (${product.stock} available)`}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg text-gray-600 hover:bg-gray-50">−</button>
              <span data-testid="qty" className="w-10 text-center font-medium">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-lg text-gray-600 hover:bg-gray-50">+</button>
            </div>
            <button
              disabled={outOfStock}
              onClick={() => { addToCart(product.id, qty); toast.show(`${qty} × ${product.name} added to cart`) }}
              className="flex-1 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {outOfStock ? 'Unavailable' : 'Add to cart'}
            </button>
            <button
              onClick={() => { toggleWishlist(product.id); toast.show(wished ? 'Removed from wishlist' : 'Saved to wishlist') }}
              aria-label="Toggle wishlist"
              className="grid h-12 w-12 place-items-center rounded-lg border border-gray-300 text-xl hover:bg-gray-50"
            >
              <span className={wished ? 'text-red-500' : 'text-gray-400'}>{wished ? '♥' : '♡'}</span>
            </button>
          </div>

          <div className="mt-4 flex gap-4 text-xs text-gray-500">
            <span>🚚 Free shipping over $100</span>
            <span>↩ 30-day returns</span>
            <span>🔒 2-year warranty</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-6 border-b border-gray-200 text-sm font-medium">
          {['details', 'specs', 'reviews'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-1 pb-3 capitalize ${tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {t === 'reviews' ? `Reviews (${reviews.length})` : t}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === 'details' && (
            <p className="max-w-2xl text-gray-700">
              The {product.name} from {product.brand}. {product.blurb} Designed for everyday reliability and backed by our
              2-year warranty. Ships in recyclable packaging.
            </p>
          )}
          {tab === 'specs' && (
            <table className="w-full max-w-lg text-sm">
              <tbody className="divide-y divide-gray-100">
                {specs.map(([k, v]) => (
                  <tr key={k}><td className="py-2 pr-6 font-medium text-gray-500">{k}</td><td className="py-2 text-gray-900">{v}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === 'reviews' && (
            <ul className="max-w-2xl space-y-5">
              {reviews.map((r) => (
                <li key={r.id} data-testid="review" className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{r.title}</p>
                    <span className="text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{r.body}</p>
                  <p className="mt-1 text-xs text-gray-400">{r.author} · {r.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">You might also like</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
