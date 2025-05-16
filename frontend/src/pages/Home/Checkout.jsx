import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [updatedCart, setUpdatedCart] = useState(cart);
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [paymentMethod] = useState('Debit Card'); // Fixed payment method
  const [deliveryCharges] = useState(100);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handleDaysChange = (index, event) => {
    const updatedBooks = [...updatedCart];
    const days = parseInt(event.target.value, 10);
    updatedBooks[index].rentalDays = days < 1 ? 1 : days;
    const newTotalPrice = updatedBooks.reduce(
      (acc, item) => acc + item.rentalPrice * (item.rentalDays || 1),
      0
    );
    setUpdatedCart(updatedBooks);
    setUpdatedTotalPrice(newTotalPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardRegex = /^\d{16}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const cvvRegex = /^\d{3}$/;
    const contactRegex = /^\d{11}$/;

    if (!address || !contactNumber || !cardNumber || !cardHolderName || !expiryMonth || !expiryYear || !cvv) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (!cardRegex.test(cardNumber)) {
      alert("Card number must be exactly 16 digits.");
      return;
    }
    if (!nameRegex.test(cardHolderName)) {
      alert("Cardholder name must contain only letters.");
      return;
    }
    if (!cvvRegex.test(cvv)) {
      alert("CVV must be exactly 3 digits.");
      return;
    }
    if (!contactRegex.test(contactNumber)) {
      alert("Contact number must be exactly 11 digits.");
      return;
    }

    alert(`
      Your order has been confirmed! 
      Total Price: Rs${updatedTotalPrice + deliveryCharges}
      Payment Method: ${paymentMethod}
      Delivery Charges: Rs${deliveryCharges}
      Books: ${updatedCart.map(item => `${item.title} (${item.rentalDays} days)`).join(', ')}
      Address: ${address}
      Contact: ${contactNumber}
    `);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Checkout</h1>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Cart</h2>
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
        >
          Return to Homepage
        </button>
        <div className="space-y-4">
          {updatedCart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div>
                <span className="font-semibold">{item.title}</span> - Rs{item.rentalPrice}/day
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700">Days</label>
                <input
                  type="number"
                  value={item.rentalDays || 1}
                  onChange={(e) => handleDaysChange(index, e)}
                  min="1"
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="mt-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between font-semibold text-gray-700">
            <span>Total Rental Price</span>
            <span className="text-blue-500">Rs{updatedTotalPrice}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between font-semibold text-gray-700">
            <span>Delivery Charges</span>
            <span className="text-blue-500">Rs{deliveryCharges}</span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-blue-600">Payment Method: Debit Card</h2>

        <div>
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            maxLength="16"
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 16-digit card number"
          />
        </div>

        <div>
          <label className="block text-gray-700">Cardholder Name</label>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter cardholder name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Expiry Month</label>
            <select
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                  {(i + 1).toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Expiry Year</label>
            <select
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 12 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="CVV"
          />
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-blue-600">Delivery Address</h2>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            maxLength="11"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="11-digit number"
          />
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
