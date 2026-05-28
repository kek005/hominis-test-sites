import { Link, useLocation, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Confirmation() {
  const { id } = useParams()
  const location = useLocation()
  const { jobById, applications } = useStore()
  const job = jobById(id)
  const ref = location.state?.ref || applications.find((a) => a.jobId === id)?.ref

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-3xl">✓</div>
      <h1 className="text-2xl font-bold text-gray-900">Application submitted</h1>
      <p className="mt-2 text-gray-600">
        Thanks for applying to <span className="font-semibold text-gray-900">{job?.title}</span>. Our team will review your
        application and reach out by email.
      </p>
      {ref && (
        <p className="mt-4 inline-block rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-600">
          Reference: <span data-testid="application-ref" className="font-mono font-semibold text-gray-900">{ref}</span>
        </p>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Browse more roles</Link>
        <Link to="/saved" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Saved roles</Link>
      </div>
    </div>
  )
}
