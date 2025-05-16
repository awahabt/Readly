import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SwapChainHomepage = () => {
  const [swapRequests, setSwapRequests] = useState([]);
  const [swapChains, setSwapChains] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const storedRequests = JSON.parse(localStorage.getItem('swapRequests')) || [];
    const storedChains = JSON.parse(localStorage.getItem('swapChains')) || [];
    setSwapRequests(storedRequests);
    setSwapChains(storedChains);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Swap Chain Network</h1>
          <Link 
            to="/swap-chain-form" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Swap Request
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Swap Requests */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Active Swap Requests</h2>
            {swapRequests.length > 0 ? (
              <div className="space-y-4">
                {swapRequests.map(request => (
                  <div key={request.id} className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-blue-800">{request.userName}'s Request</h3>
                    <p className="text-sm text-gray-600">Book Offered: {request.bookHave}</p>
                    <p className="text-sm text-gray-600">Book Wanted: {request.bookWant}</p>
                    <Link 
                      to={`/swap-chain-form?requestId=${request.id}`} 
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium mt-2 inline-block"
                    >
                      Join this swap
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active swap requests available</p>
            )}
          </div>

          {/* Active Swap Chains */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Active Swap Chains</h2>
            {swapChains.length > 0 ? (
              <div className="space-y-4">
                {swapChains.map(chain => (
                  <div key={chain.id} className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-blue-800">Chain #{chain.id}</h3>
                    <p className="text-sm text-gray-600">{chain.participants.length} participants</p>
                    <p className="text-sm text-gray-600">Status: {chain.status}</p>
                    <Link 
                      to={`/chain/${chain.id}`} 
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2 inline-block"
                    >
                      View details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active swap chains available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapChainHomepage;