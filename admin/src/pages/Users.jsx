import { useMemo, useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { ROLES, STATUSES } from '../data/seed.js'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

const PAGE_SIZE = 10
const EMPTY = { name: '', email: '', role: 'Viewer', status: 'Invited' }

const statusBadge = {
  Active: 'bg-emerald-100 text-emerald-700',
  Invited: 'bg-amber-100 text-amber-700',
  Suspended: 'bg-red-100 text-red-700',
}

export default function Users() {
  const { users, saveUser, deleteUsers, setStatus } = useStore()
  const toast = useToast()

  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All')
  const [status, setStatusFilter] = useState('All')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(new Set())

  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [confirm, setConfirm] = useState(null) // { ids: [...] }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = users.filter(
      (u) =>
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
        (role === 'All' || u.role === role) &&
        (status === 'All' || u.status === status),
    )
    list = [...list].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key]
      return sort.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
    return list
  }, [users, query, role, status, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const pageIds = slice.map((u) => u.id)
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id))

  const toggleSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))
  const toggleRow = (id) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAllOnPage = () => setSelected((s) => {
    const n = new Set(s)
    if (allOnPageSelected) pageIds.forEach((id) => n.delete(id))
    else pageIds.forEach((id) => n.add(id))
    return n
  })
  const clearSelection = () => setSelected(new Set())

  const openNew = () => { setForm(EMPTY); setErrors({}); setEditing(EMPTY) }
  const openEdit = (u) => { setForm(u); setErrors({}); setEditing(u) }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase() && u.id !== form.id)) e.email = 'That email is already in use.'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    saveUser(form)
    toast.show(form.id ? 'User updated' : 'User created')
    setEditing(null)
  }

  const doDelete = () => {
    deleteUsers(confirm.ids)
    toast.show(`${confirm.ids.length} user${confirm.ids.length !== 1 ? 's' : ''} deleted`)
    setSelected(new Set())
    setConfirm(null)
  }

  const bulkStatus = (newStatus) => {
    const ids = [...selected]
    setStatus(ids, newStatus)
    toast.show(`${ids.length} user${ids.length !== 1 ? 's' : ''} ${newStatus.toLowerCase()}`)
    clearSelection()
  }

  const sortIcon = (key) => (sort.key !== key ? '↕' : sort.dir === 'asc' ? '↑' : '↓')
  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-accent-500'}`
  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">{filtered.length} of {users.length} users</p>
        </div>
        <button onClick={openNew} data-testid="new-user" className="rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">+ New user</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <input type="search" aria-label="Search users" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Search name or email…" className={`${sel} flex-1 sm:max-w-xs`} />
        <select aria-label="Filter by role" value={role} onChange={(e) => { setRole(e.target.value); setPage(1) }} className={sel}><option>All</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
        <select aria-label="Filter by status" value={status} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className={sel}><option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      </div>

      {selected.size > 0 && (
        <div data-testid="bulk-bar" className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-brand-900 px-4 py-2.5 text-sm text-white">
          <span className="font-medium">{selected.size} selected</span>
          <div className="ml-auto flex gap-2">
            <button onClick={() => bulkStatus('Active')} className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Activate</button>
            <button onClick={() => bulkStatus('Suspended')} className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Suspend</button>
            <button onClick={() => setConfirm({ ids: [...selected] })} className="rounded-md bg-red-500 px-3 py-1.5 hover:bg-red-600">Delete</button>
            <button onClick={clearSelection} className="rounded-md px-3 py-1.5 text-brand-300 hover:text-white">Clear</button>
          </div>
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="w-10 px-4 py-3"><input type="checkbox" aria-label="Select all on page" checked={allOnPageSelected} onChange={toggleAllOnPage} /></th>
              <th className="cursor-pointer px-4 py-3 select-none" onClick={() => toggleSort('name')}>Name {sortIcon('name')}</th>
              <th className="cursor-pointer px-4 py-3 select-none" onClick={() => toggleSort('role')}>Role {sortIcon('role')}</th>
              <th className="cursor-pointer px-4 py-3 select-none" onClick={() => toggleSort('status')}>Status {sortIcon('status')}</th>
              <th className="hidden cursor-pointer px-4 py-3 select-none sm:table-cell" onClick={() => toggleSort('lastActive')}>Last active {sortIcon('lastActive')}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slice.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No users match your filters.</td></tr>
            ) : (
              slice.map((u) => (
                <tr key={u.id} data-testid="user-row" className={selected.has(u.id) ? 'bg-accent-500/5' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3"><input type="checkbox" aria-label={`Select ${u.name}`} checked={selected.has(u.id)} onChange={() => toggleRow(u.id)} /></td>
                  <td className="px-4 py-3"><p className="font-medium text-gray-900">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></td>
                  <td className="px-4 py-3 text-gray-600">{u.role}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[u.status]}`}>{u.status}</span></td>
                  <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">{u.lastActive}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(u)} className="mr-3 font-medium text-accent-600 hover:underline">Edit</button>
                    <button onClick={() => setConfirm({ ids: [u.id] })} className="text-gray-400 hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Page {current} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={current === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-gray-300 px-3 py-1.5 disabled:opacity-40">Previous</button>
          <button disabled={current === pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-gray-300 px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={form.id ? 'Edit user' : 'New user'} testid="user-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Name</span><input className={input('name')} value={form.name} onChange={set('name')} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input('email')} value={form.email} onChange={set('email')} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Role</span><select className={input('role')} value={form.role} onChange={set('role')}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Status</span><select className={input('status')} value={form.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setEditing(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} data-testid="save-user" className="rounded-lg bg-brand-900 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800">Save</button>
        </div>
      </Modal>

      <Modal open={confirm !== null} onClose={() => setConfirm(null)} title="Delete users?" testid="delete-modal">
        <p className="text-sm text-gray-600">You're about to delete <span className="font-medium text-gray-900">{confirm?.ids.length}</span> user{confirm?.ids.length !== 1 ? 's' : ''}. This can't be undone.</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setConfirm(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={doDelete} data-testid="confirm-delete" className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
        </div>
      </Modal>
    </div>
  )
}
