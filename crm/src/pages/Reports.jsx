import { useStore } from '../lib/store.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function Stat({ label, value, accent }) {
  return <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">{label}</p><p className={`mt-1 text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</p></div>
}

export default function Reports() {
  const { deals, stages, activities } = useStore()
  const won = deals.filter((d) => d.stage === 'Won')
  const open = deals.filter((d) => d.stage !== 'Won')
  const wonValue = won.reduce((s, d) => s + d.value, 0)
  const openValue = open.reduce((s, d) => s + d.value, 0)
  const winRate = deals.length ? Math.round((won.length / deals.length) * 100) : 0
  const avgDeal = deals.length ? Math.round(deals.reduce((s, d) => s + d.value, 0) / deals.length) : 0

  const byStage = stages.map((st) => ({ stage: st, count: deals.filter((d) => d.stage === st).length, value: deals.filter((d) => d.stage === st).reduce((s, d) => s + d.value, 0) }))
  const maxStage = Math.max(1, ...byStage.map((b) => b.value))

  // Leaderboard of companies by total deal value.
  const byCompany = {}
  deals.forEach((d) => { byCompany[d.company] = (byCompany[d.company] || 0) + d.value })
  const leaderboard = Object.entries(byCompany).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const openTasks = activities.filter((a) => !a.done).length

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      <p className="mt-1 text-sm text-gray-500">Pipeline health at a glance.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Win rate" value={`${winRate}%`} accent="text-emerald-600" />
        <Stat label="Open pipeline" value={money(openValue)} accent="text-brand-700" />
        <Stat label="Won value" value={money(wonValue)} accent="text-emerald-600" />
        <Stat label="Avg deal size" value={money(avgDeal)} />
      </div>

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Value by stage</h2>
        <div className="space-y-3">
          {byStage.map((b) => (
            <div key={b.stage} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-gray-600">{b.stage}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${(b.value / maxStage) * 100}%` }} /></div>
              <span className="w-24 shrink-0 text-right text-sm font-medium text-gray-700">{money(b.value)}</span>
              <span className="w-8 shrink-0 text-right text-xs text-gray-400">{b.count}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top accounts</h2>
          <ol className="space-y-2">
            {leaderboard.map(([name, value], i) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span className="text-gray-700"><span className="mr-2 text-gray-400">{i + 1}.</span>{name}</span>
                <span className="font-medium text-gray-900">{money(value)}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Activity</h2>
          <p className="text-sm text-gray-600">{openTasks} open activit{openTasks !== 1 ? 'ies' : 'y'} across your accounts.</p>
          <p className="mt-2 text-sm text-gray-600">{won.length} deals won · {open.length} in progress.</p>
        </section>
      </div>
    </div>
  )
}
