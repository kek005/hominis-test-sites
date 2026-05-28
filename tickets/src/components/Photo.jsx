import { useState } from 'react'

export default function Photo({ src, alt, className = '', label }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-brand-300 to-brand-600 p-3 text-center font-semibold text-white ${className}`} aria-hidden="true">
        {label || alt}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
