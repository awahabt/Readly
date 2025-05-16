import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const location = useLocation(); // To get the state passed from the Recently page
  const navigate = useNavigate();
  const wishlist = location.state?.wishlist || []; // Default to empty array if no state is passed

  // Function to remove a book from the wishlist
  const removeFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter((item) => item !== book);
    navigate('/wishlist', { state: { wishlist: updatedWishlist } });
  };

  // Function to navigate to Cart page and add the book to cart
  const handleAddToCart = (book) => {
    navigate('/cart', { state: { cart: [book] } }); // Navigate to Cart with the selected book
  };

  return (
    <div className="w-full py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>

      {/* Check if there are no items in the wishlist */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-600 mb-4">Your wishlist is empty.</p>
          <button
            onClick={() => navigate('/')} // Navigate to homepage
            className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg mb-4"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate('/cart')} // Navigate to cart page
            className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg"
          >
            View Cart
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mx-10 w-full">
          {wishlist.map((book, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-xl font-semibold mb-2">{book.title}</p>
                <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                <p className="text-lg font-semibold text-blue-500">Rs{book.rentalPrice} / day</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(book)} // Adds the book to cart
                  className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
                >
                  Add to Cart
                </button>

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(book)} // Removes the book from wishlist
                  className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
