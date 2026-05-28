import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Login() {
  const { login, auth } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (auth) return <Navigate to="/users" replace />

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    setTimeout(() => {
      const res = login(email, password)
      setBusy(false)
      if (res.ok) navigate(location.state?.from || '/users', { replace: true })
      else setError(res.error)
    }, 600)
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-accent-500 focus:outline-none'

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 p-4 font-sans">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2 text-xl font-bold text-brand-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-900 text-white">C</span>
          Console Admin
        </div>
        <h1 className="text-lg font-semibold text-gray-900">Sign in to your workspace</h1>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          {error && <div data-testid="login-error" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
            <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
            <input type="password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </label>
          <button disabled={busy} className="rounded-lg bg-brand-900 px-4 py-2.5 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
          Demo login: <span className="font-mono text-gray-700">demo@hominis.test</span> / <span className="font-mono text-gray-700">password</span>
        </div>
      </div>
    </div>
  )
}
