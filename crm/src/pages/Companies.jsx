import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function Companies() {
  const { companies, deals, contacts } = useStore()
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return companies
      .filter((c) => !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q))
      .map((c) => ({
        ...c,
        contactCount: contacts.filter((p) => p.company === c.name).length,
        openValue: deals.filter((d) => d.company === c.name && d.stage !== 'Won').reduce((s, d) => s + d.value, 0),
      }))
  }, [companies, deals, contacts, query])

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
      <input type="search" aria-label="Search companies" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search companies or industries…" className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none sm:max-w-sm" />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <div key={c.id} data-testid="company-card" className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 font-bold text-brand-700">{c.name[0]}</div>
              <div><p className="font-semibold text-gray-900">{c.name}</p><p className="text-xs text-gray-400">{c.industry} · {c.size}</p></div>
            </div>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Location</dt><dd className="text-gray-900">{c.location}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Contacts</dt><dd className="text-gray-900">{c.contactCount}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Open pipeline</dt><dd className="font-medium text-brand-700">{money(c.openValue)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-brand-700">{c.website}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
