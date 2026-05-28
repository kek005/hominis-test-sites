import { Link } from 'react-router-dom'
import { money } from '../lib/format.js'
import { useStore } from '../lib/store.jsx'
import { useToast } from './Toast.jsx'
import ProductThumb from './ProductThumb.jsx'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const toast = useToast()
  const outOfStock = product.stock === 0
  const onSale = product.was && product.was > product.price
  const pct = onSale ? Math.round((1 - product.price / product.was) * 100) : 0
  const wished = isWishlisted(product.id)

  return (
    <div data-testid="product-card" className="group flex flex-col rounded-2xl border border-gray-100 p-4 transition hover:shadow-md">
      <Link to={`/product/${product.id}`} className="relative">
        <ProductThumb product={product} className="h-40 w-full" />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {outOfStock && <span className="rounded-full bg-gray-900/80 px-2 py-1 text-xs font-semibold text-white">Out of stock</span>}
          {onSale && !outOfStock && <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">-{pct}%</span>}
          {product.tags?.includes('new') && !outOfStock && <span className="rounded-full bg-brand-600 px-2 py-1 text-xs font-semibold text-white">New</span>}
          {!onSale && product.stock > 0 && product.stock <= 10 && <span className="rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">Only {product.stock} left</span>}
        </div>
      </Link>
      <button
        onClick={() => { toggleWishlist(product.id); toast.show(wished ? 'Removed from wishlist' : 'Saved to wishlist') }}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
        data-testid="wishlist-toggle"
        className="relative z-10 -mt-9 ml-auto mr-1 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white"
      >
        <span className={wished ? 'text-red-500' : 'text-gray-400'}>{wished ? '♥' : '♡'}</span>
      </button>
      <div className="mt-2 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="mt-1 block font-semibold text-gray-900 hover:text-brand-700">{product.name}</Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-amber-500">
          <span aria-hidden>★</span>
          <span className="text-gray-600">{product.rating.toFixed(1)}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">{money(product.price)}</span>
          {onSale && <span className="ml-2 text-sm text-gray-400 line-through">{money(product.was)}</span>}
        </div>
        <button
          disabled={outOfStock}
          onClick={() => { addToCart(product.id); toast.show(`${product.name} added to cart`) }}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {outOfStock ? 'Unavailable' : 'Add'}
        </button>
      </div>
    </div>
  )
}
