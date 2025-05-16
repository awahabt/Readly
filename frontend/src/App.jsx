import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './pages/Home/Hero';
import Footer from './pages/Home/Footer';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import Forgot from './pages/auth/Forgot';
import BookReservationForm from './pages/Home/Reservation';
import Dashboard1 from './pages/Home/Sidebar';
import CheckoutPage from './pages/Home/Checkout';
import BooksListPage from './pages/Home/Cart';
import RequestReviewPage from './pages/Home/Request';
import AddBookForm from './pages/Home/Dashboard';
import UserProfileSettings from './pages/Home/Setting';
import UserDashboard from './pages/Home/userdash';
import LibraryPage from './pages/Home/Library';
import Wishlist from './pages/Home/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import Reset from './pages/auth/Reset';
import BookShelf from './pages/Home/Category/BookShelf';
import Search from './pages/Home/Search';

// import BillingPage from './pages/Home/Billing';
import PostSwapRequestForm from './pages/Home/Swaping';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SwapChainDetailsPage from './pages/Admin/SwapChainDetails';
import DeliveryForm from './pages/Admin/DeliveryForm';
import AdminUsers from './components/admin/Users';
import AdminReservations from './components/admin/Reservations';
import AdminSwapRequests from './components/admin/SwapRequest';
import AdminOrders from './components/admin/Orders';
import BookDetails from './components/Recently added/BookDetails';
import ApprovedSwapRequests from './pages/Home/Swap/ApprovedSwapRequest';
import ApprovedSwapChains from '../src/pages/Home/Swap/ApprovedSwapChains';
import SwapChainRequestForm from './pages/Home/Swap/SwapChainForm';
import SwapChainRequestsHome from './pages/Home/Swap/SwapRequestHome';
import NotificationToast from './components/NotificationToast';
import AdminReturns from './components/admin/Return';







function App() {

  return (
    <div>
      <div className="w-full overflow-hidden">
        <div>
          <Navbar />
        </div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password/:token" element={<Reset />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="add-book" element={<AddBookForm />} />
            <Route path="reservation" element={<BookReservationForm />} />
            <Route path="swap" element={<PostSwapRequestForm />} />
            <Route path="sidebar" element={<Dashboard1 />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="cart" element={<BooksListPage />} />
            <Route path="request" element={<RequestReviewPage />} />
            <Route path="setting" element={<UserProfileSettings />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="category/:categoryName" element={<BookShelf/>}/>
            {/* <Route path="billing" element={<BillingPage/>}/> */}
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="swap-chain-dtl" element={<SwapChainDetailsPage/>}/>
            <Route path="delivery-form" element={<DeliveryForm/>}/>
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="reserv" element={<AdminReservations/>}/>
            <Route path="swaprequest" element={<AdminSwapRequests/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="booketails" element={<BookDetails/>}/>
            <Route path="app-swap" element={<ApprovedSwapRequests/>}/>
            <Route path="app-chain" element={<ApprovedSwapChains/>}/>
            <Route path="swap-chain-form" element={<SwapChainRequestForm/>}/>
            <Route path="delivery-form" element={<DeliveryForm/>}/>
            <Route path="swap-request" element={<SwapChainRequestsHome/>}/>
            <Route path="Notify" element={<NotificationToast/>}/>
            <Route path="return" element={<AdminReturns/>}/>
            
            
          </Route>
        </Routes>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
