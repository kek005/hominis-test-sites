import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function JobDetail() {
  const { id } = useParams()
  const { jobById, isSaved, toggleSave, hasApplied } = useStore()
  const job = jobById(id)

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-700">Role not found.</p>
        <Link to="/" className="mt-2 inline-block text-brand-600 hover:underline">Back to open roles</Link>
      </div>
    )
  }

  const applied = hasApplied(job.id)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← All roles</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-2 text-gray-500">{job.department} · {job.location} · {job.type}</p>
          <p className="mt-1 font-medium text-gray-700">{job.salary}</p>
        </div>
        <button
          onClick={() => toggleSave(job.id)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${isSaved(job.id) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          {isSaved(job.id) ? '★ Saved' : '☆ Save role'}
        </button>
      </div>

      <p className="mt-6 text-gray-700">{job.summary}</p>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What you'll do</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What we're looking for</h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {job.requirements.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <div className="mt-10 flex items-center gap-4 border-t border-gray-100 pt-6">
        {applied ? (
          <span className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">✓ Application submitted</span>
        ) : (
          <Link to={`/job/${job.id}/apply`} className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">
            Apply now
          </Link>
        )}
        <span className="text-sm text-gray-400">Posted {job.posted}</span>
      </div>
    </div>
  )
}
