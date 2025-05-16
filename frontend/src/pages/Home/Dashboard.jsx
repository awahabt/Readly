import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [],
    author: "",
    category: "",
    edition: "",
    rentPerDay: "",
    availableQuantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "Islamic",
    "Urdu",
    "History",
    "Law",
    "IT",
    "Business",
    "Science",
    "Mathematics",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData({
      ...formData,
      photos: files,
    });

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("edition", formData.edition);
      formDataToSend.append("rentPerDay", formData.rentPerDay);
      formDataToSend.append("availableQuantity", formData.availableQuantity);

      formData.photos.forEach((photo) => {
        formDataToSend.append("photos", photo);
      });

      const response = await axios.post("/books", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      // Clean up preview URLs
      photoPreview.forEach(url => URL.revokeObjectURL(url));
      setPhotoPreview([]);

      setFormData({
        title: "",
        description: "",
        photos: [],
        author: "",
        category: "",
        edition: "",
        rentPerDay: "",
        availableQuantity: "",
      });

      // Show success message
      alert("Book added successfully!");
      navigate("/user"); // Redirect to user dashboard after success
    } catch (err) {
      if (err.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setError("Your session has expired. Please login again.");
        navigate("/login");
      } else {
        setError(err.response?.data?.error || err.message || "Failed to add book");
        console.error("Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-blue-200 to-orange-200 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-8 py-6 flex items-center">
            <button
              type="button"
              onClick={handleReturnBack}
              className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex-1">
              Add New Book
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                {/* Book Title */}
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                    Author's Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author's name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    Book Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-all"
                      required
                    >
                      <option value="">Select a Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Edition */}
                <div>
                  <label htmlFor="edition" className="block text-gray-700 font-medium mb-2">
                    Book Edition
                  </label>
                  <input
                    type="text"
                    id="edition"
                    name="edition"
                    value={formData.edition}
                    onChange={handleChange}
                    placeholder="e.g. First Edition, 2023"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-5">
                {/* Rent Per Day */}
                <div>
                  <label htmlFor="rentPerDay" className="block text-gray-700 font-medium mb-2">
                    Rent Per Day (in RS)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">RS</span>
                    </div>
                    <input
                      type="number"
                      id="rentPerDay"
                      name="rentPerDay"
                      value={formData.rentPerDay}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Available Quantity */}
                <div>
                  <label htmlFor="availableQuantity" className="block text-gray-700 font-medium mb-2">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    id="availableQuantity"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleChange}
                    placeholder="Enter available copies"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                    min="1"
                  />
                </div>

                {/* Photos */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Photos (Max 5)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="photos" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">Drag your images here or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5 files</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Preview Images */}
                  {photoPreview.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">{photoPreview.length} file(s) selected</p>
                      <div className="flex overflow-x-auto space-x-2 pb-2">
                        {photoPreview.map((url, index) => (
                          <div key={index} className="relative flex-shrink-0">
                            <img src={url} alt={`Preview ${index}`} className="h-16 w-16 object-cover rounded-md border border-gray-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="mt-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Book Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed description of the book"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? 'bg-orange-400' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                } text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all shadow-lg flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;