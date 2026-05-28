import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money, signed } from '../lib/format.js'

const typeColor = {
  Checking: 'bg-brand-50 text-brand-700',
  Savings: 'bg-emerald-50 text-emerald-700',
  Credit: 'bg-purple-50 text-purple-700',
}

export default function Dashboard() {
  const { user, accounts, netWorth, txFor } = useStore()
  const recent = accounts
    .flatMap((a) => txFor(a.id).map((t) => ({ ...t, account: a.name })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-500">Good to see you,</p>
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
      </div>

      <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
        <p className="text-sm text-brand-100">Total balance</p>
        <p data-testid="net-worth" className="mt-1 text-3xl font-bold">{money(netWorth)}</p>
      </div>

      <h2 className="mb-3 text-lg font-semibold text-gray-900">Your accounts</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {accounts.map((a) => (
          <Link key={a.id} to={`/account/${a.id}`} data-testid="account-card" className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md">
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColor[a.type]}`}>{a.type}</span>
            <p className="mt-3 font-semibold text-gray-900">{a.name}</p>
            <p className="text-xs text-gray-400">{a.number}</p>
            <p className={`mt-2 text-xl font-bold ${a.balance < 0 ? 'text-red-600' : 'text-gray-900'}`}>{money(a.balance)}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/transfer" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Make a transfer</Link>
        <Link to="/statements" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">View statements</Link>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-gray-900">Recent activity</h2>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {recent.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{t.desc}</p>
                  <p className="text-xs text-gray-400">{t.account} · {t.date}</p>
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${t.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>{signed(t.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
