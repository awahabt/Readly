// src/pages/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const booksData = [
  {
    id: 1,
    title: 'The Routledge Atlas of Jewish History',
    image: '/path/to/jewish.jpg', // Update with the correct image path
    rentalPrice: 5,
    description: 'A comprehensive history of the Jewish people and their journey through time.',
    rating: 0,
  },
  {
    id: 2,
    title: 'European Warfare, 1660-1815',
    image: '/path/to/european.jpg', // Update with the correct image path
    rentalPrice: 6,
    description: 'An in-depth look into European wars between 1660 and 1815, a time of great military innovation.',
    rating: 0,
  },
  // Add other books here...
];

const BookDetails = () => {
  const { id } = useParams(); // Use URL parameter for the book id
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  // Fetch the book data based on the id from URL
  useEffect(() => {
    const foundBook = booksData.find((b) => b.id === parseInt(id));
    setBook(foundBook);
  }, [id]);

  const [rating, setRating] = useState(book?.rating || 0);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`cursor-pointer text-2xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        onClick={() => setRating(i + 1)}
      >
        &#9733;
      </span>
    ));
  };

  const handleAddToCart = () => {
    navigate('/cart', { state: { cart: [book] } });
  };

  const handleAddToWishlist = () => {
    navigate('/wishlist', { state: { wishlist: [book] } });
  };

  if (!book) {
    return <div className="text-center text-red-500 py-10">Book not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
      >
        Back to Recently Added
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-48 h-64 object-cover rounded-md mr-0 md:mr-6 mb-4 md:mb-0"
          />
          <div>
            <h1 className="text-3xl font-semibold mb-2">{book.title}</h1>
            <div className="mb-4">{renderStars()}</div>
            <p className="text-lg text-gray-700 mb-4">{book.description}</p>
            <p className="text-xl font-bold text-blue-500">Rs{book.rentalPrice} / day</p>
          </div>
        </div>

        <div className="space-x-4 flex">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
