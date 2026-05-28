import { useMemo, useState } from 'react'
import { useStore } from '../lib/store.jsx'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

const EMPTY = { name: '', title: '', company: '', email: '', phone: '' }

export default function Contacts() {
  const { contacts, saveContact, deleteContact } = useStore()
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null) // null | EMPTY | contact
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contacts.filter((c) => !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }, [contacts, query])

  const openNew = () => { setForm(EMPTY); setErrors({}); setEditing(EMPTY) }
  const openEdit = (c) => { setForm(c); setErrors({}); setEditing(c) }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.company.trim()) e.company = 'Company is required.'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    saveContact(form)
    toast.show(form.id ? 'Contact updated' : 'Contact added')
    setEditing(null)
  }

  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <button onClick={openNew} data-testid="add-contact" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ Add contact</button>
      </div>

      <input type="search" aria-label="Search contacts" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, company, or email…" className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none sm:max-w-sm" />

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Company</th><th className="hidden px-4 py-2 sm:table-cell">Email</th><th className="px-4 py-2"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-400">No contacts match your search.</td></tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} data-testid="contact-row" className="hover:bg-gray-50">
                  <td className="px-4 py-3"><p className="font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-400">{c.title}</p></td>
                  <td className="px-4 py-3 text-gray-600">{c.company}</td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{c.email}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(c)} className="mr-2 text-brand-700 hover:underline">Edit</button>
                    <button onClick={() => setConfirmDelete(c)} className="text-gray-400 hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={form.id ? 'Edit contact' : 'Add contact'} testid="contact-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Name</span><input className={input('name')} value={form.name} onChange={set('name')} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Title</span><input className={input('title')} value={form.title} onChange={set('title')} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Company</span><input className={input('company')} value={form.company} onChange={set('company')} />{errors.company && <span className="text-xs text-red-600">{errors.company}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={form.email} onChange={set('email')} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Phone</span><input className={input('phone')} value={form.phone} onChange={set('phone')} /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setEditing(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} data-testid="save-contact" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Save</button>
        </div>
      </Modal>

      <Modal open={confirmDelete !== null} onClose={() => setConfirmDelete(null)} title="Delete contact?" testid="delete-modal">
        <p className="text-sm text-gray-600">Remove <span className="font-medium text-gray-900">{confirmDelete?.name}</span> from your contacts? This can't be undone.</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { deleteContact(confirmDelete.id); toast.show('Contact deleted'); setConfirmDelete(null) }} className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
        </div>
      </Modal>
    </div>
  )
}
