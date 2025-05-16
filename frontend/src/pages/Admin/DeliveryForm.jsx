import React, { useState } from 'react';
import axios from 'axios';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    pickupAddress: '',
    contactNumber: '',
    country: 'PK'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Validate phone number format for Pakistan
      if (formData.country === 'PK' && !/^3\d{9}$/.test(formData.contactNumber)) {
        throw new Error('Please enter a valid Pakistani phone number (e.g., 3001234567)');
      }

      const response = await axios.post('http://localhost:8000/api/returns', formData);
      
      setSuccess(response.data.message);
      setFormData({
        bookName: '',
        pickupAddress: '',
        contactNumber: '',
        country: 'PK'
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="bg-blue-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white">Book Return Request</h2>
          <p className="text-blue-100">Please fill out the form to return your book</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div>
            <label htmlFor="bookName" className="block text-sm font-medium text-blue-700">
              Book Name *
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label htmlFor="pickupAddress" className="block text-sm font-medium text-blue-700">
              Pickup Address *
            </label>
            <textarea
              id="pickupAddress"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter complete address for pickup"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-blue-700">
              Contact Number *
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                <option value="PK">🇵🇰 +92</option>
              </select>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                pattern={formData.country === 'PK' ? '3\\d{9}' : '.*'}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={formData.country === 'PK' ? '3001234567' : 'Enter phone number'}
              />
            </div>
            {formData.country === 'PK' && (
              <p className="mt-1 text-xs text-gray-500">Format: 3001234567 (without spaces or dashes)</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  bookName: '',
                  pickupAddress: '',
                  contactNumber: '',
                  country: 'PK'
                });
                setError('');
                setSuccess('');
              }}
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-md text-sm font-medium hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              disabled={isSubmitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Request Book Return'}
            </button>
          </div>
        </form>

        <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-blue-600">
            * Required fields. We'll contact you within 24 hours to confirm the pickup details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;