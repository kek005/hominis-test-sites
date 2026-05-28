import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { useStore } from '../lib/store.jsx'
import { useToast } from './Toast.jsx'

export default function NewsletterPopup() {
  const { newsletterDismissed, dismissNewsletter } = useStore()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (newsletterDismissed) return
    const t = setTimeout(() => setOpen(true), 1500)
    return () => clearTimeout(t)
  }, [newsletterDismissed])

  const close = () => {
    setOpen(false)
    dismissNewsletter()
  }

  return (
    <Modal open={open} onClose={close} testid="newsletter-popup" title="Get 10% off your first order">
      <p className="mb-4 text-sm text-gray-600">
        Join the Nimbus list for early access to drops and a one-time discount code.
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <button
          onClick={() => {
            toast.show('Thanks! Check your inbox for NIMBUS10.')
            close()
          }}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Sign me up
        </button>
        <button onClick={close} className="text-xs text-gray-400 hover:text-gray-600">
          No thanks
        </button>
      </div>
    </Modal>
  )
}
