import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import SeatSelect from './pages/SeatSelect.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'
import MyTickets from './pages/MyTickets.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Events />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/event/:id/seats" element={<SeatSelect />} />
              <Route path="/event/:id/checkout" element={<Checkout />} />
              <Route path="/confirmation/:code" element={<Confirmation />} />
              <Route path="/tickets" element={<MyTickets />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Showtime · synthetic demo environment for Hominis agent testing
          </footer>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
