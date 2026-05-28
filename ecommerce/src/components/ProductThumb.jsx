// Synthetic product image: a colored gradient tile with the product initials.
// Avoids bundling real image assets while still giving the agent something visual.
export default function ProductThumb({ product, className = '' }) {
  const initials = product.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${product.color}22, ${product.color}55)`,
      }}
      aria-hidden="true"
    >
      <span className="text-2xl font-bold tracking-tight" style={{ color: product.color }}>
        {initials}
      </span>
    </div>
  )
}
