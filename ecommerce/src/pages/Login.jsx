import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    setTimeout(() => {
      const res = login(email, password)
      setBusy(false)
      if (res.ok) navigate(location.state?.from || '/account')
      else setError(res.error)
    }, 600)
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
      <p className="mt-1 text-sm text-gray-500">Access your orders and saved details.</p>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        {error && <div data-testid="login-error" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
          <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
          <input type="password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button disabled={busy} className="rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
        Demo login: <span className="font-mono text-gray-700">demo@hominis.test</span> / <span className="font-mono text-gray-700">password</span>
      </div>
    </div>
  )
}
