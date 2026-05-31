import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './lib/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import Restaurants from './pages/Restaurants.jsx'
import RestaurantDetail from './pages/RestaurantDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import Orders from './pages/Orders.jsx'

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:code" element={<OrderTracking />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">Page not found.</div>} />
            </Routes>
          </main>
          <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
            Munch · synthetic demo environment for Hominis agent testing
          </footer>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
