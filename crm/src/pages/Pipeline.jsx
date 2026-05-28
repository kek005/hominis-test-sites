import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'
import Modal from '../components/Modal.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function Pipeline() {
  const { deals, stages, contacts, contactById, companies, moveDeal, createDeal } = useStore()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', company: companies[0]?.name || '', contactId: '', value: '', stage: 'Lead', close: '' })
  const [error, setError] = useState('')

  const move = (deal, dir) => {
    const i = stages.indexOf(deal.stage)
    const next = stages[i + dir]
    if (!next) return
    moveDeal(deal.id, next)
    toast.show(`${deal.company} → ${next}`)
  }

  const save = () => {
    if (!form.title.trim()) { setError('Deal title is required.'); return }
    createDeal(form)
    toast.show('Deal created')
    setOpen(false)
    setForm({ title: '', company: companies[0]?.name || '', contactId: '', value: '', stage: 'Lead', close: '' })
    setError('')
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <button onClick={() => setOpen(true)} data-testid="new-deal" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ New deal</button>
      </div>
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

      <Modal open={open} onClose={() => setOpen(false)} title="New deal" testid="deal-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Deal title</span><input className={input} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />{error && <span className="text-xs text-red-600">{error}</span>}</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Company</span><select className={input} value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}>{companies.map((c) => <option key={c.id}>{c.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Value ($)</span><input className={input} value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} inputMode="numeric" /></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Stage</span><select className={input} value={form.stage} onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}>{stages.map((s) => <option key={s}>{s}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Expected close</span><input type="date" className={input} value={form.close} onChange={(e) => setForm((f) => ({ ...f, close: e.target.value }))} /></label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Primary contact</span><select className={input} value={form.contactId} onChange={(e) => setForm((f) => ({ ...f, contactId: e.target.value }))}><option value="">—</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} data-testid="save-deal" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Create deal</button>
        </div>
      </Modal>
    </div>
  )
}
