import { useStore } from '../lib/store.jsx'
import { money } from '../lib/format.js'
import { useToast } from '../components/Toast.jsx'

export default function Statements() {
  const { statements } = useStore()
  const toast = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Statements</h1>
      <p className="mt-1 text-sm text-gray-500">Download your monthly account statements.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-2">Period</th><th className="px-4 py-2">Account</th><th className="px-4 py-2 text-right">Closing balance</th><th className="px-4 py-2"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {statements.map((s) => (
              <tr key={s.id} data-testid="statement-row">
                <td className="px-4 py-3 font-medium text-gray-900">{s.period}</td>
                <td className="px-4 py-3 text-gray-600">{s.account}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{money(s.closing)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => toast.show(`Downloading ${s.period} statement…`)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
