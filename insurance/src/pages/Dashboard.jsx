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

export default function Dashboard() {
  const { user, policies, claims, monthlyTotal, payments } = useStore()
  const openClaims = claims.filter((c) => c.status !== 'Paid' && c.status !== 'Denied').length

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
      <p className="mt-1 text-sm text-gray-500">Here's a snapshot of your coverage.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Active policies</p><p className="mt-1 text-2xl font-bold text-gray-900">{policies.length}</p></div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Monthly premium</p><p className="mt-1 text-2xl font-bold text-brand-700">{money(monthlyTotal)}</p></div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Open claims</p><p className="mt-1 text-2xl font-bold text-gray-900">{openClaims}</p></div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your policies</h2>
        <Link to="/file-claim" className="text-sm font-medium text-brand-700 hover:underline">File a claim →</Link>
      </div>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {policies.map((p) => (
          <Link key={p.id} to={`/policy/${p.id}`} data-testid="policy-card" className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl text-xl" style={{ background: p.color + '22' }}>{p.icon}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{p.status}</span>
            </div>
            <p className="mt-3 font-semibold text-gray-900">{p.name}</p>
            <p className="text-xs text-gray-400">Policy {p.number}</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{money(p.premium)}<span className="text-xs font-normal text-gray-400">/{p.cadence}</span></p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent claims</h2>
        <Link to="/claims" className="text-sm font-medium text-brand-700 hover:underline">View all →</Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {claims.slice(0, 4).map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3"><p className="font-medium text-gray-900">{c.id}</p><p className="text-xs text-gray-400">{c.type} · {c.date}</p></td>
                <td className="px-4 py-3 text-gray-600">{c.policyName}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{money(c.amount)}</td>
                <td className="px-4 py-3 text-right"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${claimColor[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">Next payment: <span className="font-medium text-gray-900">{money(monthlyTotal)}</span> on {payments[0]?.date?.replace('05', '06') || 'the 1st'}.</p>
    </div>
  )
}
