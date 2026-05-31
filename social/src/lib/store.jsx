import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { POSTS, USERS, CURRENT_USER, SEED_NOTIFICATIONS } from '../data/seed.js'

const KEY = 'buzz.state.v1'

function loadState() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r) } catch { /* */ }
  return {
    posts: POSTS,
    notifications: SEED_NOTIFICATIONS,
    likes: [],          // post ids the demo user has liked
    following: [],      // user handles the demo user follows
  }
}

const StoreContext = createContext(null)
let idSeq = Date.now()

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const userByHandle = (handle) => {
    if (handle === CURRENT_USER.handle) return CURRENT_USER
    return USERS.find((u) => u.handle === handle)
  }

  const api = useMemo(() => ({
    ...state,
    me: CURRENT_USER,
    users: USERS,
    userByHandle,
    isLiked: (id) => state.likes.includes(id),
    isFollowing: (handle) => state.following.includes(handle),

    addPost(text) {
      const post = { id: 'p' + ++idSeq, author: CURRENT_USER.handle, time: 'now', text, likes: 0, comments: [] }
      setState((s) => ({ ...s, posts: [post, ...s.posts] }))
      return post
    },
    toggleLike(id) {
      setState((s) => {
        const liked = s.likes.includes(id)
        return {
          ...s,
          likes: liked ? s.likes.filter((x) => x !== id) : [...s.likes, id],
          posts: s.posts.map((p) => (p.id === id ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p)),
        }
      })
    },
    addComment(postId, text) {
      const comment = { id: 'c' + ++idSeq, author: CURRENT_USER.handle, text, time: 'now' }
      setState((s) => ({
        ...s,
        posts: s.posts.map((p) => (p.id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p)),
      }))
    },
    toggleFollow(handle) {
      setState((s) => ({
        ...s,
        following: s.following.includes(handle) ? s.following.filter((h) => h !== handle) : [...s.following, handle],
      }))
    },
    markAllRead() {
      setState((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }))
    },
    resetDemo() { localStorage.removeItem(KEY); window.location.href = '/' },
  }), [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const c = useContext(StoreContext)
  if (!c) throw new Error('useStore must be used within StoreProvider')
  return c
}
