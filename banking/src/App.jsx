import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AccountDetail from './pages/AccountDetail.jsx'
import Transfer from './pages/Transfer.jsx'
import Statements from './pages/Statements.jsx'
import BillPay from './pages/BillPay.jsx'
import Cards from './pages/Cards.jsx'
import Deposit from './pages/Deposit.jsx'
import Insights from './pages/Insights.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/account/:id" element={<Layout><AccountDetail /></Layout>} />
          <Route path="/transfer" element={<Layout><Transfer /></Layout>} />
          <Route path="/billpay" element={<Layout><BillPay /></Layout>} />
          <Route path="/deposit" element={<Layout><Deposit /></Layout>} />
          <Route path="/cards" element={<Layout><Cards /></Layout>} />
          <Route path="/insights" element={<Layout><Insights /></Layout>} />
          <Route path="/statements" element={<Layout><Statements /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<Layout><div className="py-20 text-center text-gray-500">Page not found.</div></Layout>} />
        </Routes>
      </ToastProvider>
    </StoreProvider>
  )
}
