import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { business, jewish } from "../../../assets";

const Business = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const books = [
    {
      title: "The Sealed Nectar",
      image: jewish,
      rentalPrice: 50,
      description:
        "A comprehensive biography of Prophet Muhammad (PBUH) by Saif-ur-Rahman al-Mubarakpuri.",
    },
    {
      title: "Stories of the Prophets",
      image: business,
      rentalPrice: 40,
      description:
        "An engaging account of the lives of the prophets by Ibn Kathir.",
    },
    {
      title: "The Quran",
      image: jewish,
      rentalPrice: 30,
      description:
        "English translation of the Quran by Abdullah Yusuf Ali, offering clarity and depth.",
    },
  ];

  const addToCart = (book) => {
    setCart([...cart, book]);
    navigate("/cart", { state: { cart: [...cart, book] } });
  };

  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    navigate("/wishlist", { state: { wishlist: [...wishlist, book] } });
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="w-full py-12 px-4 flex flex-col items-center bg-gradient-to-br from-blue-100 to-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 mb-8">Business Books</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg w-64 flex flex-col"
          >
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-lg font-semibold mb-1 text-blue-500">{book.title}</p>
              <p className="text-sm text-gray-600 flex-grow">{book.description}</p>
              <p className="text-md font-bold text-orange-500 mt-2">
                Rs {book.rentalPrice} / day
              </p>
              <button
                onClick={() => addToCart(book)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleViewDetails(book)}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/cart", { state: { cart } })}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Cart ({cart.length} items)
        </button>
      </div>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-4 text-gray-400 hover:text-black text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">
              {selectedBook.title}
            </h3>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedBook.description}</p>
            <p className="text-lg font-semibold text-orange-500 mb-4">
              Rs {selectedBook.rentalPrice} / day
            </p>

            <button
              onClick={() => addToCart(selectedBook)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(selectedBook)}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Business;
