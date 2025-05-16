import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SwapChainDetailsPage = () => {
  const { chainId } = useParams();
  const navigate = useNavigate();
  const [chain, setChain] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load current user
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    // Load chain data
    const chains = JSON.parse(localStorage.getItem('swapChains')) || [];
    const foundChain = chains.find(c => c.id === chainId);
    setChain(foundChain);
  }, [chainId]);

  const handleCompleteSwap = (participantId) => {
    if (!chain) return;

    const updatedChain = {
      ...chain,
      participants: chain.participants.map(participant => {
        if (participant.userId === participantId) {
          return { ...participant, status: 'completed' };
        }
        return participant;
      })
    };

    // Check if all swaps are completed
    const allCompleted = updatedChain.participants.every(p => p.status === 'completed');
    if (allCompleted) {
      updatedChain.status = 'completed';
    }

    // Update localStorage
    const chains = JSON.parse(localStorage.getItem('swapChains')) || [];
    const updatedChains = chains.map(c => c.id === chainId ? updatedChain : c);
    localStorage.setItem('swapChains', JSON.stringify(updatedChains));

    setChain(updatedChain);
  };

  if (!chain) {
    return (
      <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Swap Chain Not Found</h2>
          <p className="text-gray-600 mb-4">The requested swap chain does not exist or may have been completed.</p>
          <button
            onClick={() => navigate('/swap-chai')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Swap Chains
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-4">
            <h1 className="text-xl font-bold text-white">Swap Chain #{chain.id}</h1>
            <p className="text-blue-100">
              Status: <span className="font-medium">{chain.status}</span>
            </p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Chain Participants</h2>
              <div className="space-y-4">
                {chain.participants.map((participant, index) => (
                  <div 
                    key={participant.id} 
                    className={`border rounded-lg p-4 ${participant.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-blue-700">
                          {participant.userName} {participant.userId === currentUser?.id && '(You)'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-500">Book Offered:</p>
                            <p className="font-medium">{participant.bookHave}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Book Wanted:</p>
                            <p className="font-medium">{participant.bookWant}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Delivery: {participant.deliveryOption === 'pickup' ? 
                            `Public pickup at ${participant.pickupLocation}` : 
                            `Delivery to ${participant.address}`
                          }
                        </p>
                        {participant.notes && (
                          <p className="text-sm text-gray-500 mt-2">
                            <span className="font-medium">Notes:</span> {participant.notes}
                          </p>
                        )}
                      </div>
                      {participant.status !== 'completed' && participant.userId === currentUser?.id && (
                        <button
                          onClick={() => handleCompleteSwap(participant.userId)}
                          className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                    {participant.status === 'completed' && (
                      <div className="mt-2 text-sm text-green-600 font-medium">
                        ✓ Swap completed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Chain Flow</h2>
              <div className="flex items-center justify-center overflow-x-auto py-4">
                <div className="flex items-center">
                  {chain.participants.map((participant, index) => (
                    <React.Fragment key={participant.id}>
                      <div className="text-center mx-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-800 font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700 truncate max-w-xs">{participant.userName}</p>
                      </div>
                      {index < chain.participants.length - 1 && (
                        <div className="w-12 h-1 bg-orange-400 relative">
                          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-orange-400"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                Each participant receives the book they want from the next participant in the chain.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate('/swap-chai')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Swap Chains
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapChainDetailsPage;