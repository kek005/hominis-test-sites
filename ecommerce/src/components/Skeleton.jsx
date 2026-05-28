export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <Skeleton className="mb-4 h-40 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  )
}
