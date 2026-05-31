import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'
import Explore from './pages/Explore.jsx'
import Notifications from './pages/Notifications.jsx'
import Search from './pages/Search.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:handle" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Buzz · synthetic demo environment for Hominis agent testing
          </footer>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
