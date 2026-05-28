import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

export default function BillPay() {
  const { accounts, payees, scheduled, payBill, addPayee, cancelScheduled } = useStore()
  const toast = useToast()
  const [fromId, setFromId] = useState(accounts[0]?.id || '')
  const [payeeId, setPayeeId] = useState(payees[0]?.id || '')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [memo, setMemo] = useState('')
  const [errors, setErrors] = useState({})
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [newPayee, setNewPayee] = useState({ name: '', category: '', account: '' })

  const input = (k) => `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none ${errors[k] ? 'border-red-400' : 'border-gray-300 focus:border-brand-500'}`

  const validate = () => {
    const e = {}
    const amt = parseFloat(amount)
    if (!amount || isNaN(amt) || amt <= 0) e.amount = 'Enter an amount greater than $0.'
    if (!payeeId) e.payeeId = 'Select a payee.'
    return e
  }
  const review = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setConfirm(true)
  }
  const confirmPay = () => {
    setBusy(true)
    setTimeout(() => {
      const res = payBill({ fromId, payeeId, amount: parseFloat(amount), date, memo })
      setBusy(false); setConfirm(false)
      if (res.ok) {
        toast.show(res.scheduled ? 'Payment scheduled' : 'Payment sent')
        setAmount(''); setMemo(''); setDate('')
      } else { toast.show(res.error, 'error'); setErrors({ amount: res.error }) }
    }, 800)
  }

  const payee = payees.find((p) => p.id === payeeId)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900">Pay a bill</h1>
        <p className="mt-1 text-sm text-gray-500">Send a one-time or future-dated payment to a payee.</p>

        <form onSubmit={review} noValidate className="mt-6 grid gap-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Pay from</span>
            <select className={input('fromId')} value={fromId} onChange={(e) => setFromId(e.target.value)}>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} — {money(a.balance)}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">Payee <button type="button" onClick={() => setAddOpen(true)} className="text-xs font-medium text-brand-700 hover:underline">+ Add payee</button></span>
            <select className={input('payeeId')} value={payeeId} onChange={(e) => setPayeeId(e.target.value)}>
              {payees.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.account})</option>)}
            </select>
            {errors.payeeId && <span className="mt-1 block text-xs text-red-600">{errors.payeeId}</span>}
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Amount</span>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span><input className={`${input('amount')} pl-7`} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" /></div>
            {errors.amount && <span data-testid="amount-error" className="mt-1 block text-xs text-red-600">{errors.amount}</span>}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Send date <span className="text-gray-400">(optional)</span></span><input type="date" className={input('date')} value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Memo</span><input className={input('memo')} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Account #, note…" /></label>
          </div>
          <button type="submit" data-testid="review-bill" className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">Review payment</button>
        </form>
      </div>

      <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Upcoming payments</h2>
        {scheduled.length === 0 ? (
          <p className="text-sm text-gray-400">No scheduled payments.</p>
        ) : (
          <ul className="space-y-3">
            {scheduled.map((s) => (
              <li key={s.id} data-testid="scheduled-row" className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{s.payee}</p>
                  <span className="font-semibold text-gray-900">{money(s.amount)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{s.date} · {s.frequency}</span>
                  <button onClick={() => { cancelScheduled(s.id); toast.show('Payment cancelled') }} className="text-gray-400 hover:text-red-600">Cancel</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Confirm payment" testid="confirm-modal">
        <p className="text-sm text-gray-600">Pay</p>
        <p className="my-2 text-3xl font-bold text-gray-900">{money(parseFloat(amount || 0))}</p>
        <p className="text-sm text-gray-600">to <span className="font-medium text-gray-900">{payee?.name}</span>{date && <> on <span className="font-medium text-gray-900">{date}</span></>}.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setConfirm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={confirmPay} disabled={busy} data-testid="confirm-bill" className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-400">{busy ? 'Sending…' : 'Confirm'}</button>
        </div>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add payee" testid="add-payee-modal">
        <div className="grid gap-3">
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Name</span><input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" value={newPayee.name} onChange={(e) => setNewPayee((p) => ({ ...p, name: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Category</span><input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" value={newPayee.category} onChange={(e) => setNewPayee((p) => ({ ...p, category: e.target.value }))} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Account number</span><input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" value={newPayee.account} onChange={(e) => setNewPayee((p) => ({ ...p, account: e.target.value }))} placeholder="••• 0000" /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setAddOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { if (!newPayee.name.trim()) return; const p = addPayee(newPayee); setPayeeId(p.id); setAddOpen(false); setNewPayee({ name: '', category: '', account: '' }); toast.show('Payee added') }} className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Add</button>
        </div>
      </Modal>
    </div>
  )
}
