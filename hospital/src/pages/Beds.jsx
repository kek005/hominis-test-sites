import { useStore } from '../lib/store.jsx'

export default function Beds() {
  const { wardBeds } = useStore()
  const totals = wardBeds.reduce((acc, w) => ({ total: acc.total + w.total, occ: acc.occ + w.occupied }), { total: 0, occ: 0 })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Beds & wards</h1>
      <p className="mt-1 text-sm text-gray-500">{totals.occ} of {totals.total} beds occupied ({Math.round((totals.occ / totals.total) * 100)}%)</p>

      <div className="mt-6 space-y-6">
        {wardBeds.map((w) => {
          const free = w.total - w.occupied
          return (
            <section key={w.ward} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{w.ward}</h2>
                <p className="text-sm text-gray-500"><span className="font-medium text-gray-900">{w.occupied}</span> occupied · <span className="font-medium text-emerald-600">{free}</span> available</p>
              </div>
              <div className="flex flex-wrap gap-1.5" data-testid="ward-grid">
                {Array.from({ length: w.total }).map((_, i) => (
                  <span key={i} title={`Bed ${i + 1} — ${i < w.occupied ? 'occupied' : 'available'}`}
                    className={`grid h-7 w-7 place-items-center rounded text-[10px] font-medium ${i < w.occupied ? 'bg-brand-600 text-white' : 'border border-gray-200 bg-white text-gray-400'}`}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-600" /> Occupied</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-gray-200 bg-white" /> Available</span>
      </div>
    </div>
  )
}
