import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function JoinChainForm() {
  const { chainId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookHave: {
      title: '',
      author: '',
      condition: 'good'
    },
    bookWant: {
      title: '',
      author: '',
      condition: 'good'
    },
    delivery: {
      method: 'pickup',
      address: '',
      date: ''
    }
  });

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
    // Save participation to localStorage or API
    const participation = {
      chainId,
      userId: 1, // Replace with actual user ID
      ...formData,
      joinedAt: new Date().toISOString()
    };
    
    // Update chain in localStorage
    const chains = JSON.parse(localStorage.getItem('swapChains') || []);
    const updatedChains = chains.map(chain => {
      if (chain.id === chainId) {
        return {
          ...chain,
          participants: [...chain.participants, participation]
        };
      }
      return chain;
    });
    
    localStorage.setItem('swapChains', JSON.stringify(updatedChains));
    navigate(`/chain/${chainId}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-6 border border-blue-200">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Join Swap Chain #{chainId.slice(-4)}</h1>
        <p className="text-gray-600 mb-6">Add your books to complete the chain</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">Your Contribution</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Book You're Offering*</label>
              <input
                type="text"
                value={formData.bookHave.title}
                onChange={(e) => handleChange(e, 'bookHave', 'title')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                required
                placeholder="Book title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.bookHave.author}
                  onChange={(e) => handleChange(e, 'bookHave', 'author')}
                  className="w-full p-2 border rounded"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Condition</label>
                <select
                  value={formData.bookHave.condition}
                  onChange={(e) => handleChange(e, 'bookHave', 'condition')}
                  className="w-full p-2 border rounded"
                >
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">Book You Want</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                value={formData.bookWant.title}
                onChange={(e) => handleChange(e, 'bookWant', 'title')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                required
                placeholder="Desired book title"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">Delivery Method</h2>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.delivery.method === 'pickup'}
                  onChange={() => handleChange({ target: { value: 'pickup' }}, 'delivery', 'method')}
                />
                Public Pickup
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
                <label className="block text-gray-700 mb-1">Delivery Address*</label>
                <input
                  type="text"
                  value={formData.delivery.address}
                  onChange={(e) => handleChange(e, 'delivery', 'address')}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="Your address"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-gray-300 px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
            >
              Complete Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}