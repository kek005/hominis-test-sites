import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import PostCard from '../components/PostCard.jsx'
import Avatar from '../components/Avatar.jsx'

export default function Profile() {
  const { handle } = useParams()
  const { userByHandle, posts, isFollowing, toggleFollow, me, following } = useStore()
  const user = userByHandle(handle)
  const [tab, setTab] = useState('posts')

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-gray-700">User not found.</p>
        <Link to="/" className="mt-2 inline-block text-brand-600 hover:underline">Back to feed</Link>
      </div>
    )
  }

  const isMe = handle === me.handle
  const userPosts = posts.filter((p) => p.author === handle)
  const followsCount = isMe ? following.length : user.following
  const followers = isMe ? following.length > 0 ? following.length : user.followers : user.followers

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="h-32 bg-gradient-to-r from-brand-400 to-brand-700" />
        <div className="-mt-10 flex items-end justify-between gap-4 px-5">
          <Avatar name={user.name} src={`/avatars/${user.handle}.jpg`} className="h-20 w-20 ring-4 ring-white text-base" />
          {!isMe && (
            <button onClick={() => toggleFollow(user.handle)} data-testid="follow-button" className={`rounded-full px-5 py-2 text-sm font-semibold ${isFollowing(user.handle) ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-brand-600 text-white hover:bg-brand-700'}`}>
              {isFollowing(user.handle) ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">@{user.handle}</p>
          <p className="mt-3 text-gray-700">{user.bio}</p>
          <div className="mt-3 flex gap-4 text-sm">
            <span><span className="font-bold text-gray-900">{followsCount.toLocaleString()}</span> <span className="text-gray-500">Following</span></span>
            <span><span className="font-bold text-gray-900">{followers.toLocaleString()}</span> <span className="text-gray-500">Followers</span></span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-6 border-b border-gray-200 text-sm font-medium">
        {['posts', 'replies', 'likes'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-1 pb-3 capitalize ${tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {tab === 'posts' && (userPosts.length === 0
          ? <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">No posts yet.</div>
          : userPosts.map((p) => <PostCard key={p.id} post={p} />))}
        {tab === 'replies' && <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">No replies to show.</div>}
        {tab === 'likes' && <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">No liked posts to show.</div>}
      </div>
    </div>
  )
}
