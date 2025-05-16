import React, { useState } from "react";
import { ArrowRight, BookOpen, RefreshCw } from "lucide-react";

export default function SwapChainVisualization({ chain, onParticipate }) {
  const [expanded, setExpanded] = useState(false);

  if (!chain || chain.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg border shadow-lg">
      <div className="pb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-orange-600" />
          <h3 className="text-xl font-semibold">Swap Chain ({chain.length} participants)</h3>
        </div>
        <p className="text-sm text-blue-600">
          This is a chain of book swaps where each person gets the book they want from someone else in the chain.
        </p>
      </div>

      <div className="space-y-4">
        {chain.map((request, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              {index + 1}
            </div>
            <div className="flex-grow p-2 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-14 bg-blue-100 rounded flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{request.user}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Offers:</span>
                    <span className="text-sm text-blue-600">{request.bookOffered}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Wants:</span>
                    <span className="text-sm text-orange-600">{request.bookWanted}</span>
                  </div>
                </div>
              </div>
            </div>
            {index < chain.length - 1 && (
              <ArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400 mx-2" />
            )}
            {index === chain.length - 1 && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                1
              </div>
            )}
          </div>
        ))}
      </div>

      {expanded && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-blue-600">How this works:</h4>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
            <li>Each person in the chain sends their book to the next person</li>
            <li>The last person sends their book to the first person</li>
            <li>Everyone gets the book they wanted</li>
            <li>All participants must confirm before the swap begins</li>
          </ol>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-orange-600 hover:text-orange-800"
        >
          {expanded ? "Show Less" : "Learn More"}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onParticipate(chain)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Participate
          </button>
          <button
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
            onClick={() => alert("View details - Implement this functionality")}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
