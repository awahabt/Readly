import React, { useState, useEffect } from "react";
import DeliveryForm from "./DeliveryForm"; // Ensure this is a plain React version
// import { findSwapChains, enrichSwapChains } from "../lib/swap-matching";
import { useParams, Link } from "react-router-dom";

export default function SwapChainDetailsPage() {
  const { id } = useParams();
  const [swapChain, setSwapChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [participationStatus, setParticipationStatus] = useState("pending");

  useEffect(() => {
    const fetchSwapChain = async () => {
      const swapRequests = [
        {
          id: "SR-1234",
          userId: "U-1001",
          user: "John Doe",
          bookOffered: "C++ Programming",
          bookWanted: "Java Programming",
          condition: "Very Good",
          status: "approved",
          date: "2023-04-10",
          description: "Third edition, includes all code examples and exercises.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
        {
          id: "SR-1235",
          userId: "U-1002",
          user: "Jane Smith",
          bookOffered: "JavaScript Programming",
          bookWanted: "C++ Programming",
          condition: "Good",
          status: "approved",
          date: "2023-04-09",
          description: "Modern JavaScript guide with ES6+ features covered in detail.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
        {
          id: "SR-1236",
          userId: "U-1003",
          user: "Bob Johnson",
          bookOffered: "Java Programming",
          bookWanted: "JavaScript Programming",
          condition: "Like New",
          status: "approved",
          date: "2023-04-08",
          description: "Comprehensive Java guide with practical examples.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
      ];

      const chains = findSwapChains(swapRequests);
      const enrichedChains = enrichSwapChains(chains, swapRequests);
      const targetChain = enrichedChains.find((chain) => chain.some((request) => request.id === id));

      setSwapChain(targetChain || []);
      setLoading(false);
    };

    fetchSwapChain();
  }, [id]);

  const handleConfirmParticipation = () => {
    setShowDeliveryForm(true);
  };

  const handleRejectParticipation = () => {
    setParticipationStatus("rejected");
    alert("You have rejected participation in this swap chain.");
  };

  const handleDeliverySubmit = (deliveryData) => {
    console.log("Delivery data:", deliveryData);
    setShowDeliveryForm(false);
    setParticipationStatus("confirmed");
    alert("You have confirmed your participation in this swap chain!");
  };

  if (loading) {
    return (
      <div className="container max-w-4xl py-12 flex justify-center items-center">
        <p>Loading swap chain details...</p>
      </div>
    );
  }

  if (!swapChain || swapChain.length === 0) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="mb-8 flex items-center gap-2">
          <Link to="/swap-chains" className="text-sm text-gray-500 hover:underline">
            ← Back to Swap Chains
          </Link>
        </div>
        <div className="border p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Swap Chain Not Found</h2>
          <p className="text-gray-600 mb-4">The swap chain you're looking for doesn't exist or has been completed.</p>
          <Link to="/swap-chains" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Available Swap Chains
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex items-center gap-2">
        <Link to="/swap-chains" className="text-sm text-gray-500 hover:underline">
          ← Back to Swap Chains
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Swap Chain Details</h1>
        <p className="mt-2 text-gray-500">Review the details of this swap chain and confirm your participation.</p>
      </div>

      <div className="border rounded p-6 mb-8 shadow-sm bg-white">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">🔄 How This Swap Chain Works</h2>
        <p>This is a chain of {swapChain.length} book swaps where each person gets the book they want from someone else in the chain:</p>

        <div className="flex flex-col gap-4 mt-4">
          {swapChain.map((request, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">{index + 1}</div>
              <div className="flex-grow border p-4 rounded">
                <div className="flex gap-4">
                  <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">📖</div>
                  <div className="flex-grow">
                    <p className="font-medium">{request.user}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-500">
                      <div>
                        <p>Offers:</p>
                        <span className="inline-block mt-1 border rounded px-2 py-1 text-xs">{request.bookOffered}</span>
                      </div>
                      <div>
                        <p>Wants:</p>
                        <span className="inline-block mt-1 border rounded px-2 py-1 text-xs">{request.bookWanted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="mx-2 text-gray-400">→</span>
              {index === swapChain.length - 1 && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">1</div>
              )}
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="font-medium">Swap Chain Rules:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 mt-2">
            <li>Each person sends their book to the next person</li>
            <li>The last person sends their book to the first</li>
            <li>Everyone gets what they wanted</li>
            <li>All must confirm before swap begins</li>
            <li>Then, delivery info is shared</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {swapChain.map((request, index) => (
          <div key={index} className="border rounded shadow p-4 bg-white">
            <h3 className="text-lg font-semibold mb-1">Book {index + 1}: {request.bookOffered}</h3>
            <p className="text-sm text-gray-500 mb-2">Offered by {request.user}</p>
            <div className="mb-4">
              <img src={request.imageUrl} alt={request.bookOffered} className="h-48 mx-auto rounded border" />
            </div>
            <span className="inline-block mb-2 px-2 py-1 border rounded text-xs">{request.condition}</span>
            <p className="text-sm text-gray-600">{request.description}</p>
          </div>
        ))}
      </div>

      {participationStatus === "pending" && (
        <div className="border mt-8 p-6 rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Confirm Your Participation</h2>
          <p className="text-sm text-gray-600 mb-4">
            By confirming, you agree to send your book to the next person in the chain.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRejectParticipation}
              className="w-full border text-red-600 border-red-500 px-4 py-2 rounded hover:bg-red-50"
            >
              ✖ Decline
            </button>
            <button
              onClick={handleConfirmParticipation}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ✔ Confirm Participation
            </button>
          </div>
        </div>
      )}

      {participationStatus === "confirmed" && (
        <div className="border mt-8 p-6 rounded shadow bg-green-100 border-green-300">
          <h2 className="text-lg font-semibold text-green-800">Participation Confirmed!</h2>
          <p className="text-green-700 mt-2">
            You have confirmed your participation. You’ll be notified when all users confirm.
          </p>
        </div>
      )}

      {participationStatus === "rejected" && (
        <div className="border mt-8 p-6 rounded shadow bg-red-100 border-red-300">
          <h2 className="text-lg font-semibold text-red-800">Participation Declined</h2>
          <p className="text-red-700 mt-2">You declined this swap chain. Browse other swap chains below.</p>
          <Link
            to="/swap-chains"
            className="inline-block mt-4 border px-4 py-2 text-sm rounded hover:bg-red-200 text-red-700"
          >
            Browse Other Swap Chains
          </Link>
        </div>
      )}

      {showDeliveryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
            <p className="text-sm text-gray-500 mb-4">
              Please provide your delivery information to complete your participation.
            </p>
            <DeliveryForm onSubmit={handleDeliverySubmit} onCancel={() => setShowDeliveryForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
