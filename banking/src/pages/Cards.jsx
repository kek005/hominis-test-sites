import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

export default function Cards() {
  const { cards, toggleCardFreeze, setCardLimit, accountById } = useStore()
  const toast = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Your cards</h1>
      <p className="mt-1 text-sm text-gray-500">Freeze a card instantly or adjust its monthly spending limit.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {cards.map((c) => {
          const pct = Math.min(100, Math.round((c.spentThisMonth / c.monthlyLimit) * 100))
          const account = accountById(c.accountId)
          return (
            <div key={c.id} data-testid="card-tile" className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="rounded-xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${c.color}, #000)` }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.name}</span>
                  {c.frozen && <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">Frozen</span>}
                </div>
                <p className="mt-6 font-mono text-lg tracking-widest">{c.number}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-white/80">
                  <span>{c.type}</span><span>Exp {c.expiry}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">Linked to {account?.name}</p>

              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">This month</span>
                  <span className="font-medium text-gray-900">{money(c.spentThisMonth)} / {money(c.monthlyLimit)}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${pct > 90 ? 'bg-red-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => { toggleCardFreeze(c.id); toast.show(c.frozen ? 'Card unfrozen' : 'Card frozen') }}
                  data-testid="freeze-card"
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${c.frozen ? 'bg-brand-600 text-white hover:bg-brand-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  {c.frozen ? 'Unfreeze card' : 'Freeze card'}
                </button>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  Monthly limit
                  <select value={c.monthlyLimit} onChange={(e) => { setCardLimit(c.id, Number(e.target.value)); toast.show('Limit updated') }} className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-brand-500 focus:outline-none">
                    {[1000, 2000, 3000, 5000, 10000].map((v) => <option key={v} value={v}>{money(v)}</option>)}
                  </select>
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
