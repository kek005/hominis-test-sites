import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-accent-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { settings, saveSettings } = useStore()
  const toast = useToast()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false) }

  const submit = (e) => {
    e.preventDefault()
    saveSettings(form)
    setSaved(true)
    toast.show('Settings saved')
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your workspace configuration.</p>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">General</h2>
          <div className="grid gap-4">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Workspace name</span><input className={input} value={form.workspaceName} onChange={(e) => set('workspaceName', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Support email</span><input className={input} value={form.supportEmail} onChange={(e) => set('supportEmail', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Timezone</span>
              <select className={input} value={form.timezone} onChange={(e) => set('timezone', e.target.value)}>
                <option>America/New_York</option><option>America/Chicago</option><option>America/Los_Angeles</option><option>Europe/London</option><option>Europe/Berlin</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Preferences</h2>
          <div className="divide-y divide-gray-100">
            <Toggle label="Require two-factor authentication" hint="All members must enable 2FA to sign in." checked={form.twoFactor} onChange={(v) => set('twoFactor', v)} />
            <Toggle label="Weekly activity digest" hint="Email a summary every Monday." checked={form.weeklyDigest} onChange={(v) => set('weeklyDigest', v)} />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" data-testid="save-settings" className="rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">Save changes</button>
          {saved && <span data-testid="saved-indicator" className="text-sm font-medium text-emerald-600">✓ Saved</span>}
        </div>
      </form>
    </div>
  )
}
