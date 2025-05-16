import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { islamic, urdu, history, english, law, it, business, science, math } from "../../assets";
import { useEffect } from "react";
import axios from "axios";

export default function Feature() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState({});

  const categories = [
    { name: "Islamic", image: islamic, link: "/category/islamic" },
    { name: "Urdu", image: urdu, link: "/category/urdu" },
    { name: "History", image: history, link: "/category/history" },
    { name: "English", image: english, link: "/category/english" },
    { name: "Law", image: law, link: "/category/law" },
    { name: "IT", image: it, link: "/category/it" },
    { name: "Business", image: business, link: "/category/business" },
    { name: "Science", image: science, link: "/category/science" },
    { name: "Mathematics", image: math, link: "/category/mathematics" },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        const fetchedBooks = response.data.data;
        setBooks(fetchedBooks);
        
        // Filter books by category
        const filtered = {};
        categories.forEach(category => {
          filtered[category.name] = fetchedBooks.filter(book => 
            book.category.toLowerCase() === category.name.toLowerCase()
          );
        });
        setFilteredBooks(filtered);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
      <div className="grid px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, i) => (
          <Link 
            to={category.link} 
            key={i} 
            className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            state={{ books: filteredBooks[category.name] || [] }}
          >
            <img src={category.image} alt={category.name} className="w-full object-contain" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
