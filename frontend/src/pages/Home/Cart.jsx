import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BooksListPage = () => {
  const location = useLocation();
  const { cart: initialCart, totalPrice: initialTotalPrice, address: initialAddress } = location.state || { cart: [], totalPrice: 0, address: '' };

  const [cart, setCart] = useState(initialCart); // Local state for the cart
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice); // Local state for total price
  const [address, setAddress] = useState(initialAddress); // Local state for address

  const navigate = useNavigate();

  const handleRemoveBook = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Remove the book at the given index
    setCart(updatedCart);
    const updatedTotalPrice = updatedCart.reduce((total, book) => total + book.rentalPrice, 0);
    setTotalPrice(updatedTotalPrice);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout', { state: { cart, totalPrice, address } }); // Pass cart and address to CheckoutPage
    } else {
      alert('Your cart is empty! Please add some books to the cart.');
    }
  };

  const handleGoToHomepage = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handleGoToWishlist = () => {
    navigate('/wishlist'); // Navigate to the wishlist page
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some books to the cart!</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul>
            {cart.map((book, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center">
                  <img src={book.image} alt={book.title} className="w-16 h-24 object-cover rounded-md mr-4" />
                  <div>
                    <span className="font-semibold">{book.title}</span> - Rs{book.rentalPrice} / day
                  </div>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveBook(index)} // Remove book from cart
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between text-lg font-semibold text-gray-700">
            <span>Total Rental Price</span>
            <span className="text-blue-500">Rs{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-6 text-center space-x-4">
        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Proceed to Checkout
        </button>

        {/* Navigate to Homepage Button */}
        <button
          onClick={handleGoToHomepage}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Go to Homepage
        </button>

        {/* Navigate to Wishlist Button */}
        <button
          onClick={handleGoToWishlist}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Go to Wishlist
        </button>
      </div>
    </div>
  );
};

export default BooksListPage;
