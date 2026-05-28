import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

const claimColor = {
  Submitted: 'bg-blue-100 text-blue-700',
  'In review': 'bg-amber-100 text-amber-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  Paid: 'bg-emerald-100 text-emerald-700',
  Denied: 'bg-red-100 text-red-700',
}

export default function Claims() {
  const { claims } = useStore()
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => (filter === 'All' ? claims : claims.filter((c) => c.status === filter)), [claims, filter])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
        <Link to="/file-claim" data-testid="file-claim-cta" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ File a claim</Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {['All', 'Submitted', 'In review', 'Approved', 'Paid'].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3 py-1 text-sm ${filter === s ? 'bg-brand-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>{s}</button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">No claims in this status.</div>
        ) : rows.map((c) => (
          <div key={c.id} data-testid="claim-row" className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900">{c.id} · {c.type}</p>
                <p className="text-sm text-gray-500">{c.policyName} · filed {c.date}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${claimColor[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                <p className="mt-1 font-bold text-gray-900">{money(c.amount)}</p>
              </div>
            </div>
            {c.desc && <p className="mt-2 text-sm text-gray-600">{c.desc}</p>}
            {/* Simple status tracker */}
            <div className="mt-4 flex items-center gap-1 text-xs">
              {['Submitted', 'In review', 'Approved', 'Paid'].map((step, i, arr) => {
                const order = ['Submitted', 'In review', 'Approved', 'Paid']
                const cur = order.indexOf(c.status)
                const done = i <= cur || c.status === 'Paid'
                return (
                  <span key={step} className="flex flex-1 items-center">
                    <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${done ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</span>
                    {i < arr.length - 1 && <span className={`h-0.5 flex-1 ${i < cur ? 'bg-brand-600' : 'bg-gray-200'}`} />}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
