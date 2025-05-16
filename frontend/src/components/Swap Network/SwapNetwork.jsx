import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SwapNetwork() {
  const [swapChains, setSwapChains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or API
    const loadChains = () => {
      try {
        const storedChains = localStorage.getItem('swapChains');
        setSwapChains(storedChains ? JSON.parse(storedChains) : []);
      } catch (error) {
        console.error("Error loading chains:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChains();
  }, []);

  const joinChain = (chainId) => {
    // In a real app, you would add the current user to the chain
    console.log(`User joined chain ${chainId}`);
    // Update UI or redirect to participation page
  };

  if (loading) return <div className="text-center py-8">Loading swap chains...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">Swap Chains</h1>
        <Link 
          to="/request-swap" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow"
        >
          New Request
        </Link>
      </div>

      {swapChains.length === 0 ? (
        <div className="text-center py-12 bg-blue-50 rounded-xl">
          <p className="text-xl text-gray-600">No active swap chains yet</p>
          <p className="text-gray-500 mt-2">
            Create a swap request to start a chain or join existing ones
          </p>
          <Link 
            to="/request-swap" 
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Request
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {swapChains.map(chain => (
            <div key={chain.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-blue-700">Chain #{chain.id.slice(-4)}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    chain.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    chain.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {chain.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-orange-600 mb-2">Participants ({chain.participants.length})</h3>
                  <ul className="space-y-1">
                    {chain.participants.map((user, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                        {user.name || `User ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Link 
                    to={`/chain/${chain.id}`}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => joinChain(chain.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Join Chain
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}