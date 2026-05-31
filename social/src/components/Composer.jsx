import { useState } from 'react'
import { useStore } from '../lib/store.jsx'
import { useToast } from './Toast.jsx'
import Avatar from './Avatar.jsx'

const MAX = 280

export default function Composer() {
  const { me, addPost } = useStore()
  const toast = useToast()
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addPost(text.trim())
    setText('')
    toast.show('Posted')
  }

  const remaining = MAX - text.length

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-start gap-3">
        <Avatar name={me.name} src={`/avatars/${me.handle}.jpg`} className="h-10 w-10 text-xs" />
        <div className="min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX))}
            data-testid="composer-input"
            placeholder="What's buzzing?"
            rows={3}
            className="block w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs ${remaining < 20 ? 'text-red-500' : 'text-gray-400'}`}>{remaining}</span>
            <button type="submit" disabled={!text.trim()} data-testid="post-button" className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-brand-300">Post</button>
          </div>
        </div>
      </div>
    </form>
  )
}
