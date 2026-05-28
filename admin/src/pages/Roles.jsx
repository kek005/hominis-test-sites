import { useStore } from '../lib/store.jsx'
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS } from '../data/seed.js'

export default function Roles() {
  const { users } = useStore()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Roles & permissions</h1>
      <p className="mt-1 text-sm text-gray-500">What each role can do in this workspace.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {ROLES.map((r) => (
          <div key={r} className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="font-semibold text-gray-900">{r}</p>
            <p className="mt-1 text-sm text-gray-500">{users.filter((u) => u.role === r).length} member{users.filter((u) => u.role === r).length !== 1 ? 's' : ''}</p>
            <p className="mt-2 text-xs text-gray-400">{ROLE_PERMISSIONS[r].filter(Boolean).length} of {PERMISSIONS.length} permissions</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Permission</th>{ROLES.map((r) => <th key={r} className="px-4 py-3 text-center">{r}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PERMISSIONS.map((perm, i) => (
              <tr key={perm} data-testid="perm-row">
                <td className="px-4 py-3 font-medium text-gray-900">{perm}</td>
                {ROLES.map((r) => (
                  <td key={r} className="px-4 py-3 text-center">
                    {ROLE_PERMISSIONS[r][i]
                      ? <span className="text-emerald-600" aria-label="allowed">✓</span>
                      : <span className="text-gray-300" aria-label="denied">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
