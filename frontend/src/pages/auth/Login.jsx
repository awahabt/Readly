import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- import useNavigate
import { login as ImgLogin } from "../../assets";
import AuthContext from "../../context/authContext";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/"); // <-- navigate to dashboard after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl z-10">
        {/* Left Side */}
        <div className="bg-blue-500 flex items-center justify-center p-8 md:w-1/2">
          <div className="text-center">
            <img src={ImgLogin} alt="Be Verified" className="mx-auto mb-4" />
            <h2 className="text-2xl text-white font-semibold mb-2">
              Be Verified
            </h2>
            <p className="text-white text-sm">Login to be on Platform</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 md:p-10 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hello, Again
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            We are happy to have you back.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@domain.com"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
            >
              Login
            </button>
            <button
              type="button"
              className="flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-600 font-bold py-2 px-4 rounded w-full hover:bg-gray-200"
              onClick={() =>
                (window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/auth/google`)
              }
            >
              Sign in with Google
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-4 text-center">
            <Link to={"/forgot"} className="text-blue-500 hover:underline">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
