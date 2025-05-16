import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Check, RefreshCw, X } from "lucide-react";
import DeliveryForm from "./DeliveryForm"; // Your custom form component

// Dummy logic placeholders
const findSwapChains = (requests) => [requests]; // returns chains
const enrichSwapChains = (chains, all) => chains; // returns enriched data

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
          user: "John Doe",
          bookOffered: "C++ Programming",
          bookWanted: "Java Programming",
          condition: "Very Good",
          status: "approved",
          date: "2023-04-10",
          description: "Third edition, includes all code examples and exercises.",
          imageUrl: "/placeholder.svg",
        },
        {
          id: "SR-1235",
          user: "Jane Smith",
          bookOffered: "JavaScript Programming",
          bookWanted: "C++ Programming",
          condition: "Good",
          status: "approved",
          date: "2023-04-09",
          description: "Modern JavaScript guide with ES6+ features covered in detail.",
          imageUrl: "/placeholder.svg",
        },
        {
          id: "SR-1236",
          user: "Bob Johnson",
          bookOffered: "Java Programming",
          bookWanted: "JavaScript Programming",
          condition: "Like New",
          status: "approved",
          date: "2023-04-08",
          description: "Comprehensive Java guide with practical examples.",
          imageUrl: "/placeholder.svg",
        },
      ];

      const chains = findSwapChains(swapRequests);
      const enrichedChains = enrichSwapChains(chains, swapRequests);
      const targetChain = enrichedChains.find((chain) =>
        chain.some((request) => request.id === id)
      );

      setSwapChain(targetChain || []);
      setLoading(false);
    };

    fetchSwapChain();
  }, [id]);

  const handleConfirmParticipation = () => setShowDeliveryForm(true);

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
    return <div className="py-12 text-center">Loading swap chain details...</div>;
  }

  if (!swapChain || swapChain.length === 0) {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <Link to="/swap-chains" className="text-blue-500 hover:underline flex items-center mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Swap Chains
        </Link>
        <div className="border p-6 rounded shadow bg-white">
          <h2 className="text-xl font-bold text-orange-500 mb-2">Swap Chain Not Found</h2>
          <p className="mb-4">The swap chain you're looking for doesn't exist or has been completed.</p>
          <Link to="/swap-chains" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Available Swap Chains
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Link to="/swap-chains" className="text-blue-500 hover:underline flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Swap Chains
      </Link>

      <h1 className="text-3xl font-bold text-orange-600 mb-4">Swap Chain Details</h1>
      <p className="text-gray-600 mb-8">Review the details and confirm your participation.</p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mb-8">
        <h2 className="text-lg font-semibold flex items-center mb-4 text-blue-600">
          <RefreshCw className="h-5 w-5 mr-2" />
          How This Swap Chain Works
        </h2>
        <p>This is a chain of {swapChain.length} book swaps:</p>

        <div className="mt-6 flex flex-col gap-4">
          {swapChain.map((request, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-orange-200 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="border rounded p-4 w-full shadow-sm bg-white">
                <p className="font-medium text-gray-800">{request.user}</p>
                <div className="flex justify-between mt-2 text-sm">
                  <div>
                    <p className="text-gray-500">Offers:</p>
                    <p className="text-orange-600">{request.bookOffered}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Wants:</p>
                    <p className="text-blue-600">{request.bookWanted}</p>
                  </div>
                </div>
              </div>
              {index < swapChain.length - 1 && <ArrowRight className="text-gray-400" />}
              {index === swapChain.length - 1 && (
                <>
                  <ArrowRight className="text-gray-400" />
                  <div className="bg-orange-200 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-sm text-gray-600">
          <ul className="list-disc pl-5 space-y-1">
            <li>Each person sends their book to the next</li>
            <li>The last person sends their book to the first</li>
            <li>All participants get what they wanted</li>
            <li>Everyone must confirm before starting</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {swapChain.map((request, index) => (
          <div key={index} className="border rounded p-4 shadow bg-white">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">{request.bookOffered}</h3>
            <p className="text-sm text-gray-500 mb-1">Offered by: {request.user}</p>
            <img
              src={request.imageUrl}
              alt={request.bookOffered}
              className="w-24 h-36 object-cover border rounded mb-2"
            />
            <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 text-xs rounded mb-2">
              {request.condition}
            </span>
            <p className="text-sm text-gray-600">{request.description}</p>
          </div>
        ))}
      </div>

      {/* Participation Section */}
      {participationStatus === "pending" && (
        <div className="mt-10 p-6 border rounded shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">Confirm Your Participation</h3>
          <p className="text-sm text-gray-600 mb-4">
            All participants must confirm before the swap begins. You can cancel before that.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRejectParticipation}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50 w-full"
            >
              <X size={16} /> Decline
            </button>
            <button
              onClick={handleConfirmParticipation}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              <Check size={16} /> Confirm
            </button>
          </div>
        </div>
      )}

      {participationStatus === "confirmed" && (
        <div className="mt-10 p-6 border rounded shadow bg-green-50 text-green-800">
          <h3 className="text-lg font-semibold mb-2">Participation Confirmed!</h3>
          <p>You will be notified when all participants confirm.</p>
        </div>
      )}

      {participationStatus === "rejected" && (
        <div className="mt-10 p-6 border rounded shadow bg-red-50 text-red-800">
          <h3 className="text-lg font-semibold mb-2">Participation Declined</h3>
          <Link to="/swap-chains" className="text-blue-500 underline">
            Browse Other Swap Chains
          </Link>
        </div>
      )}

      {showDeliveryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md shadow">
            <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter delivery details to confirm your swap participation.
            </p>
            <DeliveryForm onSubmit={handleDeliverySubmit} onCancel={() => setShowDeliveryForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
