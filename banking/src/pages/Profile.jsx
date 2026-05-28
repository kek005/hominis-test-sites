import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div><p className="text-sm font-medium text-gray-900">{label}</p>{hint && <p className="text-xs text-gray-400">{hint}</p>}</div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-brand-600' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Profile() {
  const { profile, updateProfile, toggleAlert } = useStore()
  const toast = useToast()
  const [form, setForm] = useState({ email: profile.email, phone: profile.phone, address: profile.address })

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Profile & security</h1>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Contact details</h2>
        <div className="grid gap-4">
          <div><p className="text-xs font-medium uppercase tracking-wide text-gray-400">Name</p><p className="text-gray-900">{profile.name}</p></div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Email</span><input className={input} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Phone</span><input className={input} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Mailing address</span><input className={input} value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} /></label>
        </div>
        <button onClick={() => { updateProfile(form); toast.show('Profile updated') }} data-testid="save-profile" className="mt-4 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Save changes</button>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Security</h2>
        <div className="divide-y divide-gray-100">
          <Toggle label="Two-factor authentication" hint="Require a code at sign-in." checked={profile.twoFactor} onChange={() => { updateProfile({ twoFactor: !profile.twoFactor }); toast.show('Security updated') }} />
          <Toggle label="Paperless statements" hint="Email statements instead of mail." checked={profile.paperless} onChange={() => { updateProfile({ paperless: !profile.paperless }); toast.show('Preference saved') }} />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Alerts</h2>
        <div className="divide-y divide-gray-100">
          <Toggle label="Large transaction alerts" hint="Notify me about transactions over $500." checked={profile.alerts.largeTransactions} onChange={() => toggleAlert('largeTransactions')} />
          <Toggle label="Low balance alerts" hint="Notify me when a balance drops below $100." checked={profile.alerts.lowBalance} onChange={() => toggleAlert('lowBalance')} />
          <Toggle label="Product news & offers" checked={profile.alerts.marketing} onChange={() => toggleAlert('marketing')} />
        </div>
      </section>
    </div>
  )
}
