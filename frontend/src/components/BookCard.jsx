import { useState } from "react";

// Book Card Component
const BookCard = ({ book, onAddToCart, onViewDetails, truncateText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with overlay on hover */}
      <div className="relative w-full h-64 bg-gray-100">
        <img
          src={
            book.photos && book.photos[0]?.url
              ? book.photos[0].url
              : "/placeholder-book.jpg"
          }
          alt={book.title}
          className="h-full w-full object-cover transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-book.jpg";
          }}
        />

        {/* Hover overlay with quick actions */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => onViewDetails(book)}
            className="bg-white text-gray-800 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Book info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {book.title}
          </h3>
          <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
            {book.category}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
          {truncateText(book.description, 120)}
        </p>

        <div className="flex items-center justify-between mt-2 mb-4">
          <div className="flex items-center">
            <span className="text-lg font-bold text-orange-500">
              Rs {book.rentPerDay}
            </span>
            <span className="text-xs text-gray-500 ml-1">/ day</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-blue-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
            </svg>
            <span className="text-sm text-gray-600">
              {book.edition || "1st Edition"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{book.author}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
            <span>{book.availableQuantity || 0} left</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(book);
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default BookCard;
