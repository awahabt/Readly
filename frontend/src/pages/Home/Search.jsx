import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../../components/BookCard';
import BookDetailsModal from '../../components/BookDetailsModal';

const Search = () => {
  const [cart, setCart] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/books');
        setAllBooks(response.data.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } else {
      setSearchResults(allBooks);
    }
  }, [searchQuery, allBooks]);


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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No books found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((book, index) => (
              <BookCard
              key={index}
              book={book}
              onAddToCart={addToCart}
              onViewDetails={handleViewDetails}
              truncateText={truncateText}
            />
            ))}
          </div>
        )}
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
};

export default Search; 