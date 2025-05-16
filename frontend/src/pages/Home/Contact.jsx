import React, { useState } from 'react';
import { Contact } from '../../assets';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phoneNo && !/^[\d\s+-]+$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(prev => ({ ...prev, show: false }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      setSubmitStatus({
        show: true,
        success: true,
        message: response.data.message || 'Thank you for contacting us! We will respond soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        message: ''
      });
    } catch (error) {
      let errorMessage = 'Failed to send message';
      
      if (error.response) {
        errorMessage = error.response.data.message || 
                      error.response.data.error || 
                      'Server error occurred';
      } else if (error.request) {
        errorMessage = 'Network error - please check your connection';
      }
      
      setSubmitStatus({
        show: true,
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 min-h-screen p-4 md:p-8">
      {/* Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h2>
        
        {submitStatus.show && (
          <div className={`mb-4 p-3 rounded-lg border ${
            submitStatus.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
            errors.name ? 'bg-red-50 border border-red-200' : 'bg-blue-100'
          }`}>
            <span className={`mr-2 ${
              errors.name ? 'text-red-500' : 'text-blue-600'
            }`}>
              <i className="fas fa-user"></i>
            </span>
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          <div className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
            errors.email ? 'bg-red-50 border border-red-200' : 'bg-blue-100'
          }`}>
            <span className={`mr-2 ${
              errors.email ? 'text-red-500' : 'text-blue-600'
            }`}>
              <i className="fas fa-envelope"></i>
            </span>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
            errors.phoneNo ? 'bg-red-50 border border-red-200' : 'bg-blue-100'
          }`}>
            <span className={`mr-2 ${
              errors.phoneNo ? 'text-red-500' : 'text-blue-600'
            }`}>
              <i className="fas fa-phone"></i>
            </span>
            <div className="flex-1">
              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone Number (optional)"
                value={formData.phoneNo}
                onChange={handleChange}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
              )}
            </div>
          </div>

          <div className={`rounded-lg px-4 py-2 transition-colors ${
            errors.message ? 'bg-red-50 border border-red-200' : 'bg-blue-100'
          }`}>
            <textarea
              name="message"
              placeholder="Your message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none placeholder-gray-500"
              required
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-full transition-all w-full flex items-center justify-center ${
              isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>

      {/* Illustration Section */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center mt-10 md:mt-0 px-4">
        <img
          src={Contact}
          alt="Contact Illustration"
          className="max-w-md w-full h-auto object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ContactUs;