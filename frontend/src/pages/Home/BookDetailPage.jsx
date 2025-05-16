import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Star, MapPin, User, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock book data - replace with actual API call
  const mockBooks = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.5,
      description: "A novel about the serious issues of rape and racial inequality. The story is told by the six-year-old Jean Louise Finch.",
      condition: "Good",
      available: true,
      owner: {
        name: "Sarah Johnson",
        location: "New York, NY",
        rating: 4.8
      },
      details: {
        genre: "Fiction, Classic",
        pages: 281,
        language: "English",
        published: "1960"
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        const foundBook = mockBooks.find(b => b.id === parseInt(id));
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError('Book not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <X className="mx-auto text-red-500" size={48} />
        <h3 className="text-xl text-red-700 mt-4">{error}</h3>
        <button 
          onClick={() => navigate('/search')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to results
        </button>

        {book && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Book Cover */}
              <div className="md:w-1/3 p-6">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Book Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">{book.title}</h1>
                    <p className="text-xl text-blue-600 mt-1">{book.author}</p>
                  </div>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    <Star className="mr-1" size={16} fill="currentColor" />
                    {book.rating}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.available ? 'Available for Swap' : 'Currently Unavailable'}
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {book.condition} Condition
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-blue-700">Description</h2>
                  <p className="mt-2 text-gray-700">{book.description}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Genre</h3>
                    <p className="mt-1 text-blue-800">{book.details.genre}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                    <p className="mt-1 text-blue-800">{book.details.pages}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Language</h3>
                    <p className="mt-1 text-blue-800">{book.details.language}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Published</h3>
                    <p className="mt-1 text-blue-800">{book.details.published}</p>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-blue-700 mb-3">Owner Information</h2>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">{book.owner.name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="text-orange-500 mr-1" size={16} />
                        <span className="text-sm text-gray-600">{book.owner.location}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
                        <span className="text-sm text-gray-600">{book.owner.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                      book.available
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    } transition`}
                    disabled={!book.available}
                  >
                    <Check className="mr-2" size={18} />
                    Request Swap
                  </button>
                  <button className="flex-1 py-3 px-6 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition">
                    Message Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;