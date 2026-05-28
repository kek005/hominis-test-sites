import { Link } from 'react-router-dom'
import { BENEFITS, VALUES, JOBS, DEPARTMENTS } from '../data/seed.js'

export default function Company() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div
        className="rounded-2xl bg-brand-700 bg-cover bg-center p-10 text-white"
        style={{ backgroundImage: "linear-gradient(rgba(6,78,59,0.80), rgba(4,47,46,0.88)), url('/img/company.jpg')" }}
      >
        <h1 className="text-3xl font-bold">Life at Northwind</h1>
        <p className="mt-3 max-w-2xl text-brand-100">
          We're a remote-first team of {120} building tools people love. We move fast, care deeply about craft,
          and look out for each other. Here's a little about how we work — and why people stay.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">See open roles</Link>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Our values</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Benefits & perks</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-gray-100 p-5">
              <div className="text-2xl">{b.icon}</div>
              <h3 className="mt-2 font-semibold text-gray-900">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900">Teams that are hiring</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {DEPARTMENTS.map((d) => {
            const n = JOBS.filter((j) => j.department === d).length
            if (n === 0) return null
            return (
              <Link key={d} to={`/?dept=${encodeURIComponent(d)}`} className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:border-brand-300 hover:text-brand-700">
                {d} <span className="text-gray-400">({n})</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
