import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { STATUSES } from '../data/seed.js'
import { useToast } from '../components/Toast.jsx'

const statusColor = {
  Admitted: 'bg-blue-100 text-blue-700',
  Observation: 'bg-amber-100 text-amber-700',
  Critical: 'bg-red-100 text-red-700',
  Discharged: 'bg-gray-100 text-gray-600',
}

function Vital({ label, value, unit }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}<span className="text-xs font-normal text-gray-400"> {unit}</span></p>
    </div>
  )
}

export default function PatientDetail() {
  const { id } = useParams()
  const { patientById, setStatus, addNote } = useStore()
  const toast = useToast()
  const [note, setNote] = useState('')
  const patient = patientById(id)

  if (!patient) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Patient not found.</p>
        <Link to="/patients" className="mt-2 inline-block text-brand-600 hover:underline">Back to patients</Link>
      </div>
    )
  }

  const submitNote = (e) => {
    e.preventDefault()
    if (!note.trim()) return
    addNote(patient.id, note.trim())
    setNote('')
    toast.show('Note added to chart')
  }

  return (
    <div>
      <Link to="/patients" className="text-sm text-gray-500 hover:text-gray-900">← Patients</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[patient.status]}`}>{patient.status}</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{patient.age}{patient.sex} · {patient.mrn} · {patient.ward} {patient.room}</p>
          <p className="mt-2 text-sm"><span className="text-gray-500">Diagnosis:</span> <span className="font-medium text-gray-900">{patient.diagnosis}</span></p>
          <p className="text-sm"><span className="text-gray-500">Attending:</span> <span className="text-gray-900">{patient.doctor}</span> · admitted {patient.admitted}</p>
        </div>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Update status</span>
          <select value={patient.status} onChange={(e) => { setStatus(patient.id, e.target.value); toast.show(`Status: ${e.target.value}`) }} data-testid="status-select" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none">
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">Vitals</h2>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Vital label="Heart rate" value={patient.vitals.hr} unit="bpm" />
        <Vital label="Blood pressure" value={patient.vitals.bp} unit="mmHg" />
        <Vital label="Temp" value={patient.vitals.temp} unit="°C" />
        <Vital label="SpO₂" value={patient.vitals.spo2} unit="%" />
        <Vital label="Resp" value={patient.vitals.resp} unit="/min" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Medications</h2>
          {patient.meds.length === 0 ? <p className="text-sm text-gray-400">None on record.</p> : (
            <ul className="space-y-1 text-sm text-gray-700">{patient.meds.map((m) => <li key={m}>💊 {m}</li>)}</ul>
          )}
        </section>
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Allergies</h2>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((a) => <span key={a} className={`rounded-full px-2 py-0.5 text-xs font-medium ${a === 'None' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>{a}</span>)}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Chart notes</h2>
        <form onSubmit={submitNote} className="mb-4 flex gap-2">
          <input value={note} onChange={(e) => setNote(e.target.value)} data-testid="note-input" placeholder="Add a chart note…" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
          <button type="submit" data-testid="add-note" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Add</button>
        </form>
        <ul className="space-y-3">
          {patient.notes.map((n) => (
            <li key={n.id} data-testid="note" className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-sm text-gray-700">{n.text}</p>
              <p className="mt-1 text-xs text-gray-400">{n.author} · {n.at}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
