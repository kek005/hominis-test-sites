import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { WARDS, STATUSES, STAFF } from '../data/seed.js'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

const statusColor = {
  Admitted: 'bg-blue-100 text-blue-700',
  Observation: 'bg-amber-100 text-amber-700',
  Critical: 'bg-red-100 text-red-700',
  Discharged: 'bg-gray-100 text-gray-600',
}

const EMPTY = { name: '', age: '', sex: 'F', ward: 'General', diagnosis: '', doctor: STAFF[0].name, allergies: '' }

export default function Patients() {
  const { patients, admitPatient } = useStore()
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [ward, setWard] = useState('All')
  const [status, setStatus] = useState('All')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return patients.filter((p) =>
      (!q || p.name.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q) || p.diagnosis.toLowerCase().includes(q)) &&
      (ward === 'All' || p.ward === ward) &&
      (status === 'All' || p.status === status),
    )
  }, [patients, query, ward, status])

  const save = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.age || isNaN(Number(form.age))) e.age = 'Enter a valid age.'
    if (!form.diagnosis.trim()) e.diagnosis = 'Diagnosis is required.'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    const p = admitPatient({ ...form, age: Number(form.age), room: `${form.ward[0]}${200 + Math.floor(Math.random() * 99)}` })
    toast.show(`${p.name} admitted to ${p.ward}`)
    setOpen(false); setForm(EMPTY)
  }

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'
  const input = (k) => `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-gray-900">Patients</h1><p className="text-sm text-gray-500">{rows.length} of {patients.length}</p></div>
        <button onClick={() => { setForm(EMPTY); setErrors({}); setOpen(true) }} data-testid="admit-patient" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ Admit patient</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <input type="search" aria-label="Search patients" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, MRN, diagnosis…" className={`${sel} flex-1 sm:max-w-xs`} />
        <select aria-label="Filter by ward" value={ward} onChange={(e) => setWard(e.target.value)} className={sel}><option>All</option>{WARDS.map((w) => <option key={w}>{w}</option>)}</select>
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className={sel}><option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Ward / Room</th><th className="px-4 py-3">Diagnosis</th><th className="px-4 py-3">Doctor</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">No patients match your filters.</td></tr>
            ) : rows.map((p) => (
              <tr key={p.id} data-testid="patient-row" className="hover:bg-gray-50">
                <td className="px-4 py-3"><Link to={`/patient/${p.id}`} className="font-medium text-gray-900 hover:text-brand-700">{p.name}</Link><p className="text-xs text-gray-400">{p.age}{p.sex} · {p.mrn}</p></td>
                <td className="px-4 py-3 text-gray-600">{p.ward}<span className="text-gray-400"> · {p.room}</span></td>
                <td className="px-4 py-3 text-gray-600">{p.diagnosis}</td>
                <td className="px-4 py-3 text-gray-600">{p.doctor}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Admit patient" testid="admit-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Full name</span><input className={input('name')} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />{errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Age</span><input className={input('age')} value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} inputMode="numeric" />{errors.age && <span className="text-xs text-red-600">{errors.age}</span>}</label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Sex</span><select className={input('sex')} value={form.sex} onChange={(e) => setForm((f) => ({ ...f, sex: e.target.value }))}><option>F</option><option>M</option></select></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Ward</span><select className={input('ward')} value={form.ward} onChange={(e) => setForm((f) => ({ ...f, ward: e.target.value }))}>{WARDS.map((w) => <option key={w}>{w}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Attending</span><select className={input('doctor')} value={form.doctor} onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}>{STAFF.filter((s) => s.role.includes('Dr') || s.name.startsWith('Dr')).map((s) => <option key={s.id}>{s.name}</option>)}</select></label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Diagnosis</span><input className={input('diagnosis')} value={form.diagnosis} onChange={(e) => setForm((f) => ({ ...f, diagnosis: e.target.value }))} />{errors.diagnosis && <span className="text-xs text-red-600">{errors.diagnosis}</span>}</label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Known allergies</span><input className={input('allergies')} value={form.allergies} onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))} placeholder="e.g. Penicillin" /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={save} data-testid="save-patient" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Admit</button>
        </div>
      </Modal>
    </div>
  )
}
