import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  const { wishlist, productById } = useStore()
  const items = wishlist.map(productById).filter(Boolean)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-red-50 text-2xl text-red-500">♡</div>
        <h1 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="mt-2 text-gray-500">Tap the heart on any product to save it for later.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Your wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
