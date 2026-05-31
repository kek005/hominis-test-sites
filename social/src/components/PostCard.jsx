import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import Avatar from './Avatar.jsx'

export default function PostCard({ post }) {
  const { userByHandle, toggleLike, isLiked, addComment } = useStore()
  const author = userByHandle(post.author)
  const [text, setText] = useState('')
  const [showAll, setShowAll] = useState(false)
  const comments = showAll ? (post.comments || []) : (post.comments || []).slice(-2)
  const liked = isLiked(post.id)

  const submitComment = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addComment(post.id, text.trim())
    setText('')
  }

  return (
    <article data-testid="post" className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-start gap-3">
        <Link to={`/profile/${author?.handle}`}><Avatar name={author?.name} src={`/avatars/${author?.handle}.jpg`} className="h-10 w-10 text-xs" /></Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <Link to={`/profile/${author?.handle}`} className="font-semibold text-gray-900 hover:underline">{author?.name}</Link>
            <span className="text-sm text-gray-500">@{author?.handle}</span>
            <span className="text-xs text-gray-400">· {post.time}</span>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-gray-800">{post.text}</p>

          <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
            <button onClick={() => toggleLike(post.id)} data-testid="like-button" className={`flex items-center gap-1 hover:text-red-500 ${liked ? 'text-red-500' : ''}`}>
              {liked ? '♥' : '♡'} <span data-testid="like-count">{post.likes}</span>
            </button>
            <button onClick={() => setShowAll((x) => !x)} className="flex items-center gap-1 hover:text-brand-700">
              💬 <span>{post.comments?.length || 0}</span>
            </button>
            <span className="ml-auto text-xs text-gray-400">{post.likes * 7 + (post.comments?.length || 0) * 3} views</span>
          </div>

          {(post.comments?.length || 0) > 0 && (
            <ul className="mt-3 space-y-2 border-l-2 border-brand-100 pl-3">
              {comments.map((c) => {
                const u = userByHandle(c.author)
                return (
                  <li key={c.id} data-testid="comment" className="text-sm">
                    <Link to={`/profile/${u?.handle}`} className="font-medium text-gray-900 hover:underline">{u?.name || `@${c.author}`}</Link>
                    <span className="ml-2 text-gray-700">{c.text}</span>
                    <span className="ml-2 text-xs text-gray-400">· {c.time}</span>
                  </li>
                )
              })}
              {!showAll && (post.comments?.length || 0) > 2 && (
                <li><button onClick={() => setShowAll(true)} className="text-xs text-brand-700 hover:underline">View all {post.comments.length} comments</button></li>
              )}
            </ul>
          )}

          <form onSubmit={submitComment} className="mt-3 flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} data-testid="comment-input" placeholder="Write a reply…" className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-brand-500 focus:bg-white focus:outline-none" />
            <button type="submit" data-testid="comment-submit" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Reply</button>
          </form>
        </div>
      </div>
    </article>
  )
}
