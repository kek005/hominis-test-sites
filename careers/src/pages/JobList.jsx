import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { JOBS, DEPARTMENTS, LOCATIONS, TYPES } from '../data/seed.js'
import { useStore } from '../lib/store.jsx'

function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 p-5">
      <div className="mb-3 h-5 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
    </div>
  )
}

export default function JobList() {
  const { isSaved, toggleSave } = useStore()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [loc, setLoc] = useState('All')
  const [type, setType] = useState('All')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const jobs = useMemo(
    () =>
      JOBS.filter((j) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || j.title.toLowerCase().includes(q) || j.summary.toLowerCase().includes(q)) &&
          (dept === 'All' || j.department === dept) &&
          (loc === 'All' || j.location === loc) &&
          (type === 'All' || j.type === type)
        )
      }),
    [query, dept, loc, type],
  )

  const sel = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div
        className="mb-8 rounded-2xl bg-brand-700 bg-cover bg-center p-8 text-white"
        style={{ backgroundImage: "linear-gradient(rgba(6,78,59,0.82), rgba(4,47,46,0.88)), url('/img/hero.jpg')" }}
      >
        <h1 className="text-3xl font-bold">Build the future with us</h1>
        <p className="mt-2 max-w-xl text-brand-100">
          Northwind is hiring across engineering, design, product, and more. Find your next role.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input type="search" aria-label="Search roles" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles…" className={sel} />
        <select aria-label="Department" value={dept} onChange={(e) => setDept(e.target.value)} className={sel}>
          <option>All</option>{DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select aria-label="Location" value={loc} onChange={(e) => setLoc(e.target.value)} className={sel}>
          <option>All</option>{LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)} className={sel}>
          <option>All</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">{loading ? 'Loading roles…' : `${jobs.length} open role${jobs.length !== 1 ? 's' : ''}`}</p>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)}</div>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
          <p className="text-lg font-medium">No roles match your filters.</p>
          <p className="text-sm">Try widening your search.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {jobs.map((j) => (
            <li key={j.id} data-testid="job-card" className="flex items-start gap-4 rounded-2xl border border-gray-100 p-5 transition hover:shadow-md">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link to={`/job/${j.id}`} className="text-lg font-semibold text-gray-900 hover:text-brand-700">{j.title}</Link>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">{j.type}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{j.department} · {j.location} · {j.salary}</p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{j.summary}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  onClick={() => toggleSave(j.id)}
                  aria-pressed={isSaved(j.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${isSaved(j.id) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  {isSaved(j.id) ? 'Saved' : 'Save'}
                </button>
                <Link to={`/job/${j.id}`} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
