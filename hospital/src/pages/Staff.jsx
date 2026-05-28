import { useStore } from '../lib/store.jsx'
import Avatar from '../components/Avatar.jsx'

export default function Staff() {
  const { staff } = useStore()
  const onCall = staff.filter((s) => s.onCall).length

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Staff directory</h1>
      <p className="mt-1 text-sm text-gray-500">{staff.length} members · {onCall} on call</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((s) => (
          <div key={s.id} data-testid="staff-card" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5">
            <Avatar name={s.name} src={`/avatars/${s.id}.jpg`} className="h-14 w-14 text-base" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">{s.name}</p>
              <p className="text-sm text-gray-500">{s.role}</p>
              <p className="text-xs text-gray-400">{s.dept}</p>
            </div>
            {s.onCall && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">On call</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
