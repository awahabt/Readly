import React from 'react';
import { Link } from 'react-router-dom';

const LibraryPage = () => {
  return (
    <div className="container mx-auto p-6"> 
      <h1 className="text-3xl font-bold text-center">Library</h1>
      
      <div className="mt-6 text-center">
        <p>Select a category to view books:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          <Link to="/Category/islamic" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Islamic
          </Link>
          <Link to="/library/urdu" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Urdu
          </Link>
          <Link to="/library/history" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            History
          </Link>
          <Link to="/library/english" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            English
          </Link>
          <Link to="/library/law" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Law
          </Link><Link to="/library/technology" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            IT
          </Link><Link to="/library/business" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Business
          </Link><Link to="/library/science" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Science
          </Link>
          <Link to="/library/math" className="bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700">
            Mathematics
          </Link>
          {/* Add more categories as needed */}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
