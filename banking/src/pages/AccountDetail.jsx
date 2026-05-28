import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money, signed } from '../lib/format.js'

const PAGE_SIZE = 6

export default function AccountDetail() {
  const { id } = useParams()
  const { accountById, txFor } = useStore()
  const account = accountById(id)
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)

  const all = txFor(id)
  const categories = useMemo(() => ['All', ...new Set(all.map((t) => t.category))], [all])
  const filtered = useMemo(() => (filter === 'All' ? all : all.filter((t) => t.category === filter)), [all, filter])
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  if (!account) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Account not found.</p>
        <Link to="/dashboard" className="mt-2 inline-block text-brand-600 hover:underline">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">← Dashboard</Link>

      <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6">
        <p className="text-sm text-gray-500">{account.type} · {account.number}</p>
        <h1 className="text-2xl font-bold text-gray-900">{account.name}</h1>
        <p className={`mt-2 text-3xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-gray-900'}`}>{money(account.balance)}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
        <select
          aria-label="Filter by category"
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1) }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Description</th><th className="px-4 py-2">Category</th><th className="px-4 py-2 text-right">Amount</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slice.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No transactions in this category.</td></tr>
            ) : (
              slice.map((t) => (
                <tr key={t.id} data-testid="tx-row">
                  <td className="px-4 py-3 text-gray-500">{t.date}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{t.desc}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{t.category}</span></td>
                  <td className={`px-4 py-3 text-right font-semibold ${t.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>{signed(t.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Page {current} of {pages}</span>
          <div className="flex gap-2">
            <button disabled={current === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-gray-300 px-3 py-1.5 disabled:opacity-40">Previous</button>
            <button disabled={current === pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-gray-300 px-3 py-1.5 disabled:opacity-40">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
