import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function DealDetail() {
  const { id } = useParams()
  const { dealById, contactById, stages, moveDeal, addNote } = useStore()
  const toast = useToast()
  const [note, setNote] = useState('')
  const deal = dealById(id)

  if (!deal) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Deal not found.</p>
        <Link to="/pipeline" className="mt-2 inline-block text-brand-600 hover:underline">Back to pipeline</Link>
      </div>
    )
  }

  const contact = contactById(deal.contactId)

  const submitNote = (e) => {
    e.preventDefault()
    if (!note.trim()) return
    addNote(deal.id, note.trim())
    setNote('')
    toast.show('Note added')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/pipeline" className="text-sm text-gray-500 hover:text-gray-900">← Pipeline</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{deal.title}</h1>
          <p className="mt-1 text-gray-500">{deal.company} · closes {deal.close}</p>
        </div>
        <p className="text-2xl font-bold text-brand-700">{money(deal.value)}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Stage</h2>
          <select
            aria-label="Deal stage"
            value={deal.stage}
            onChange={(e) => { moveDeal(deal.id, e.target.value); toast.show(`Moved to ${e.target.value}`) }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          >
            {stages.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Primary contact</h2>
          {contact ? (
            <>
              <p className="font-medium text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.title}</p>
              <p className="mt-1 text-sm text-brand-700">{contact.email}</p>
            </>
          ) : <p className="text-sm text-gray-400">No contact linked.</p>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Notes</h2>
        <form onSubmit={submitNote} className="mb-4 flex gap-2">
          <input value={note} onChange={(e) => setNote(e.target.value)} data-testid="note-input" placeholder="Add a note…" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
          <button type="submit" data-testid="add-note" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Add</button>
        </form>
        {deal.notes?.length > 0 ? (
          <ul className="space-y-3">
            {deal.notes.map((n) => (
              <li key={n.id} data-testid="note" className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-sm text-gray-700">{n.text}</p>
                <p className="mt-1 text-xs text-gray-400">{n.at}</p>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-400">No notes yet.</p>}
      </div>
    </div>
  )
}
