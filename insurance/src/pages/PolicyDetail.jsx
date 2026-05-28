import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

export default function PolicyDetail() {
  const { id } = useParams()
  const { policyById, claims } = useStore()
  const policy = policyById(id)

  if (!policy) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Policy not found.</p>
        <Link to="/dashboard" className="mt-2 inline-block text-brand-600 hover:underline">Back to dashboard</Link>
      </div>
    )
  }

  const policyClaims = claims.filter((c) => c.policyId === id)

  return (
    <div>
      <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">← Dashboard</Link>

      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6">
        <span className="grid h-14 w-14 place-items-center rounded-xl text-2xl" style={{ background: policy.color + '22' }}>{policy.icon}</span>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{policy.name}</h1>
          <p className="text-sm text-gray-500">Policy {policy.number} · renews {policy.renews}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{money(policy.premium)}</p>
          <p className="text-xs text-gray-400">per {policy.cadence}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Coverage</h2>
          <dl className="space-y-2 text-sm">
            {policy.coverage.map(([k, v]) => (
              <div key={k} className="flex justify-between"><dt className="text-gray-500">{k}</dt><dd className="font-medium text-gray-900">{v}</dd></div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Digital ID card</h2>
          <div className="rounded-xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${policy.color}, #0f172a)` }}>
            <p className="text-sm opacity-80">Assure {policy.type} Insurance</p>
            <p className="mt-3 font-mono text-lg tracking-wider">{policy.number}</p>
            <p className="mt-3 text-sm opacity-90">{policy.name}</p>
          </div>
          <Link to="/file-claim" className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">File a claim on this policy</Link>
        </section>
      </div>

      {policyClaims.length > 0 && (
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Claims on this policy</h2>
          <ul className="divide-y divide-gray-100">
            {policyClaims.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-gray-700">{c.id} · {c.type}</span>
                <span className="text-gray-500">{money(c.amount)} · {c.status}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
