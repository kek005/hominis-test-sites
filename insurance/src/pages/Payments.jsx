import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

export default function Payments() {
  const { payments, monthlyTotal } = useStore()
  const toast = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
        <div>
          <p className="text-sm text-brand-100">Next payment due</p>
          <p className="mt-1 text-3xl font-bold">{money(monthlyTotal)}</p>
          <p className="text-sm text-brand-100">on the 1st · Visa •••• 4242</p>
        </div>
        <button onClick={() => toast.show('Payment scheduled')} className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">Pay now</button>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Payment history</h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Description</th><th className="px-4 py-2">Method</th><th className="px-4 py-2 text-right">Amount</th><th className="px-4 py-2"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((p) => (
              <tr key={p.id} data-testid="payment-row">
                <td className="px-4 py-3 text-gray-500">{p.date}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.desc}</td>
                <td className="px-4 py-3 text-gray-600">{p.method}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{money(p.amount)}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => toast.show('Receipt downloaded')} className="text-brand-700 hover:underline">Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
