import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Contacts from './pages/Contacts.jsx'
import Pipeline from './pages/Pipeline.jsx'
import DealDetail from './pages/DealDetail.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/pipeline" element={<Layout><Pipeline /></Layout>} />
          <Route path="/deal/:id" element={<Layout><DealDetail /></Layout>} />
          <Route path="*" element={<Layout><div className="py-20 text-center text-gray-500">Page not found.</div></Layout>} />
        </Routes>
      </ToastProvider>
    </StoreProvider>
  )
}
