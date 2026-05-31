import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import PostCard from '../components/PostCard.jsx'
import Avatar from '../components/Avatar.jsx'

export default function Search() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim().toLowerCase()
  const { posts, users } = useStore()

  const matchPosts = q ? posts.filter((p) => p.text.toLowerCase().includes(q)) : []
  const matchUsers = q ? users.filter((u) => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q)) : []

  if (!q) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-gray-500">Type something into the search bar to begin.</div>

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900">Results for "{q}"</h1>

      {matchUsers.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">People</h2>
          <ul className="mt-3 space-y-2">
            {matchUsers.map((u) => (
              <li key={u.handle} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3">
                <Link to={`/profile/${u.handle}`}><Avatar name={u.name} src={`/avatars/${u.handle}.jpg`} className="h-10 w-10 text-xs" /></Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${u.handle}`} className="block truncate font-medium text-gray-900 hover:underline">{u.name}</Link>
                  <p className="truncate text-xs text-gray-500">@{u.handle} · {u.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Posts ({matchPosts.length})</h2>
        {matchPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-10 text-center text-gray-500">No posts match.</div>
        ) : matchPosts.map((p) => <PostCard key={p.id} post={p} />)}
      </section>
    </div>
  )
}
