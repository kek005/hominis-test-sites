import { Link } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from './Toast.jsx'
import ProductThumb from './ProductThumb.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useStore()
  const toast = useToast()
  const outOfStock = product.stock === 0

  return (
    <div
      data-testid="product-card"
      className="group flex flex-col rounded-2xl border border-gray-100 p-4 transition hover:shadow-md"
    >
      <Link to={`/product/${product.id}`} className="relative">
        <ProductThumb product={product} className="h-40 w-full" />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded-full bg-gray-900/80 px-2 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
            Only {product.stock} left
          </span>
        )}
      </Link>
      <div className="mt-3 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.category}</p>
        <Link to={`/product/${product.id}`} className="mt-1 block font-semibold text-gray-900 hover:text-brand-700">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-amber-500">
          <span aria-hidden>★</span>
          <span className="text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">{money(product.price)}</span>
        <button
          disabled={outOfStock}
          onClick={() => {
            addToCart(product.id)
            toast.show(`${product.name} added to cart`)
          }}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {outOfStock ? 'Unavailable' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}
