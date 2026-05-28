import { PLAN, INVOICES } from '../data/seed.js'
import { useToast } from '../components/Toast.jsx'

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function Billing() {
  const toast = useToast()
  const seatPct = Math.round((PLAN.seatsUsed / PLAN.seatLimit) * 100)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your plan, seats, and invoices.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current plan</p>
              <p className="text-2xl font-bold text-gray-900">{PLAN.name}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{money(PLAN.price)} / {PLAN.interval}</p>
          <p className="mt-1 text-sm text-gray-500">Renews {PLAN.renews} · {PLAN.card}</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => toast.show('Plan change requested')} className="rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">Change plan</button>
            <button onClick={() => toast.show('Payment method updated')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Update card</button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <p className="text-sm text-gray-500">Seats</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{PLAN.seatsUsed} <span className="text-base font-normal text-gray-400">/ {PLAN.seatLimit}</span></p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full ${seatPct > 90 ? 'bg-red-500' : 'bg-accent-500'}`} style={{ width: `${seatPct}%` }} /></div>
          <p className="mt-2 text-sm text-gray-500">{PLAN.seatLimit - PLAN.seatsUsed} seats available</p>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Invoices</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="py-2">Invoice</th><th className="py-2">Date</th><th className="py-2">Status</th><th className="py-2 text-right">Amount</th><th className="py-2"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {INVOICES.map((inv) => (
              <tr key={inv.id} data-testid="invoice-row">
                <td className="py-3 font-medium text-gray-900">{inv.id}</td>
                <td className="py-3 text-gray-600">{inv.date}</td>
                <td className="py-3"><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{inv.status}</span></td>
                <td className="py-3 text-right font-semibold text-gray-900">{money(inv.amount)}</td>
                <td className="py-3 text-right"><button onClick={() => toast.show(`Downloading ${inv.id}…`)} className="text-accent-600 hover:underline">PDF</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
