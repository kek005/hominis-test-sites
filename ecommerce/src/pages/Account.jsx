import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'

const statusColor = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
}

export default function Account() {
  const { user, orders } = useStore()
  const [tab, setTab] = useState('orders')

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign in to view your account</h1>
        <p className="mt-2 text-gray-500">Your orders, profile, and addresses live here.</p>
        <Link to="/login" state={{ from: '/account' }} className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">My account</h1>
      <p className="mt-1 text-sm text-gray-500">{user.name} · {user.email}</p>

      <div className="mt-6 flex gap-6 border-b border-gray-200 text-sm font-medium">
        {['orders', 'profile', 'addresses'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-1 pb-3 capitalize ${tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} data-testid="order-row" className="rounded-2xl border border-gray-100 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><p className="font-semibold text-gray-900">{o.id}</p><p className="text-sm text-gray-500">Placed {o.date}</p></div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">{o.items.map((it) => <li key={it.id}>{it.qty} × {it.name}</li>)}</ul>
                <p className="mt-3 text-right font-bold text-gray-900">{money(o.total)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && (
          <div className="max-w-md space-y-4 rounded-2xl border border-gray-100 p-6">
            <div><p className="text-xs font-medium uppercase tracking-wide text-gray-500">Name</p><p className="text-gray-900">{user.name}</p></div>
            <div><p className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</p><p className="text-gray-900">{user.email}</p></div>
            <div><p className="text-xs font-medium uppercase tracking-wide text-gray-500">Phone</p><p className="text-gray-900">{user.phone}</p></div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Edit profile</button>
          </div>
        )}

        {tab === 'addresses' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {user.addresses.map((a) => (
              <div key={a.id} className="rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{a.label}</p>
                  {a.default && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">Default</span>}
                </div>
                <p className="mt-2 text-sm text-gray-600">{a.line1}</p>
                <p className="text-sm text-gray-600">{a.city}, {a.state} {a.zip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
