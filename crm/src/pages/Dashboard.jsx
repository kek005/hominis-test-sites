import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const { user, deals, contacts, stages } = useStore()
  const open = deals.filter((d) => d.stage !== 'Won')
  const won = deals.filter((d) => d.stage === 'Won')
  const pipelineValue = open.reduce((s, d) => s + d.value, 0)
  const wonValue = won.reduce((s, d) => s + d.value, 0)

  const byStage = stages.map((st) => ({ stage: st, count: deals.filter((d) => d.stage === st).length, value: deals.filter((d) => d.stage === st).reduce((s, d) => s + d.value, 0) }))
  const maxValue = Math.max(1, ...byStage.map((b) => b.value))

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
      <p className="mt-1 text-sm text-gray-500">Here's how your pipeline looks today.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Open deals" value={open.length} />
        <Stat label="Pipeline value" value={money(pipelineValue)} accent="text-brand-700" />
        <Stat label="Won this period" value={money(wonValue)} accent="text-emerald-600" />
        <Stat label="Contacts" value={contacts.length} />
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Pipeline by stage</h2>
          <Link to="/pipeline" className="text-sm font-medium text-brand-700 hover:underline">Open board →</Link>
        </div>
        <div className="space-y-3">
          {byStage.map((b) => (
            <div key={b.stage} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-gray-600">{b.stage}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${(b.value / maxValue) * 100}%` }} />
              </div>
              <span className="w-24 shrink-0 text-right text-sm font-medium text-gray-700">{money(b.value)}</span>
              <span className="w-8 shrink-0 text-right text-xs text-gray-400">{b.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
