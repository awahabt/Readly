import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SwapChainRequestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('requestId');

  const [formData, setFormData] = useState({
    bookHave: '',
    bookWant: '',
    deliveryOption: 'pickup',
    pickupLocation: '',
    address: '',
    notes: ''
  });

  const [existingRequest, setExistingRequest] = useState(null);

  useEffect(() => {
    if (requestId) {
      const storedRequests = JSON.parse(localStorage.getItem('swapRequests')) || [];
      const request = storedRequests.find(req => req.id === requestId);
      if (request) {
        setExistingRequest(request);
        setFormData(prev => ({
          ...prev,
          bookWant: request.bookHave, // The book they have is what I want
          bookHave: request.bookWant // The book they want is what I have
        }));
      }
    }
  }, [requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Create new swap request
    const newRequest = {
      id: Date.now().toString(),
      userName: currentUser?.name || 'Anonymous',
      userId: currentUser?.id || 'guest',
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('swapRequests')) || [];
    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem('swapRequests', JSON.stringify(updatedRequests));

    // If this is joining an existing request, try to form a chain
    if (existingRequest) {
      const potentialChain = {
        id: Date.now().toString(),
        participants: [existingRequest, newRequest],
        status: 'forming',
        createdAt: new Date().toISOString()
      };

      const existingChains = JSON.parse(localStorage.getItem('swapChains')) || [];
      const updatedChains = [...existingChains, potentialChain];
      localStorage.setItem('swapChains', JSON.stringify(updatedChains));

      // Remove the original request since it's now in a chain
      const filteredRequests = existingRequests.filter(req => req.id !== existingRequest.id);
      localStorage.setItem('swapRequests', JSON.stringify(filteredRequests));
    }

    navigate('/add-book');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          {existingRequest ? 'Join Swap Chain' : 'Create Swap Request'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book I Have</label>
            <input
              type="text"
              name="bookHave"
              value={formData.bookHave}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book I Want</label>
            <input
              type="text"
              name="bookWant"
              value={formData.bookWant}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Option</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="pickup"
                  checked={formData.deliveryOption === 'pickup'}
                  onChange={handleChange}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2">Public Pickup</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={formData.deliveryOption === 'delivery'}
                  onChange={handleChange}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2">Delivery</span>
              </label>
            </div>
          </div>

          {formData.deliveryOption === 'pickup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Public library, coffee shop, etc."
              />
            </div>
          )}

          {formData.deliveryOption === 'delivery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Any special instructions or book conditions"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {existingRequest ? 'Join Swap' : 'Post Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapChainRequestForm;