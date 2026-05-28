import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Saved() {
  const { saved, jobById, toggleSave } = useStore()
  const jobs = saved.map(jobById).filter(Boolean)

  if (jobs.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No saved roles yet</h1>
        <p className="mt-2 text-gray-500">Tap “Save” on any role to keep it here for later.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Browse roles</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Saved roles</h1>
      <ul className="space-y-4">
        {jobs.map((j) => (
          <li key={j.id} className="flex items-center justify-between rounded-2xl border border-gray-100 p-5">
            <div>
              <Link to={`/job/${j.id}`} className="text-lg font-semibold text-gray-900 hover:text-brand-700">{j.title}</Link>
              <p className="text-sm text-gray-500">{j.department} · {j.location}</p>
            </div>
            <button onClick={() => toggleSave(j.id)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
