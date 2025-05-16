import React from "react";
import { FaHome, FaBook, FaDollarSign, FaCog } from "react-icons/fa"; // Importing icons for Home, Book, Billing, and Settings
import { Link } from "react-router-dom"; // Importing Link from React Router

const Dashboard1 = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 sm:w-64 bg-blue-600 text-white shadow-lg flex flex-col items-center py-8">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col space-y-4 w-full">
          <Link
            to="/"
            className="flex items-center space-x-2 w-full py-3 px-4 text-left hover:bg-blue-700"
          >
            <FaHome size={20} />
            <span className="hidden sm:block">Home</span>
          </Link>

          <Link
            to="/add-book"
            className="flex items-center space-x-2 w-full py-3 px-4 text-left hover:bg-blue-700"
          >
            <FaBook size={20} />
            <span className="hidden sm:block">Add Book</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center space-x-2 w-full py-3 px-4 text-left hover:bg-blue-700">
            <FaDollarSign size={20} />
            <span className="hidden sm:block">Billing</span>
          </Link>

          <Link
          
          to="/setting"
          className="flex items-center space-x-2 w-full py-3 px-4 text-left hover:bg-blue-700">
            <FaCog size={20} />
            <span className="hidden sm:block">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Dynamically rendered content */}
      </div>
    </div>
  );
};

export default Dashboard1;
