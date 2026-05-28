import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

function Stat({ label, value, sub, accent }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  )
}

const statusColor = {
  Admitted: 'bg-blue-100 text-blue-700',
  Observation: 'bg-amber-100 text-amber-700',
  Critical: 'bg-red-100 text-red-700',
  Discharged: 'bg-gray-100 text-gray-600',
}

export default function Dashboard() {
  const { user, patients, appointments, wardBeds, admissions } = useStore()
  const admitted = patients.filter((p) => p.status !== 'Discharged').length
  const critical = patients.filter((p) => p.status === 'Critical').length
  const totalBeds = wardBeds.reduce((s, w) => s + w.total, 0)
  const occupiedBeds = wardBeds.reduce((s, w) => s + w.occupied, 0)
  const occupancy = Math.round((occupiedBeds / totalBeds) * 100)
  const maxAdm = Math.max(...admissions.map((a) => a.count))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Good morning, {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">{user.role} · here's today at a glance.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Patients in care" value={admitted} />
        <Stat label="Critical" value={critical} accent="text-red-600" />
        <Stat label="Bed occupancy" value={`${occupancy}%`} sub={`${occupiedBeds}/${totalBeds} beds`} accent="text-brand-700" />
        <Stat label="Appointments today" value={appointments.length} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Admissions (14 days)</h2>
          <div className="flex h-40 items-end gap-1.5">
            {admissions.map((a) => (
              <div key={a.date} className="flex flex-1 flex-col items-center justify-end" title={`${a.date}: ${a.count}`}>
                <div className="w-full rounded-t bg-brand-500" style={{ height: `${(a.count / maxAdm) * 100}%` }} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Bed occupancy by ward</h2>
          <div className="space-y-3">
            {wardBeds.map((w) => {
              const pct = Math.round((w.occupied / w.total) * 100)
              return (
                <div key={w.ward} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm text-gray-600">{w.ward}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full ${pct > 85 ? 'bg-red-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }} /></div>
                  <span className="w-14 shrink-0 text-right text-xs text-gray-500">{w.occupied}/{w.total}</span>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Today's appointments</h2>
        <Link to="/appointments" className="text-sm font-medium text-brand-700 hover:underline">View all →</Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {appointments.slice(0, 5).map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-mono text-gray-500">{a.time}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{a.patient}</td>
                <td className="px-4 py-3 text-gray-600">{a.doctor}</td>
                <td className="px-4 py-3 text-gray-500">{a.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Critical & observation</h2>
        <Link to="/patients" className="text-sm font-medium text-brand-700 hover:underline">All patients →</Link>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {patients.filter((p) => p.status === 'Critical' || p.status === 'Observation').slice(0, 4).map((p) => (
          <Link key={p.id} to={`/patient/${p.id}`} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md">
            <div><p className="font-medium text-gray-900">{p.name}</p><p className="text-xs text-gray-400">{p.ward} · {p.room} · {p.diagnosis}</p></div>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
