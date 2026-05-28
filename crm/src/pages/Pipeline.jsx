import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function Pipeline() {
  const { deals, stages, contactById, moveDeal } = useStore()
  const toast = useToast()

  const move = (deal, dir) => {
    const i = stages.indexOf(deal.stage)
    const next = stages[i + dir]
    if (!next) return
    moveDeal(deal.id, next)
    toast.show(`${deal.company} → ${next}`)
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Pipeline</h1>
      <p className="mb-6 text-sm text-gray-500">Move deals across stages with the arrows, or open a deal to add notes.</p>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const col = deals.filter((d) => d.stage === stage)
          const total = col.reduce((s, d) => s + d.value, 0)
          return (
            <div key={stage} data-testid="kanban-column" data-stage={stage} className="flex w-72 shrink-0 flex-col rounded-2xl bg-gray-100/70 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-gray-700">{stage}</h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500">{col.length}</span>
              </div>
              <p className="mb-2 px-1 text-xs text-gray-400">{money(total)}</p>
              <div className="flex flex-col gap-2">
                {col.map((d) => {
                  const i = stages.indexOf(d.stage)
                  const contact = contactById(d.contactId)
                  return (
                    <div key={d.id} data-testid="deal-card" className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                      <Link to={`/deal/${d.id}`} className="block font-medium text-gray-900 hover:text-brand-700">{d.title}</Link>
                      <p className="mt-0.5 text-xs text-gray-400">{contact?.name || d.company}</p>
                      <p className="mt-2 text-sm font-bold text-gray-900">{money(d.value)}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <button onClick={() => move(d, -1)} disabled={i === 0} aria-label="Move back a stage" className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30">←</button>
                        {d.notes?.length > 0 && <span className="text-xs text-gray-400">{d.notes.length} note{d.notes.length !== 1 ? 's' : ''}</span>}
                        <button onClick={() => move(d, 1)} disabled={i === stages.length - 1} aria-label="Advance a stage" className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30">→</button>
                      </div>
                    </div>
                  )
                })}
                {col.length === 0 && <p className="rounded-xl border border-dashed border-gray-300 py-6 text-center text-xs text-gray-400">No deals</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
