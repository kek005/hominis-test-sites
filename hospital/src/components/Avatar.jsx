import { useState } from 'react'

export default function Avatar({ name, src, className = 'h-10 w-10 text-sm' }) {
  const [failed, setFailed] = useState(false)
  const initials = name.replace(/^(Dr\.|Nurse)\s+/, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  if (failed || !src) {
    return <div className={`grid shrink-0 place-items-center rounded-full bg-brand-100 font-bold text-brand-700 ${className}`}>{initials}</div>
  }
  return <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} className={`shrink-0 rounded-full object-cover ${className}`} />
}
