import React from "react";

const SwapChainVisualization = ({ chain, onParticipate }) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Swap Chain (Length: {chain.length})</h2>

      <div className="flex flex-col gap-4 mb-4">
        {chain.map((swap, index) => (
          <div
            key={swap.id}
            className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="font-medium">
              <span className="text-gray-600">User:</span> {swap.user}
            </p>
            <p>
              <span className="text-gray-600">Offers:</span>{" "}
              <span className="text-blue-600 font-medium">{swap.bookOffered}</span>
            </p>
            <p>
              <span className="text-gray-600">Wants:</span>{" "}
              <span className="text-green-600 font-medium">{swap.bookWanted}</span>
            </p>
            <p className="text-sm text-gray-500">Condition: {swap.condition}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onParticipate(chain)}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Participate in This Chain
      </button>
    </div>
  );
};

export default SwapChainVisualization;
