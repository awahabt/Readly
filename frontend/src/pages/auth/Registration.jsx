import React, { useState } from 'react'
import { signup } from '../../assets';
const Registration = () => {
  const BACKEND_URL = 'http://localhost:8000/api/auth/signup';
  console.log(BACKEND_URL)
  const [loader,setLoader]=useState(false)
  const [message,setMessage]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
    permanentAddress: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  
    setLoader(true);
    setMessage(null);
  
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },  // ✅ Add this
        body: JSON.stringify(formData),  // ✅ Send JSON instead of FormData
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect after success
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoader(false);
    }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left Side */}
        <div className="bg-blue-500 flex items-center justify-center p-8 md:w-1/2">
          <div className="text-center">
            <img
              src={signup}
              alt="Become a Member Now"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl text-white font-semibold mb-2">Become a Member Now</h2>
            <p className="text-white text-sm">
              Become a member to have your required books
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 md:p-10 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hello, Again</h2>
          <p className="text-sm text-gray-500 mb-6">
            Create an account to join us today.
          </p>
          <form onSubmit={(e)=>handleSubmit(e)}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="phone_no">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_no"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
        
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="currentAddress">
                Current Address
              </label>
              <input
                type="text"
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="permanentAddress">
                Permanent Address
              </label>
              <input
                type="text"
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>


            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loader}
              className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
            >
              Sign Up
            </button>

            {/* Google Signup */}
            <button
              type="button"
              className="flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-600 font-bold py-2 px-4 rounded w-full hover:bg-gray-200"
              onClick={() =>
                (window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/auth/google`)
              }
            >

              Sign up with Google
            </button>
          </form>

          {/* Already Have an Account */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration
