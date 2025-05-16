import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ChainDetails() {
  const { chainId } = useParams();
  const [chain, setChain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load chain details from localStorage or API
    const loadChain = () => {
      try {
        const storedChains = localStorage.getItem('swapChains');
        if (storedChains) {
          const chains = JSON.parse(storedChains);
          const foundChain = chains.find(c => c.id === chainId);
          setChain(foundChain || null);
        }
      } catch (error) {
        console.error("Error loading chain:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChain();
  }, [chainId]);

  const handleJoin = () => {
    // Logic to join the chain
    console.log(`Joining chain ${chainId}`);
    // Redirect to participation form
  };

  if (loading) return <div className="text-center py-8">Loading chain details...</div>;
  if (!chain) return <div className="text-center py-8">Chain not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-md p-6 border border-orange-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-600">Swap Chain #{chain.id.slice(-4)}</h1>
            <p className="text-gray-600">Created on {new Date(chain.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            chain.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            chain.status === 'active' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {chain.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border rounded-lg p-4 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Chain Flow</h2>
            <div className="space-y-4">
              {chain.participants.map((participant, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index % 2 === 0 ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{participant.name}</p>
                    <p className="text-sm text-gray-600">
                      {participant.bookHave} → {participant.bookWant}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-orange-50">
            <h2 className="text-lg font-semibold text-orange-700 mb-3">Delivery Info</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Method:</span> {chain.deliveryMethod}</p>
              {chain.deliveryMethod === 'pickup' && (
                <p><span className="font-medium">Location:</span> Public Meetup Point</p>
              )}
              {chain.deliveryMethod === 'delivery' && (
                <p><span className="font-medium">Address:</span> {chain.deliveryAddress}</p>
              )}
              <p><span className="font-medium">Status:</span> {chain.deliveryStatus || 'Pending'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <Link to="/swap-network" className="text-blue-500 hover:text-blue-700">
            ← Back to all chains
          </Link>
          <button
            onClick={handleJoin}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Join This Chain
          </button>
        </div>
      </div>
    </div>
  );
}