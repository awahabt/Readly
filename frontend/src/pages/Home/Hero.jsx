import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from "../../assets";
import Feature from "../../components/feature Category";
import Recently from "../../components/Recently added";
import SwapChainRequestsHome from "./Swap/SwapRequestHome";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Pakistan's Largest Online Books Marketplace!
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Discover thousands of books from top publishers and independent
              authors. Find your next favorite read today.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
            >
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition duration-300 shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </form>

            <div className="pt-4">
              <Link
                to="/reservation"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-8 py-3 mr-4 mb-3 transition duration-300 shadow-md hover:shadow-lg"
              >
                Book Now
              </Link>
             
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main Book Image */}
              <div className="w-64 md:w-80 h-auto rounded-lg overflow-hidden transform  transition-transform duration-300 hover:rotate-0">
                <img
                  src={library}
                  alt="Featured Books Collection"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Decorative Books */}
              {/* <div className="absolute -top-6 -right-6 w-32 h-auto rounded-lg overflow-hidden shadow-lg transform rotate-12 transition-transform duration-300 hover:rotate-6">
                <img
                  src={library}
                  alt="Book Stack"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-auto rounded-lg overflow-hidden shadow-lg transform -rotate-12 transition-transform duration-300 hover:-rotate-6">
                <img
                  src={library} 
                  alt="Book Stack"
                  className="w-full h-auto object-cover"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Feature />
      <Recently />
      <SwapChainRequestsHome />
    </div>
  );
};

export default HeroSection;
