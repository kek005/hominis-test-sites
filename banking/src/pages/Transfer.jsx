import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Transfer() {
  const { accounts, transfer, accountById } = useStore()
  const toast = useToast()
  const [fromId, setFromId] = useState(accounts[0]?.id || '')
  const [toId, setToId] = useState(accounts[1]?.id || '')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [errors, setErrors] = useState({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const validate = () => {
    const e = {}
    const amt = parseFloat(amount)
    if (!fromId) e.fromId = 'Select a source account.'
    if (!toId) e.toId = 'Select a destination account.'
    if (fromId && toId && fromId === toId) e.toId = 'Choose two different accounts.'
    if (!amount || isNaN(amt) || amt <= 0) e.amount = 'Enter an amount greater than $0.'
    const from = accountById(fromId)
    if (from && from.type !== 'Credit' && amt > from.balance) e.amount = 'Insufficient funds in the selected account.'
    return e
  }

  const review = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setConfirmOpen(true)
  }

  const confirm = () => {
    setBusy(true)
    setTimeout(() => {
      const res = transfer({ fromId, toId, amount: parseFloat(amount), memo })
      setBusy(false)
      setConfirmOpen(false)
      if (res.ok) {
        toast.show(`Transferred ${money(parseFloat(amount))}`)
        setAmount(''); setMemo('')
      } else {
        toast.show(res.error, 'error')
        setErrors({ amount: res.error })
      }
    }, 900)
  }

  const from = accountById(fromId)
  const to = accountById(toId)
  const input = (k) => `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">Transfer money</h1>
      <p className="mt-1 text-sm text-gray-500">Move funds between your Meridian accounts.</p>

      <form onSubmit={review} noValidate className="mt-6 grid gap-5">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">From</span>
          <select className={input('fromId')} value={fromId} onChange={(e) => setFromId(e.target.value)}>
            {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} — {money(a.balance)}</option>)}
          </select>
          {errors.fromId && <span className="mt-1 block text-xs text-red-600">{errors.fromId}</span>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">To</span>
          <select className={input('toId')} value={toId} onChange={(e) => setToId(e.target.value)}>
            {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} — {a.number}</option>)}
          </select>
          {errors.toId && <span className="mt-1 block text-xs text-red-600">{errors.toId}</span>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Amount</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input className={`${input('amount')} pl-7`} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" />
          </div>
          {errors.amount && <span data-testid="amount-error" className="mt-1 block text-xs text-red-600">{errors.amount}</span>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Memo <span className="text-gray-400">(optional)</span></span>
          <input className={input('memo')} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="e.g. Monthly savings" />
        </label>

        <button type="submit" data-testid="review-transfer" className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">
          Review transfer
        </button>
      </form>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm transfer" testid="confirm-modal">
        <p className="text-sm text-gray-600">You're about to transfer</p>
        <p className="my-2 text-3xl font-bold text-gray-900">{money(parseFloat(amount || 0))}</p>
        <p className="text-sm text-gray-600">from <span className="font-medium text-gray-900">{from?.name}</span> to <span className="font-medium text-gray-900">{to?.name}</span>.</p>
        {memo && <p className="mt-1 text-sm text-gray-500">Memo: {memo}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setConfirmOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={confirm} disabled={busy} data-testid="confirm-transfer" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">
            {busy ? 'Transferring…' : 'Confirm transfer'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
