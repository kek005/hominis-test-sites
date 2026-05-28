import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/seed.js'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import ProductThumb from '../components/ProductThumb.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id)
  const { addToCart } = useStore()
  const toast = useToast()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-700">Product not found.</p>
        <Link to="/" className="mt-2 inline-block text-brand-600 hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const outOfStock = product.stock === 0
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductThumb product={product} className="h-80 w-full" />
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-amber-500">
            <span aria-hidden>★★★★★</span>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)} / 5</span>
          </div>
          <p className="mt-4 text-gray-600">{product.blurb}</p>
          <p className="mt-6 text-3xl font-bold text-gray-900">{money(product.price)}</p>

          <p className={`mt-2 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-emerald-600'}`}>
            {outOfStock ? 'Out of stock' : `In stock (${product.stock} available)`}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span data-testid="qty" className="w-10 text-center font-medium">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-lg text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <button
              disabled={outOfStock}
              onClick={() => {
                addToCart(product.id, qty)
                toast.show(`${qty} × ${product.name} added to cart`)
              }}
              className="flex-1 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {outOfStock ? 'Unavailable' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold text-gray-900">You might also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
