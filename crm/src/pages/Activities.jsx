import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { ACTIVITY_TYPES } from '../data/seed.js'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

const typeIcon = { Call: '📞', Email: '✉', Meeting: '👥', Task: '✓' }

export default function Activities() {
  const { activities, contacts, deals, contactById, toggleActivity, addActivity } = useStore()
  const toast = useToast()
  const [filter, setFilter] = useState('open')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({ type: 'Task', title: '', contactId: '', dealId: '', due: '' })

  const list = useMemo(() => {
    let l = [...activities]
    if (filter === 'open') l = l.filter((a) => !a.done)
    if (filter === 'done') l = l.filter((a) => a.done)
    return l.sort((a, b) => a.due.localeCompare(b.due))
  }, [activities, filter])

  const save = () => {
    if (!form.title.trim()) { toast.show('Title is required', 'error'); return }
    addActivity(form)
    toast.show('Activity added')
    setAddOpen(false)
    setForm({ type: 'Task', title: '', contactId: '', dealId: '', due: '' })
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
        <button onClick={() => setAddOpen(true)} data-testid="add-activity" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ Add activity</button>
      </div>

      <div className="mt-4 flex gap-2 text-sm">
        {[['open', 'Open'], ['done', 'Completed'], ['all', 'All']].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-3 py-1 ${filter === k ? 'bg-brand-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>{label}</button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
        {list.length === 0 ? (
          <li className="px-4 py-12 text-center text-gray-400">No activities here.</li>
        ) : list.map((a) => {
          const contact = contactById(a.contactId)
          return (
            <li key={a.id} data-testid="activity-row" className="flex items-center gap-3 px-4 py-3">
              <input type="checkbox" checked={a.done} onChange={() => toggleActivity(a.id)} aria-label={`Mark ${a.title} done`} className="accent-brand-600" />
              <span className="text-lg">{typeIcon[a.type]}</span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${a.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{a.title}</p>
                <p className="text-xs text-gray-400">{a.type} · due {a.due}{contact && <> · <Link to={`/contact/${contact.id}`} className="hover:underline">{contact.name}</Link></>}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add activity" testid="activity-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Type</span><select className={input} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>{ACTIVITY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Title</span><input className={input} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Contact</span><select className={input} value={form.contactId} onChange={(e) => setForm((f) => ({ ...f, contactId: e.target.value }))}><option value="">—</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Deal</span><select className={input} value={form.dealId} onChange={(e) => setForm((f) => ({ ...f, dealId: e.target.value }))}><option value="">—</option>{deals.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}</select></label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Due date</span><input type="date" className={input} value={form.due} onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))} /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setAddOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} data-testid="save-activity" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Add</button>
        </div>
      </Modal>
    </div>
  )
}
