import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import NewsletterPopup from './components/NewsletterPopup.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Deals from './pages/Deals.jsx'
import Wishlist from './pages/Wishlist.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import Login from './pages/Login.jsx'
import Account from './pages/Account.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<OrderConfirmation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Nimbus Store · synthetic demo environment for Hominis agent testing
          </footer>
          <NewsletterPopup />
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
