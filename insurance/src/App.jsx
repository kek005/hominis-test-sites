import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PolicyDetail from './pages/PolicyDetail.jsx'
import Claims from './pages/Claims.jsx'
import FileClaim from './pages/FileClaim.jsx'
import Quote from './pages/Quote.jsx'
import Payments from './pages/Payments.jsx'
import Documents from './pages/Documents.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/policy/:id" element={<Layout><PolicyDetail /></Layout>} />
          <Route path="/claims" element={<Layout><Claims /></Layout>} />
          <Route path="/file-claim" element={<Layout><FileClaim /></Layout>} />
          <Route path="/quote" element={<Layout><Quote /></Layout>} />
          <Route path="/payments" element={<Layout><Payments /></Layout>} />
          <Route path="/documents" element={<Layout><Documents /></Layout>} />
          <Route path="*" element={<Layout><div className="py-20 text-center text-gray-500">Page not found.</div></Layout>} />
        </Routes>
      </ToastProvider>
    </StoreProvider>
  )
}
