import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Users from './pages/Users.jsx'
import Roles from './pages/Roles.jsx'
import AuditLog from './pages/AuditLog.jsx'
import Billing from './pages/Billing.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/roles" element={<Layout><Roles /></Layout>} />
          <Route path="/audit" element={<Layout><AuditLog /></Layout>} />
          <Route path="/billing" element={<Layout><Billing /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<Layout><div className="py-20 text-center text-gray-500">Page not found.</div></Layout>} />
        </Routes>
      </ToastProvider>
    </StoreProvider>
  )
}
