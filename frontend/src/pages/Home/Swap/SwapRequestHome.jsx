import React, { useState, useEffect } from 'react';
import { X, Check, X as RejectIcon } from 'lucide-react';

const SwapChainRequestsHome = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryFormData, setDeliveryFormData] = useState({
    method: 'delivery',
    address: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    const loadApprovedRequests = () => {
      try {
        setLoading(true);
        const storedRequests = localStorage.getItem('swapRequests');
        
        if (!storedRequests) {
          setApprovedRequests([]);
          return;
        }

        const allRequests = JSON.parse(storedRequests);
        const approved = allRequests.filter(request => 
          request && request.status === "approved"
        );
        
        setApprovedRequests(approved || []);
      } catch (err) {
        console.error("Failed to load requests:", err);
        setError("Failed to load swap requests");
        setApprovedRequests([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadApprovedRequests();
  }, []);

  const handleRejectRequest = (requestId) => {
    // Update the request status to rejected
    const updatedRequests = approvedRequests.map(request => 
      request.id === requestId ? { ...request, status: 'rejected' } : request
    );
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem('swapRequests') || '[]');
    const updatedAllRequests = allRequests.map(request => 
      request.id === requestId ? { ...request, status: 'rejected' } : request
    );
    
    localStorage.setItem('swapRequests', JSON.stringify(updatedAllRequests));
    setApprovedRequests(updatedRequests.filter(request => request.status === 'approved'));
    setSelectedRequest(null);
  };

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setShowDeliveryForm(true);
  };

  const handleDeliveryFormChange = (e) => {
    const { name, value } = e.target;
    setDeliveryFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeliveryFormSubmit = (e) => {
    e.preventDefault();
    
    // Update the request with delivery details and mark as accepted
    const updatedRequests = approvedRequests.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: 'accepted',
            deliveryDetails: deliveryFormData,
            acceptedAt: new Date().toISOString()
          } 
        : request
    );
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem('swapRequests') || '[]');
    const updatedAllRequests = allRequests.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: 'accepted',
            deliveryDetails: deliveryFormData,
            acceptedAt: new Date().toISOString()
          } 
        : request
    );
    
    localStorage.setItem('swapRequests', JSON.stringify(updatedAllRequests));
    setApprovedRequests(updatedRequests.filter(request => request.status === 'approved'));
    setSelectedRequest(null);
    setShowDeliveryForm(false);
    setDeliveryFormData({
      method: 'delivery',
      address: '',
      date: '',
      notes: ''
    });
  };

  if (loading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 text-center">
        Active Swap Chain Requests
      </h1>

      {approvedRequests.length === 0 ? (
        <div className="text-center text-gray-500">
          No approved swap requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedRequests.map((request) => (
            <div
              key={request.id}
              className="border border-blue-200 rounded-2xl shadow-md p-4 bg-orange-50 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {request.user || 'Anonymous User'}
              </h2>
              
              <div className="mb-3">
                <h3 className="font-medium text-orange-600">Offering:</h3>
                <p className="font-semibold">{request.bookHave.title}</p>
                <p className="text-sm">by {request.bookHave.author}</p>
                <p className="text-sm">Condition: {request.bookHave.condition}</p>
              </div>
              
              <div className="mb-3">
                <h3 className="font-medium text-orange-600">Wants:</h3>
                <p className="font-semibold">{request.bookWant.title}</p>
                <p className="text-sm">by {request.bookWant.author}</p>
                <p className="text-sm">Condition: {request.bookWant.condition}</p>
              </div>

              <button
                onClick={() => setSelectedRequest(request)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {showDeliveryForm ? 'Arrange Book Delivery/Pickup' : 'Swap Request Details'}
              </h2>
              <button 
                onClick={() => {
                  setSelectedRequest(null);
                  setShowDeliveryForm(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {showDeliveryForm ? (
                <form onSubmit={handleDeliveryFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Delivery Method
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="method"
                          value="delivery"
                          checked={deliveryFormData.method === 'delivery'}
                          onChange={handleDeliveryFormChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2">Delivery</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="method"
                          value="pickup"
                          checked={deliveryFormData.method === 'pickup'}
                          onChange={handleDeliveryFormChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2">Pickup</span>
                      </label>
                    </div>
                  </div>

                  {deliveryFormData.method === 'delivery' && (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={deliveryFormData.address}
                        onChange={handleDeliveryFormChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={deliveryFormData.date}
                      onChange={handleDeliveryFormChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={deliveryFormData.notes}
                      onChange={handleDeliveryFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowDeliveryForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition"
                    >
                      Confirm Arrangement
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book Have Section */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-600 mb-3">Book Offered</h3>
                      <p className="font-medium">{selectedRequest.bookHave.title}</p>
                      <p className="text-gray-600">by {selectedRequest.bookHave.author}</p>
                      <p className="text-gray-600">ISBN: {selectedRequest.bookHave.isbn || 'N/A'}</p>
                      <p className="text-gray-600">Condition: {selectedRequest.bookHave.condition}</p>
                      
                      {selectedRequest.bookHave.description && (
                        <div className="mt-3">
                          <h4 className="font-medium">Description:</h4>
                          <p className="text-gray-600">{selectedRequest.bookHave.description}</p>
                        </div>
                      )}

                      {selectedRequest.bookHave.images && selectedRequest.bookHave.images.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Photos:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedRequest.bookHave.images.map((image, index) => (
                              <div key={`have-${index}`} className="h-40 overflow-hidden rounded-lg border">
                                {typeof image === 'string' ? (
                                  <img 
                                    src={image} 
                                    alt={`Book offered ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <img 
                                    src={URL.createObjectURL(image)} 
                                    alt={`Book offered ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Book Want Section */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-600 mb-3">Book Wanted</h3>
                      <p className="font-medium">{selectedRequest.bookWant.title}</p>
                      <p className="text-gray-600">by {selectedRequest.bookWant.author}</p>
                      <p className="text-gray-600">ISBN: {selectedRequest.bookWant.isbn || 'N/A'}</p>
                      <p className="text-gray-600">Condition: {selectedRequest.bookWant.condition}</p>
                      
                      {selectedRequest.bookWant.alternatives && (
                        <div className="mt-3">
                          <h4 className="font-medium">Alternative Books:</h4>
                          <p className="text-gray-600">{selectedRequest.bookWant.alternatives}</p>
                        </div>
                      )}

                      {selectedRequest.bookWant.images && selectedRequest.bookWant.images.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Photos:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedRequest.bookWant.images.map((image, index) => (
                              <div key={`want-${index}`} className="h-40 overflow-hidden rounded-lg border">
                                {typeof image === 'string' ? (
                                  <img 
                                    src={image} 
                                    alt={`Book wanted ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <img 
                                    src={URL.createObjectURL(image)} 
                                    alt={`Book wanted ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="mt-6 border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-orange-600 mb-3">Delivery Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Method:</p>
                        <p className="capitalize">{selectedRequest.delivery.method}</p>
                        {selectedRequest.delivery.method === 'delivery' && (
                          <p className="mt-1">
                            <span className="font-medium">Address:</span> {selectedRequest.delivery.address}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Preferred Swap Date:</p>
                        <p>{selectedRequest.delivery.date ? new Date(selectedRequest.delivery.date).toLocaleDateString() : 'Not specified'}</p>
                      </div>
                    </div>
                    {selectedRequest.delivery.notes && (
                      <div className="mt-3">
                        <h4 className="font-medium">Additional Notes:</h4>
                        <p className="text-gray-600">{selectedRequest.delivery.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleRejectRequest(selectedRequest.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded transition flex items-center"
                    >
                      <RejectIcon size={18} className="mr-2" /> Reject Request
                    </button>
                    <button
                      onClick={() => setShowDeliveryForm(true)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition flex items-center"
                    >
                      <Check size={18} className="mr-2" /> Accept Request
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapChainRequestsHome;