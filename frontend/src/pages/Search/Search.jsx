import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../../components/BookCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

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

  useEffect(() => {
    if (query) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.description?.toLowerCase().includes(query.toLowerCase()) ||
        book.category?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [query, books]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleViewDetails = (book) => {
    navigate(`/book-details/${book._id}`);
  };

  const addToCart = (book) => {
    navigate('/cart', { state: { cart: [book] } });
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {query ? `Search Results for "${query}"` : 'All Books'}
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
        </p>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No books found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book._id || index}
              book={book}
              onAddToCart={addToCart}
              onViewDetails={handleViewDetails}
              truncateText={truncateText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 