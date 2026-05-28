import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Flights from './pages/Flights.jsx'
import FlightBook from './pages/FlightBook.jsx'
import Hotels from './pages/Hotels.jsx'
import HotelDetail from './pages/HotelDetail.jsx'
import Confirmation from './pages/Confirmation.jsx'
import Trips from './pages/Trips.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/flights/:id/book" element={<FlightBook />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />
              <Route path="/confirmation/:ref" element={<Confirmation />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Voyage · synthetic demo environment for Hominis agent testing
          </footer>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
