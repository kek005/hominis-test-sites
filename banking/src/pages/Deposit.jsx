import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

export default function Deposit() {
  const { accounts, depositCheck } = useStore()
  const toast = useToast()
  const [accountId, setAccountId] = useState(accounts.find((a) => a.type !== 'Credit')?.id || accounts[0]?.id)
  const [amount, setAmount] = useState('')
  const [front, setFront] = useState(false)
  const [back, setBack] = useState(false)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)
  const [busy, setBusy] = useState(false)

  const input = (k) => `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    const amt = parseFloat(amount)
    if (!amount || isNaN(amt) || amt <= 0) err.amount = 'Enter the check amount.'
    if (!front) err.front = 'Capture the front of the check.'
    if (!back) err.back = 'Capture the back of the check.'
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setBusy(true)
    setTimeout(() => {
      depositCheck({ accountId, amount: amt })
      setBusy(false)
      setDone({ amount: amt, account: accounts.find((a) => a.id === accountId)?.name })
      toast.show(`Deposited ${money(amt)}`)
      setAmount(''); setFront(false); setBack(false)
    }, 1000)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✓</div>
        <h1 className="text-2xl font-bold text-gray-900">Deposit submitted</h1>
        <p className="mt-2 text-gray-600">{money(done.amount)} is being deposited to {done.account}. Funds are typically available within 1 business day.</p>
        <button onClick={() => setDone(null)} className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Deposit another check</button>
      </div>
    )
  }

  const Capture = ({ side, value, onCapture, error }) => (
    <button type="button" onClick={onCapture} className={`flex aspect-[16/9] flex-col items-center justify-center rounded-xl border-2 border-dashed text-sm ${error ? 'border-red-400' : value ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}`}>
      <span className="text-2xl">{value ? '✓' : '📷'}</span>
      <span className={value ? 'text-emerald-700' : 'text-gray-500'}>{value ? `${side} captured` : `Capture ${side.toLowerCase()}`}</span>
    </button>
  )

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">Deposit a check</h1>
      <p className="mt-1 text-sm text-gray-500">Snap the front and back, enter the amount, and submit.</p>

      <form onSubmit={submit} className="mt-6 grid gap-5">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Deposit to</span>
          <select className={input('accountId')} value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            {accounts.filter((a) => a.type !== 'Credit').map((a) => <option key={a.id} value={a.id}>{a.name} — {money(a.balance)}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Check amount</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span><input className={`${input('amount')} pl-7`} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" /></div>
          {errors.amount && <span className="mt-1 block text-xs text-red-600">{errors.amount}</span>}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Capture side="Front" value={front} onCapture={() => setFront(true)} error={errors.front} />
          <Capture side="Back" value={back} onCapture={() => setBack(true)} error={errors.back} />
        </div>
        <button type="submit" disabled={busy} data-testid="submit-deposit" className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">{busy ? 'Submitting…' : 'Submit deposit'}</button>
      </form>
    </div>
  )
}
