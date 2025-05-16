import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationToast from "../../components/NotificationToast";

export default function RequestSwapPage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    bookHave: {
      title: "",
      author: "",
      isbn: "",
      condition: "very-good",
      description: "",
      images: []
    },
    bookWant: {
      title: "",
      author: "",
      isbn: "",
      condition: "good",
      alternatives: "",
      images: []
    },
    delivery: {
      method: "pickup",
      address: "",
      date: "",
      notes: ""
    }
  });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e, section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value
      }
    }));
  };

  const handleBookHaveImages = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      bookHave: {
        ...prev.bookHave,
        images: files
      }
    }));
  };

  const handleBookWantImages = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      bookWant: {
        ...prev.bookWant,
        images: files
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Validation
    if (formData.bookHave.images.length !== 2) {
      setNotification({
        title: "Validation Error",
        description: "Please upload exactly 2 images for the book you have.",
        status: "error"
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.bookWant.images.length !== 2) {
      setNotification({
        title: "Validation Error",
        description: "Please upload exactly 2 images for the book you want.",
        status: "error"
      });
      setIsSubmitting(false);
      return;
    }
  
    if (!formData.delivery.date || formData.delivery.date < today) {
      setNotification({
        title: "Validation Error",
        description: "Please select a valid swap date from today onward.",
        status: "error"
      });
      setIsSubmitting(false);
      return;
    }
  
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification({
        title: "Authentication Error",
        description: "Please log in to submit a swap request.",
        status: "error"
      });
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    form.append("data", JSON.stringify({
      bookHave: { ...formData.bookHave, images: undefined },
      bookWant: { ...formData.bookWant, images: undefined },
      delivery: formData.delivery
    }));
  
    formData.bookHave.images.forEach(file => form.append("bookHaveImages", file));
    formData.bookWant.images.forEach(file => form.append("bookWantImages", file));
  
    try {
      const response = await fetch("http://localhost:8000/api/swap-requests", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: form
      });
  
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Submission failed");
      }

      setNotification({
        title: "Success!",
        description: "Your swap request has been submitted for admin approval.",
        status: "success"
      });

      // Reset form only on success
      setFormData({
        bookHave: {
          title: "",
          author: "",
          isbn: "",
          condition: "very-good",
          description: "",
          images: []
        },
        bookWant: {
          title: "",
          author: "",
          isbn: "",
          condition: "good",
          alternatives: "",
          images: []
        },
        delivery: {
          method: "pickup",
          address: "",
          date: "",
          notes: ""
        }
      });
      setFormStep(1);
    } catch (err) {
      console.error("Submission error:", err);
      setNotification({
        title: "Error",
        description: err.message || "Failed to submit swap request. Please try again.",
        status: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <NotificationToast
            title={notification.title}
            description={notification.description}
            status={notification.status}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
      
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <Link to="/" className="text-sm text-blue-500 hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">📚 Request a Book Swap</h1>

        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              onClick={() => setFormStep(step)}
              className={`flex-1 text-center cursor-pointer py-2 border-b-2 ${
                formStep === step ? "border-blue-500 font-semibold" : "border-gray-300"
              }`}
            >
              Step {step}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {formStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">📘 Book You Have</h2>

              <input 
                placeholder="Book Title" 
                required 
                className="w-full p-2 border rounded"
                value={formData.bookHave.title}
                onChange={(e) => handleChange(e, 'bookHave', 'title')}
              />
              <input 
                placeholder="Author" 
                required 
                className="w-full p-2 border rounded"
                value={formData.bookHave.author}
                onChange={(e) => handleChange(e, 'bookHave', 'author')}
              />
              <input 
                placeholder="ISBN (Optional)" 
                className="w-full p-2 border rounded"
                value={formData.bookHave.isbn}
                onChange={(e) => handleChange(e, 'bookHave', 'isbn')}
              />
              <select 
                className="w-full p-2 border rounded"
                value={formData.bookHave.condition}
                onChange={(e) => handleChange(e, 'bookHave', 'condition')}
              >
                <option value="like-new">Like New</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
              </select>
              <textarea 
                placeholder="Description (Optional)" 
                rows="3" 
                className="w-full p-2 border rounded"
                value={formData.bookHave.description}
                onChange={(e) => handleChange(e, 'bookHave', 'description')}
              />

              <div>
                <label className="block font-medium mb-1">Upload 2 Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleBookHaveImages} 
                  className="w-full" 
                />
              </div>

              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setFormStep(2)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">📗 Book You Want</h2>

              <input 
                placeholder="Book Title" 
                required 
                className="w-full p-2 border rounded"
                value={formData.bookWant.title}
                onChange={(e) => handleChange(e, 'bookWant', 'title')}
              />
              <input 
                placeholder="Author" 
                required 
                className="w-full p-2 border rounded"
                value={formData.bookWant.author}
                onChange={(e) => handleChange(e, 'bookWant', 'author')}
              />
              <input 
                placeholder="ISBN (Optional)" 
                className="w-full p-2 border rounded"
                value={formData.bookWant.isbn}
                onChange={(e) => handleChange(e, 'bookWant', 'isbn')}
              />
              <select 
                className="w-full p-2 border rounded"
                value={formData.bookWant.condition}
                onChange={(e) => handleChange(e, 'bookWant', 'condition')}
              >
                <option value="like-new">Like New</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
              </select>
              <textarea 
                placeholder="Alternative Books (Optional)" 
                rows="3" 
                className="w-full p-2 border rounded"
                value={formData.bookWant.alternatives}
                onChange={(e) => handleChange(e, 'bookWant', 'alternatives')}
              />

              <div>
                <label className="block font-medium mb-1">Upload 2 Images</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleBookWantImages} 
                  className="w-full" 
                />
              </div>

              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setFormStep(1)} 
                  className="border px-4 py-2 rounded"
                >
                  ← Previous
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormStep(3)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">🚚 Delivery Options</h2>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="pickup"
                    checked={formData.delivery.method === "pickup"}
                    onChange={() => handleChange({target: {value: "pickup"}}, 'delivery', 'method')}
                  />
                  Pickup from Public Place
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="delivery"
                    checked={formData.delivery.method === "delivery"}
                    onChange={() => handleChange({target: {value: "delivery"}}, 'delivery', 'method')}
                  />
                  Delivery
                </label>
              </div>

              {formData.delivery.method === "delivery" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Delivery Address"
                    value={formData.delivery.address}
                    onChange={(e) => handleChange(e, 'delivery', 'address')}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block font-medium">Preferred Swap Date</label>
                <input
                  type="date"
                  min={today}
                  value={formData.delivery.date}
                  onChange={(e) => handleChange(e, 'delivery', 'date')}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <textarea 
                placeholder="Additional Notes (Optional)" 
                rows="3" 
                className="w-full p-2 border rounded"
                value={formData.delivery.notes}
                onChange={(e) => handleChange(e, 'delivery', 'notes')}
              />

              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setFormStep(2)} 
                  className="border px-4 py-2 rounded"
                >
                  ← Previous
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}