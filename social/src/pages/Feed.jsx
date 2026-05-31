import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { TOPICS } from '../data/seed.js'
import Composer from '../components/Composer.jsx'
import PostCard from '../components/PostCard.jsx'
import Avatar from '../components/Avatar.jsx'

export default function Feed() {
  const { posts, users, isFollowing, toggleFollow } = useStore()
  const suggestions = users.filter((u) => !isFollowing(u.handle)).slice(0, 5)

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
      <main className="space-y-4">
        <Composer />
        {posts.map((p) => <PostCard key={p.id} post={p} />)}
      </main>

      <aside className="space-y-5">
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Trending</h2>
          <ul className="mt-3 space-y-2">
            {TOPICS.slice(0, 5).map((t) => (
              <li key={t.tag} className="flex items-center justify-between text-sm">
                <Link to={`/search?q=${encodeURIComponent(t.tag)}`} className="font-medium text-brand-700 hover:underline">{t.tag}</Link>
                <span className="text-xs text-gray-400">{t.posts.toLocaleString()} posts</span>
              </li>
            ))}
          </ul>
          <Link to="/explore" className="mt-3 inline-block text-xs font-medium text-brand-700 hover:underline">See more →</Link>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Who to follow</h2>
          <ul className="mt-3 space-y-3">
            {suggestions.map((u) => (
              <li key={u.handle} className="flex items-center gap-3">
                <Link to={`/profile/${u.handle}`}><Avatar name={u.name} src={`/avatars/${u.handle}.jpg`} className="h-9 w-9 text-xs" /></Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${u.handle}`} className="block truncate text-sm font-medium text-gray-900 hover:underline">{u.name}</Link>
                  <p className="truncate text-xs text-gray-500">@{u.handle}</p>
                </div>
                <button onClick={() => toggleFollow(u.handle)} data-testid="follow-suggestion" className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-700">Follow</button>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  )
}
