import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedSwaps() {
  // This would typically come from an API call - now filtered to only show approved swaps
  const featuredSwaps = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      condition: "Like New",
      owner: "Jane Doe",
      wantsToSwapFor: "To Kill a Mockingbird, 1984, Brave New World",
      imageUrl: "/placeholder.svg?height=200&width=150",
      status: "approved",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      condition: "Good",
      owner: "John Smith",
      wantsToSwapFor: "Animal Farm, Fahrenheit 451, The Handmaid's Tale",
      imageUrl: "/placeholder.svg?height=200&width=150",
      status: "approved",
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      condition: "Very Good",
      owner: "Emily Johnson",
      wantsToSwapFor: "Sense and Sensibility, Emma, Persuasion",
      imageUrl: "/placeholder.svg?height=200&width=150",
      status: "approved",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      condition: "Acceptable",
      owner: "Michael Brown",
      wantsToSwapFor: "The Lord of the Rings, The Silmarillion",
      imageUrl: "/placeholder.svg?height=200&width=150",
      status: "approved",
    },
  ];

  // Only display approved swaps
  const approvedSwaps = featuredSwaps.filter((swap) => swap.status === "approved");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-700">Featured Swap Requests</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Browse through our latest approved swap requests and find your next great read.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {approvedSwaps.map((swap) => (
            <div key={swap.id} className="overflow-hidden border rounded-lg bg-white shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={swap.imageUrl || "/placeholder.svg"}
                  alt={swap.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2">{swap.condition}</span>
                <h3 className="text-lg font-bold text-blue-700">{swap.title}</h3>
                <p className="text-sm text-gray-600">by {swap.author}</p>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Owner:</span> {swap.owner}
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium text-blue-700">Wants to swap for:</p>
                  <p className="text-sm text-gray-600">{swap.wantsToSwapFor}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link to={`/swap-request/${swap.id}`} className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/browse" className="inline-flex items-center gap-2 py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            View All Available Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
