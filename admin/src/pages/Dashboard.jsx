import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { SIGNUPS, AUDIT_EVENTS, ROLES } from '../data/seed.js'

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-emerald-600">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { users } = useStore()
  const active = users.filter((u) => u.status === 'Active').length
  const invited = users.filter((u) => u.status === 'Invited').length
  const suspended = users.filter((u) => u.status === 'Suspended').length
  const totalSignups = SIGNUPS.reduce((s, d) => s + d.signups, 0)
  const maxSignup = Math.max(...SIGNUPS.map((d) => d.signups))

  const roleCounts = ROLES.map((r) => ({ role: r, count: users.filter((u) => u.role === r).length }))
  const maxRole = Math.max(1, ...roleCounts.map((r) => r.count))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Workspace activity over the last 14 days.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Total users" value={users.length} sub={`+${totalSignups} in 14 days`} />
        <Stat label="Active" value={active} />
        <Stat label="Invited" value={invited} />
        <Stat label="Suspended" value={suspended} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">New signups</h2>
          <div className="flex h-40 items-end gap-1.5">
            {SIGNUPS.map((d) => (
              <div key={d.date} className="group flex flex-1 flex-col items-center justify-end" title={`${d.date}: ${d.signups}`}>
                <div className="w-full rounded-t bg-accent-500 transition group-hover:bg-accent-600" style={{ height: `${(d.signups / maxSignup) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-400"><span>{SIGNUPS[0].date}</span><span>{SIGNUPS[SIGNUPS.length - 1].date}</span></div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Users by role</h2>
          <div className="space-y-3">
            {roleCounts.map((r) => (
              <div key={r.role} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-sm text-gray-600">{r.role}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-brand-700" style={{ width: `${(r.count / maxRole) * 100}%` }} /></div>
                <span className="w-8 shrink-0 text-right text-sm font-medium text-gray-700">{r.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
          <Link to="/audit" className="text-sm font-medium text-accent-600 hover:underline">View audit log →</Link>
        </div>
        <ul className="divide-y divide-gray-100">
          {AUDIT_EVENTS.slice(0, 6).map((e) => (
            <li key={e.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-gray-700"><span className="font-medium text-gray-900">{e.actor}</span> · {e.message}</span>
              <span className="text-xs text-gray-400">{e.at}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
