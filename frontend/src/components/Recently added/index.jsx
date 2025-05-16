// src/pages/Recently.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../BookCard';
import BookDetailsModal from '../BookDetailsModal';

export default function Recently() {
  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        setBooks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

   // Function to truncate text to a specific length
   const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
    navigate("/cart", { state: { cart: [...cart, book] } });
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };
  const handleCloseModal = () => {
    setSelectedBook(null);
  };
  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    navigate("/wishlist", { state: { wishlist: [...wishlist, book] } });
  };


  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-yellow-500 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        &#9733;
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="text-xl">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Recently Added</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 w-full">
        {books.map((book, index) => (
         <BookCard
         key={index}
         book={book}
         onAddToCart={addToCart}
         onViewDetails={handleViewDetails}
         truncateText={truncateText}
       />
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/cart', { state: { cart } })}
          className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Cart ({cart.length} items)
        </button>
      </div>
      {/* Modal for Book Details */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
          onAddToWishlist={addToWishlist}
        />
      )}
    </div>
  );
}
