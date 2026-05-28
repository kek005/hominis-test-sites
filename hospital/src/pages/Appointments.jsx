import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { useToast } from '../components/Toast.jsx'

const statusColor = {
  Scheduled: 'bg-gray-100 text-gray-600',
  'Checked in': 'bg-emerald-100 text-emerald-700',
  Completed: 'bg-blue-100 text-blue-700',
}

export default function Appointments() {
  const { appointments } = useStore()
  const toast = useToast()
  const [checkedIn, setCheckedIn] = useState({})

  const statusOf = (a) => checkedIn[a.id] || a.status

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
      <p className="mt-1 text-sm text-gray-500">{appointments.length} scheduled today</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Time</th><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Doctor</th><th className="px-4 py-3">Dept</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.map((a) => (
              <tr key={a.id} data-testid="appointment-row" className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-500">{a.time}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{a.patient}</td>
                <td className="px-4 py-3 text-gray-600">{a.doctor}</td>
                <td className="px-4 py-3 text-gray-600">{a.dept}</td>
                <td className="px-4 py-3 text-gray-600">{a.type}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[statusOf(a)]}`}>{statusOf(a)}</span></td>
                <td className="px-4 py-3 text-right">
                  {statusOf(a) === 'Scheduled' && (
                    <button onClick={() => { setCheckedIn((c) => ({ ...c, [a.id]: 'Checked in' })); toast.show(`${a.patient} checked in`) }} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Check in</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
