import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import JobList from './pages/JobList.jsx'
import JobDetail from './pages/JobDetail.jsx'
import Apply from './pages/Apply.jsx'
import Confirmation from './pages/Confirmation.jsx'
import Saved from './pages/Saved.jsx'
import Company from './pages/Company.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/job/:id/apply" element={<Apply />} />
              <Route path="/job/:id/applied" element={<Confirmation />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/company" element={<Company />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Northwind Careers · synthetic demo environment for Hominis agent testing
          </footer>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
