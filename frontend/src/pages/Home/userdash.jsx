import React, { useState } from 'react';
import { FaHome, FaUser, FaBook, FaShoppingCart, FaArrowRight, FaHome as FaHomeIcon } from 'react-icons/fa'; // Icons for the sidebar

// Importing sub-components
import { Link } from 'react-router-dom';
import Contact from './Contact';
import BookSwappingForm from './Swaping';
import BookReservationForm from './Reservation';
import HeroSection from './Hero';
import { ArrowLeftRight, ArrowRightLeft, CornerDownLeft, LifeBuoy, Plus, UserPen } from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(null); // No active tab by default

  const handleHomeClick = () => {
    setActiveTab(null); // Reset to home view
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Sidebar */}
      <div className="w-16 sm:w-64 bg-blue-600 text-white shadow-lg flex flex-col items-center py-8">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col space-y-4 w-full">
        <Link
            to="/add-book"
            className={`flex items-center space-x-2 w-full py-3 px-4 text-left ${activeTab === 'borrow' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('borrow')}
          >
            <Plus size={20} />
            <span className="hidden sm:block">Add Boook</span>
          </Link>
          <Link
            to="/swap"
            className={`flex items-center space-x-2 w-full py-3 px-4 text-left ${activeTab === 'borrow' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('borrow')}
          >
            <ArrowRightLeft size={20} />
            <span className="hidden sm:block">Swap Book</span>
          </Link>
          {/* <Link
            to="/swap-chain-form"
            className={`flex items-center space-x-2 w-full py-3 px-4 text-left ${activeTab === 'borrow' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('borrow')}
          >
            <UserPen size={20} />
            <span className="hidden sm:block">Swap Network</span>
          </Link> */}
          <Link
            to="/delivery-form"
            className={`flex items-center space-x-2 w-full py-3 px-4 text-left ${activeTab === 'orders' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <CornerDownLeft size={20} />
            <span className="hidden sm:block">Return Book</span>
          </Link>
          <Link
            to="/setting"
            className={`flex items-center space-x-2 w-full py-3 px-4 text-left ${activeTab === 'borrow' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('borrow')}
          >
            <UserPen size={20} />
            <span className="hidden sm:block">Profile</span>
          </Link>
          

          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-600">
              {activeTab ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page` : 'Welcome to Your Dashboard'}
            </h2>
          </div>

          {/* Home Icon to Navigate Back to Home */}
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            <FaHomeIcon size={30} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Dynamic Content Based on Selected Tab */}
          {activeTab === 'home' && <HeroSection />}
          {activeTab === 'Contact' && <Contact />}
          {activeTab === 'borrow' && <BookSwappingForm />}
          {activeTab === 'orders' && <BookReservationForm />}
          {!activeTab && <Home />} {/* Display default content if no tab is selected */}
        </div>
      </div>
    </div>
  );
};

// Home Section
const Home = () => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Welcome to your Dashboard</h3>
      <p className="text-gray-700">Explore your available books, manage your orders, and update your profile.</p>
    </div>
  );
};

export default UserDashboard;
