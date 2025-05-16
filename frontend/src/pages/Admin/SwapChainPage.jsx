import React, { useState, useEffect } from "react";
import { findSwapChains, enrichSwapChains } from "../lib/swap-matching";
import SwapChainVisualization from "./SwapChainVisualization";

export default function SwapChainsPage() {
  const [swapChains, setSwapChains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSwapRequests = async () => {
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
        },
        {
          id: "SR-1237",
          userId: "U-1004",
          user: "Alice Williams",
          bookOffered: "Python Programming",
          bookWanted: "Ruby Programming",
          condition: "Acceptable",
          status: "approved",
          date: "2023-04-07",
        },
        {
          id: "SR-1238",
          userId: "U-1005",
          user: "Charlie Brown",
          bookOffered: "Ruby Programming",
          bookWanted: "Python Programming",
          condition: "Good",
          status: "approved",
          date: "2023-04-06",
        },
      ];

      const chains = findSwapChains(swapRequests);
      const enrichedChains = enrichSwapChains(chains, swapRequests);

      setSwapChains(enrichedChains);
      setLoading(false);
    };

    fetchSwapRequests();
  }, []);

  const handleParticipate = (chain) => {
    alert(`You are about to participate in a swap chain with ${chain.length} other users.`);
  };

  return (
    <div className="container max-w-4xl py-12 mx-auto px-4">
      <div className="mb-8 flex items-center gap-2">
        <a href="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800">
          ← Back to Home
        </a>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Swap Chains</h1>
        <p className="mt-2 text-gray-600">
          Discover swap chains where multiple users exchange books to help everyone get what they want.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Finding potential swap chains...</p>
        </div>
      ) : swapChains.length > 0 ? (
        <div className="space-y-8">
          {swapChains.map((chain, index) => (
            <SwapChainVisualization key={index} chain={chain} onParticipate={handleParticipate} />
          ))}
        </div>
      ) : (
        <div className="border rounded p-6 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-2 font-semibold text-lg">
            🔄 No Swap Chains Found
          </div>
          <p className="text-gray-600 mb-4">
            We couldn't find any potential swap chains at the moment. Check back later or add your own swap request.
          </p>
          <a
            href="/request-swap"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create a Swap Request
          </a>
        </div>
      )}
    </div>
  );
}
