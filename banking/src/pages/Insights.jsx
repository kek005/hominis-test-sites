import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

export default function Insights() {
  const { budgets, accounts, txFor } = useStore()
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)

  // Spend by category across all accounts this period (negative amounts only).
  const spendByCat = {}
  accounts.forEach((a) => txFor(a.id).forEach((t) => {
    if (t.amount < 0) spendByCat[t.category] = (spendByCat[t.category] || 0) + -t.amount
  }))
  const cats = Object.entries(spendByCat).sort((a, b) => b[1] - a[1])
  const maxCat = Math.max(1, ...cats.map(([, v]) => v))

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Spending insights</h1>
      <p className="mt-1 text-sm text-gray-500">A look at where your money is going this month.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Budgeted</p><p className="mt-1 text-2xl font-bold text-gray-900">{money(totalLimit)}</p></div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Spent</p><p className="mt-1 text-2xl font-bold text-gray-900">{money(totalSpent)}</p></div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5"><p className="text-sm text-gray-500">Remaining</p><p className={`mt-1 text-2xl font-bold ${totalLimit - totalSpent < 0 ? 'text-red-600' : 'text-emerald-600'}`}>{money(totalLimit - totalSpent)}</p></div>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Budgets</h2>
        <div className="space-y-4">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100))
            const over = b.spent > b.limit
            return (
              <div key={b.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{b.category}</span>
                  <span className={over ? 'font-medium text-red-600' : 'text-gray-500'}>{money(b.spent)} / {money(b.limit)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full ${over ? 'bg-red-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }} /></div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Spending by category</h2>
        <div className="space-y-3">
          {cats.map(([cat, val]) => (
            <div key={cat} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-gray-600">{cat}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${(val / maxCat) * 100}%` }} /></div>
              <span className="w-20 shrink-0 text-right text-sm font-medium text-gray-700">{money(val)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
