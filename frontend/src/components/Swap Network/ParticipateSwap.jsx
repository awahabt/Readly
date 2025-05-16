import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ParticipateSwap({ users, addSwapRequest }) {
  const { chainId } = useParams();
  const navigate = useNavigate();
  const [chain, setChain] = useState(null);
  const [formData, setFormData] = useState({
    userId: 1, // In real app, use authenticated user ID
    bookHave: {
      title: '',
      author: '',
      condition: 'good',
    },
    bookWant: {
      title: '',
      author: '',
      condition: 'good',
    },
    delivery: {
      method: 'pickup',
      address: '',
      date: '',
      notes: ''
    }
  });

  useEffect(() => {
    // In real app, fetch chain details from API
    const mockChain = {
      id: chainId,
      participants: [2, 3], // Example existing participants
      status: 'pending'
    };
    setChain(mockChain);
  }, [chainId]);

  const handleChange = (e, section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSwapRequest({
      ...formData,
      id: `REQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      chainId // Link this request to the chain
    });
    navigate('/');
  };

  if (!chain) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-6 border border-blue-200">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Join Swap Chain #{chainId.slice(-4)}</h1>
        <p className="text-gray-600 mb-6">Complete your swap details to join this chain</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">Your Book Details</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Book You Have*</label>
              <input
                type="text"
                value={formData.bookHave.title}
                onChange={(e) => handleChange(e, 'bookHave', 'title')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Book You Want*</label>
              <input
                type="text"
                value={formData.bookWant.title}
                onChange={(e) => handleChange(e, 'bookWant', 'title')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">Delivery Options</h2>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.delivery.method === 'pickup'}
                  onChange={() => handleChange({ target: { value: 'pickup' }}, 'delivery', 'method')}
                />
                Pickup from Public Place
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.delivery.method === 'delivery'}
                  onChange={() => handleChange({ target: { value: 'delivery' }}, 'delivery', 'method')}
                />
                Delivery
              </label>
            </div>
            
            {formData.delivery.method === 'delivery' && (
              <div>
                <label className="block text-gray-700 mb-1">Address*</label>
                <input
                  type="text"
                  value={formData.delivery.address}
                  onChange={(e) => handleChange(e, 'delivery', 'address')}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                  required={formData.delivery.method === 'delivery'}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="border border-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              disabled={!formData.bookHave.title || !formData.bookWant.title}
            >
              Join Chain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}