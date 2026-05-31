import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { TOPICS } from '../data/seed.js'
import Avatar from '../components/Avatar.jsx'

export default function Explore() {
  const { users, posts, isFollowing, toggleFollow } = useStore()
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 6)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Explore</h1>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Trending topics</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link key={t.tag} to={`/search?q=${encodeURIComponent(t.tag)}`} className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md">
              <p className="font-semibold text-brand-700">{t.tag}</p>
              <p className="text-xs text-gray-500">{t.posts.toLocaleString()} posts</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Suggested people</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {users.map((u) => (
            <div key={u.handle} data-testid="suggested-user" className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
              <Link to={`/profile/${u.handle}`}><Avatar name={u.name} src={`/avatars/${u.handle}.jpg`} className="h-11 w-11 text-xs" /></Link>
              <div className="min-w-0 flex-1">
                <Link to={`/profile/${u.handle}`} className="block truncate font-semibold text-gray-900 hover:underline">{u.name}</Link>
                <p className="truncate text-xs text-gray-500">@{u.handle} · {u.followers.toLocaleString()} followers</p>
              </div>
              <button onClick={() => toggleFollow(u.handle)} className={`rounded-full px-3 py-1 text-xs font-semibold ${isFollowing(u.handle) ? 'border border-gray-300 text-gray-700' : 'bg-brand-600 text-white hover:bg-brand-700'}`}>
                {isFollowing(u.handle) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Popular posts</h2>
        <div className="mt-3 space-y-3">
          {popularPosts.map((p) => (
            <div key={p.id} className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-sm text-gray-500">@{p.author}</p>
              <p className="mt-1 text-gray-800">{p.text}</p>
              <p className="mt-2 text-xs text-gray-400">♥ {p.likes} · {p.comments?.length || 0} comments</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
