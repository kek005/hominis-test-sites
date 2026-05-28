import { useMemo, useState } from 'react'
import { AUDIT_EVENTS } from '../data/seed.js'

const levelBadge = {
  success: 'bg-emerald-100 text-emerald-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
}

export default function AuditLog() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All')
  const actors = useMemo(() => ['All', ...new Set(AUDIT_EVENTS.map((e) => e.actor))], [])
  const [actor, setActor] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return AUDIT_EVENTS.filter((e) =>
      (!q || e.message.toLowerCase().includes(q) || e.action.toLowerCase().includes(q)) &&
      (level === 'All' || e.level === level) &&
      (actor === 'All' || e.actor === actor),
    )
  }, [query, level, actor])

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Audit log</h1>
      <p className="mt-1 text-sm text-gray-500">{rows.length} events</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <input type="search" aria-label="Search events" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events…" className={`${sel} flex-1 sm:max-w-xs`} />
        <select aria-label="Filter by actor" value={actor} onChange={(e) => setActor(e.target.value)} className={sel}>{actors.map((a) => <option key={a}>{a}</option>)}</select>
        <select aria-label="Filter by level" value={level} onChange={(e) => setLevel(e.target.value)} className={sel}><option>All</option><option>success</option><option>info</option><option>warning</option><option>danger</option></select>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Time</th><th className="px-4 py-3">Actor</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Details</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-400">No events match your filters.</td></tr>
            ) : rows.map((e) => (
              <tr key={e.id} data-testid="audit-row" className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">{e.at}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{e.actor}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelBadge[e.level]}`}>{e.action}</span></td>
                <td className="px-4 py-3 text-gray-600">{e.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
