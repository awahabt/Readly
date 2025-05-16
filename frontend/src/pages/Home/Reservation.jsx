import React, { useState } from 'react';

const BookReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bookTitle: '',
    author: '',
    isbn: '',
    rentalStart: '',
    rentalEnd: '',
    pickupLocation: '',
    homeDelivery: false,
    deliveryAddress: '',
    notes: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [reservationPosted, setReservationPosted] = useState(false);


  const checkBookAvailability = async (title) => {
  try {
    const response = await fetch('http://localhost:8000/api/book/');
    const data = await response.json();

    if (data.success) {
      const available = data.data.some((book) =>
        book.title.toLowerCase() === title.toLowerCase()
      );
      return available ? "available" : "notAvailable";
    } else {
      throw new Error('Failed to fetch books');
    }
  } catch (error) {
    console.error("Error checking book availability:", error);
    return "error";
  }
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const availability = checkBookAvailability(formData.bookTitle);
    if (availability === "notAvailable") {
      setErrorMessage("This book is not available.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setReservationPosted(true);
        setErrorMessage('');
        setFormData({
          name: '',
          phone: '',
          email: '',
          bookTitle: '',
          author: '',
          isbn: '',
          rentalStart: '',
          rentalEnd: '',
          pickupLocation: '',
          homeDelivery: false,
          deliveryAddress: '',
          notes: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit reservation.');
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-6 rounded-xl shadow-lg border border-blue-300">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Book Reservation Form</h2>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {reservationPosted && <p className="text-green-600 mb-4">Reservation submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-700">Name *</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded p-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-blue-700">Phone *</label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full border border-gray-300 rounded p-2"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-blue-700">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-orange-600 font-semibold">Book Information</label>
          <input
            name="bookTitle"
            type="text"
            required
            placeholder="Book Title"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            value={formData.bookTitle}
            onChange={handleChange}
          />
          <input
            name="author"
            type="text"
            required
            placeholder="Author"
            className="w-full mt-2 border border-gray-300 rounded p-2"
            value={formData.author}
            onChange={handleChange}
          />
          <input
            name="isbn"
            type="text"
            placeholder="ISBN (optional)"
            className="w-full mt-2 border border-gray-300 rounded p-2"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-blue-700">Rental Start *</label>
            <input
              name="rentalStart"
              type="date"
              required
              className="w-full border border-gray-300 rounded p-2"
              value={formData.rentalStart}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-blue-700">Rental End *</label>
            <input
              name="rentalEnd"
              type="date"
              required
              className="w-full border border-gray-300 rounded p-2"
              value={formData.rentalEnd}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-blue-700">Pickup Location</label>
          <input
            name="pickupLocation"
            type="text"
            placeholder="Enter pickup location"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.pickupLocation}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            name="homeDelivery"
            type="checkbox"
            checked={formData.homeDelivery}
            onChange={handleChange}
            className="accent-orange-500"
          />
          <label className="text-blue-700">Request home delivery?</label>
        </div>

        {formData.homeDelivery && (
          <div>
            <label className="block text-blue-700">Delivery Address</label>
            <input
              name="deliveryAddress"
              type="text"
              placeholder="Enter delivery address"
              className="w-full border border-gray-300 rounded p-2"
              value={formData.deliveryAddress}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label className="block text-blue-700">Additional Notes</label>
          <textarea
            name="notes"
            rows="3"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Any special requests or information"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
        >
          Submit Reservation
        </button>
      </form>
    </div>
  );
};

export default BookReservationForm;
