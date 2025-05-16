import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, User, Calendar, MapPin, Info } from 'lucide-react';

const SwapChainHomepage = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch swap requests
    const fetchSwapRequests = async () => {
      try {
        // In a real app, you would fetch from your backend API
        const response = await fetch('/api/swap-requests');
        const data = await response.json();
        setSwapRequests(data);
      } catch (err) {
        setError('Failed to load swap requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSwapRequests();
  }, []);

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Book Swap Community
          </h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto">
            Connect with readers near you to exchange books and expand your library
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-blue-800">1,245+</h3>
            <p className="text-orange-600">Books Swapped</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-blue-800">560+</h3>
            <p className="text-orange-600">Active Members</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-blue-800">92%</h3>
            <p className="text-orange-600">Success Rate</p>
          </div>
        </div>

        {/* Swap Requests Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-orange-600">Available Swap Requests</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center">
              <span>Create Request</span>
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>

          {swapRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <BookOpen className="mx-auto text-orange-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-blue-800 mb-2">No Swap Requests Yet</h3>
              <p className="text-gray-600 mb-4">Be the first to create a swap request!</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Create Your First Request
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {swapRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-800">{request.user.name}</h3>
                        <p className="text-sm text-gray-500">{request.location}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-sm text-orange-600 mb-2">
                        <BookOpen className="mr-1" size={16} />
                        <span>Offering</span>
                      </div>
                      <h4 className="font-semibold text-blue-900">{request.bookHave.title}</h4>
                      <p className="text-sm text-gray-600">by {request.bookHave.author}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-sm text-orange-600 mb-2">
                        <BookOpen className="mr-1" size={16} />
                        <span>Wants</span>
                      </div>
                      <h4 className="font-semibold text-blue-900">{request.bookWant.title}</h4>
                      <p className="text-sm text-gray-600">by {request.bookWant.author}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1" size={14} />
                        <span>{request.distance} km away</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpandRequest(request.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center"
                    >
                      <span>{expandedRequest === request.id ? 'Show Less' : 'View Details'}</span>
                      <Info className="ml-2" size={16} />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedRequest === request.id && (
                    <div className="border-t border-gray-200 p-6 bg-blue-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Book Condition</h4>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Offered:</span> {request.bookHave.condition}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Wanted:</span> {request.bookWant.condition}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Delivery Method</h4>
                          <p className="text-sm text-gray-700 capitalize">
                            {request.delivery.method}
                          </p>
                          {request.delivery.method === 'delivery' && (
                            <p className="text-sm text-gray-700">{request.delivery.address}</p>
                          )}
                        </div>
                      </div>

                      {request.notes && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Notes</h4>
                          <p className="text-sm text-gray-700">{request.notes}</p>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                          Message User
                        </button>
                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                          Initiate Swap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Swap Your Books?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join our community of book lovers and find your next great read
          </p>
          <button className="bg-white text-orange-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg shadow-md">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapChainHomepage;