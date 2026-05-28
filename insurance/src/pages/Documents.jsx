import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Documents() {
  const { documents } = useStore()
  const toast = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
      <p className="mt-1 text-sm text-gray-500">Policy documents, ID cards, and tax forms.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-2">Document</th><th className="px-4 py-2">Type</th><th className="px-4 py-2">Policy</th><th className="px-4 py-2">Date</th><th className="px-4 py-2"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((d) => (
              <tr key={d.id} data-testid="document-row" className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">📄 {d.name}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{d.kind}</span></td>
                <td className="px-4 py-3 text-gray-600">{d.policy}</td>
                <td className="px-4 py-3 text-gray-500">{d.date}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => toast.show(`Downloading ${d.name}…`)} className="text-brand-700 hover:underline">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
