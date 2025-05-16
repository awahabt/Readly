import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestSwap({ users, addSwapRequest }) {
  const [formData, setFormData] = useState({
    userId: 1, // In real app, use authenticated user ID
    bookHave: {
      title: '',
      author: '',
      condition: 'good',
      description: '',
      images: []
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
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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
      status: 'pending'
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-6 border border-orange-200">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">Create Swap Request</h1>
        
        <div className="flex mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex-1 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                step === stepNum ? 'bg-orange-500 text-white' : 
                step > stepNum ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {stepNum}
              </div>
              <div className={`text-xs mt-1 ${
                step === stepNum ? 'font-bold text-orange-600' : 'text-gray-500'
              }`}>
                {stepNum === 1 ? 'Book Have' : stepNum === 2 ? 'Book Want' : 'Delivery'}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">📘 Book You Have</h2>
              
              <div>
                <label className="block text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  value={formData.bookHave.title}
                  onChange={(e) => handleChange(e, 'bookHave', 'title')}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                  required
                />
              </div>
              
              {/* More book have fields... */}
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={!formData.bookHave.title}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">📗 Book You Want</h2>
              
              <div>
                <label className="block text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  value={formData.bookWant.title}
                  onChange={(e) => handleChange(e, 'bookWant', 'title')}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                  required
                />
              </div>
              
              {/* More book want fields... */}
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={!formData.bookWant.title}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">🚚 Delivery Options</h2>
              
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
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}