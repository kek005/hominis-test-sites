import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { BENEFITS, INTERVIEW_PROCESS, HIRING_NOTE } from '../data/seed.js'

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
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">{job.type}</span>
            {job.level && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{job.level}</span>}
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{job.department}</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-2 text-gray-500">{job.location} · {job.salary}</p>
        </div>
        <button
          onClick={() => toggleSave(job.id)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${isSaved(job.id) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          {isSaved(job.id) ? '★ Saved' : '☆ Save role'}
        </button>
      </div>

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">About the role</h2>
        <p className="text-gray-700">{job.summary}</p>
        <p className="mt-3 text-gray-700">
          You'll join the {job.department} team at Northwind, a remote-first company that values clear communication,
          ownership, and craft. We'll give you real problems, the context to solve them, and the support to grow.
        </p>
      </section>

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

      {job.niceToHave?.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Nice to have</h2>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {job.niceToHave.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">What we offer</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
              <span className="text-xl">{b.icon}</span>
              <div><p className="text-sm font-medium text-gray-900">{b.title}</p><p className="text-xs text-gray-500">{b.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">How we hire</h2>
        <ol className="space-y-3">
          {INTERVIEW_PROCESS.map((s, i) => (
            <li key={s.step} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
              <div><p className="text-sm font-medium text-gray-900">{s.step}</p><p className="text-sm text-gray-600">{s.detail}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-8 rounded-xl bg-gray-50 p-4 text-xs text-gray-500">{HIRING_NOTE}</p>

      <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
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
