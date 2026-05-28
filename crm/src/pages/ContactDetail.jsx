import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const typeIcon = { Call: '📞', Email: '✉', Meeting: '👥', Task: '✓' }

export default function ContactDetail() {
  const { id } = useParams()
  const { contactById, companyByName, dealsForContact, activitiesForContact } = useStore()
  const contact = contactById(id)

  if (!contact) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-700">Contact not found.</p>
        <Link to="/contacts" className="mt-2 inline-block text-brand-600 hover:underline">Back to contacts</Link>
      </div>
    )
  }

  const company = companyByName(contact.company)
  const deals = dealsForContact(id)
  const activities = activitiesForContact(id).slice().sort((a, b) => a.due.localeCompare(b.due))
  const initials = contact.name.split(' ').map((w) => w[0]).slice(0, 2).join('')

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/contacts" className="text-sm text-gray-500 hover:text-gray-900">← Contacts</Link>

      <div className="mt-4 flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">{initials}</div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
          <p className="text-gray-500">{contact.title} · {contact.company}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${contact.email}`} className="text-brand-700 hover:underline">{contact.email}</a>
            <span className="text-gray-600">{contact.phone}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Deals ({deals.length})</h2>
          {deals.length === 0 ? <p className="text-sm text-gray-400">No deals linked.</p> : (
            <ul className="space-y-2">
              {deals.map((d) => (
                <li key={d.id}>
                  <Link to={`/deal/${d.id}`} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50">
                    <span className="text-sm font-medium text-gray-900">{d.title}</span>
                    <span className="text-sm text-gray-500">{money(d.value)} · {d.stage}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Company</h2>
          {company ? (
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Industry</dt><dd className="text-gray-900">{company.industry}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Size</dt><dd className="text-gray-900">{company.size}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Location</dt><dd className="text-gray-900">{company.location}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Website</dt><dd className="text-brand-700">{company.website}</dd></div>
            </dl>
          ) : <p className="text-sm text-gray-400">No company record.</p>}
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Activity timeline</h2>
        {activities.length === 0 ? <p className="text-sm text-gray-400">No activities yet.</p> : (
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">{typeIcon[a.type]}</span>
                <div className="flex-1">
                  <p className={`text-sm ${a.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{a.title}</p>
                  <p className="text-xs text-gray-400">{a.type} · due {a.due}{a.done && ' · done'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
