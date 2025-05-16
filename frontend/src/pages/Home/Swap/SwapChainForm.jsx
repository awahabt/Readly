"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightLeft,
  BookOpen,
  Plus,
  Trash,
} from "lucide-react";

export default function SwapChainRequestForm() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    { id: 1, title: "", author: "", condition: "good", description: "" },
  ]);
  const [wantedBooks, setWantedBooks] = useState([
    { id: 1, title: "", author: "", minCondition: "acceptable" },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addBook = () => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    setBooks([...books, { id: newId, title: "", author: "", condition: "good", description: "" }]);
  };

  const removeBook = (id) => {
    if (books.length > 1) {
      setBooks(books.filter((b) => b.id !== id));
    } else {
      setError("You must offer at least one book for swapping.");
    }
  };

  const updateBook = (id, field, value) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, [field]: value } : book)));
  };

  const addWantedBook = () => {
    const newId = wantedBooks.length > 0 ? Math.max(...wantedBooks.map((b) => b.id)) + 1 : 1;
    setWantedBooks([...wantedBooks, { id: newId, title: "", author: "", minCondition: "acceptable" }]);
  };

  const removeWantedBook = (id) => {
    if (wantedBooks.length > 1) {
      setWantedBooks(wantedBooks.filter((b) => b.id !== id));
    } else {
      setError("You must request at least one book for swapping.");
    }
  };

  const updateWantedBook = (id, field, value) => {
    setWantedBooks(wantedBooks.map((book) => (book.id === id ? { ...book, [field]: value } : book)));
  };

  const validateForm = () => {
    const offeredBooksValid = books.every((book) => book.title.trim() && book.author.trim());
    if (!offeredBooksValid) {
      setError("Please provide title and author for all books you're offering.");
      return false;
    }

    const wantedBooksValid = wantedBooks.every((book) => book.title.trim());
    if (!wantedBooksValid) {
      setError("Please provide title for all books you're requesting.");
      return false;
    }

    if ((deliveryMethod === "pickup" || deliveryMethod === "both") && !location.trim()) {
      setError("Please provide a pickup location.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/my-swap-requests");
    } catch (err) {
      setError("Error submitting swap request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Swap Chain Request</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <section className="mb-6 p-4 border border-orange-200 rounded-md">
          <h2 className="text-xl font-semibold text-orange-700 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Books You're Offering
          </h2>
          {books.map((book) => (
            <div key={book.id} className="mt-4 space-y-2 border-b pb-4">
              <input
                type="text"
                placeholder="Book Title"
                value={book.title}
                onChange={(e) => updateBook(book.id, "title", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={book.author}
                onChange={(e) => updateBook(book.id, "author", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <select
                value={book.condition}
                onChange={(e) => updateBook(book.id, "condition", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="like-new">Like New</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
                <option value="poor">Poor</option>
              </select>
              <textarea
                placeholder="Description (optional)"
                value={book.description}
                onChange={(e) => updateBook(book.id, "description", e.target.value)}
                className="w-full border p-2 rounded"
              />
              {books.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBook(book.id)}
                  className="text-red-600 text-sm flex items-center gap-1 mt-1"
                >
                  <Trash className="w-4 h-4" /> Remove Book
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBook}
            className="mt-2 flex items-center gap-1 text-orange-600 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Another Book
          </button>
        </section>

        <section className="mb-6 p-4 border border-blue-200 rounded-md">
          <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" /> Books You Want
          </h2>
          {wantedBooks.map((book) => (
            <div key={book.id} className="mt-4 space-y-2 border-b pb-4">
              <input
                type="text"
                placeholder="Book Title"
                value={book.title}
                onChange={(e) => updateWantedBook(book.id, "title", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Author (optional)"
                value={book.author}
                onChange={(e) => updateWantedBook(book.id, "author", e.target.value)}
                className="w-full border p-2 rounded"
              />
              <select
                value={book.minCondition}
                onChange={(e) => updateWantedBook(book.id, "minCondition", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="like-new">Like New</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
                <option value="any">Any Condition</option>
              </select>
              {wantedBooks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWantedBook(book.id)}
                  className="text-red-600 text-sm flex items-center gap-1 mt-1"
                >
                  <Trash className="w-4 h-4" /> Remove Book
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addWantedBook}
            className="mt-2 flex items-center gap-1 text-blue-600 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Another Book
          </button>
        </section>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Delivery Method</h2>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="w-full border p-2 rounded mt-2"
          >
            <option value="pickup">Pickup from public place</option>
          </select>
          {deliveryMethod === "pickup" && (
            <input
              type="text"
              placeholder="Pickup Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Swap Request"}
        </button>
      </form>
    </div>
  );
}
