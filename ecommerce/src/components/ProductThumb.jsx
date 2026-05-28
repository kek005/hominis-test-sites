import { useState } from 'react'

// Real product photo with a graceful fallback to a colored initials tile,
// so the card always renders even if an image is missing.
export default function ProductThumb({ product, className = '' }) {
  const [failed, setFailed] = useState(false)
  const initials = product.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}>
      {!failed ? (
        <img
          src={`/products/${product.id}.jpg`}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${product.color}22, ${product.color}55)` }}
          aria-hidden="true"
        >
          <span className="text-2xl font-bold tracking-tight" style={{ color: product.color }}>{initials}</span>
        </div>
      )}
    </div>
  )
}
