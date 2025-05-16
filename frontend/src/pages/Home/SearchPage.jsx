import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock book data - replace with actual API call
  const mockBooks = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.5,
      description: "A novel about the serious issues of rape and racial inequality.",
      condition: "Good",
      available: true
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverImage: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.7,
      description: "A dystopian social science fiction novel and cautionary tale.",
      condition: "Excellent",
      available: true
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.3,
      description: "A story of wealth, love, and the American Dream in the 1920s.",
      condition: "Fair",
      available: false
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        if (searchQuery.trim() === '') {
          setSearchResults([]);
        } else {
          const results = mockBooks.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(results);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results');
        setLoading(false);
      }
    }, 800);
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            Find Your Next Book Swap
          </h1>
          <p className="text-lg text-blue-600">
            Search by title, author, or ISBN
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books..."
              className="w-full p-4 pl-12 pr-20 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
            />
            <Search className="absolute left-4 text-blue-500" size={20} />
            <button
              type="submit"
              className="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((book) => (
              <div 
                key={book.id} 
                onClick={() => handleBookClick(book.id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer border border-blue-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-blue-800">{book.title}</h3>
                    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      <Star className="mr-1" size={14} fill="currentColor" />
                      {book.rating}
                    </div>
                  </div>
                  <p className="text-blue-600 mb-3">{book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      book.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="text-sm text-orange-600">{book.condition} Condition</span>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                    View Details <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && searchQuery && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-blue-400" size={48} />
              <h3 className="text-xl text-blue-700 mt-4">No books found</h3>
              <p className="text-blue-500">Try a different search term</p>
            </div>
          )
        )}

        {/* Empty State */}
        {!searchQuery && !loading && (
          <div className="text-center py-12">
            <Search className="mx-auto text-blue-400" size={48} />
            <h3 className="text-xl text-blue-700 mt-4">Search for books to swap</h3>
            <p className="text-blue-500">Enter a title, author, or ISBN above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;