import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Patients from './pages/Patients.jsx'
import PatientDetail from './pages/PatientDetail.jsx'
import Appointments from './pages/Appointments.jsx'
import Beds from './pages/Beds.jsx'
import Staff from './pages/Staff.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/patients" element={<Layout><Patients /></Layout>} />
          <Route path="/patient/:id" element={<Layout><PatientDetail /></Layout>} />
          <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
          <Route path="/beds" element={<Layout><Beds /></Layout>} />
          <Route path="/staff" element={<Layout><Staff /></Layout>} />
          <Route path="*" element={<Layout><div className="py-20 text-center text-gray-500">Page not found.</div></Layout>} />
        </Routes>
      </ToastProvider>
    </StoreProvider>
  )
}
