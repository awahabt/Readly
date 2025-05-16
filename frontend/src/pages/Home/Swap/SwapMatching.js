import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

function buildSwapGraph(swapRequests) {
  const graph = {};
  swapRequests.forEach((request) => {
    graph[request.id] = {
      edges: [],
      request: request,
    };
  });
  swapRequests.forEach((requestA) => {
    swapRequests.forEach((requestB) => {
      if (requestA.id !== requestB.id) {
        const aOffered = requestA.bookOffered.toLowerCase();
        const bWanted = requestB.bookWanted.toLowerCase();
        if (aOffered.includes(bWanted) || bWanted.includes(aOffered)) {
          graph[requestA.id].edges.push(requestB.id);
        }
      }
    });
  });
  return graph;
}

function findChainsFromNode(node, visited, currentPath, chains, graph, maxChainLength) {
  visited.add(node);
  currentPath.push(node);
  if (currentPath.length > 1 && graph[node].edges.includes(currentPath[0])) {
    chains.push([...currentPath]);
  }
  if (currentPath.length < maxChainLength) {
    for (const neighbor of graph[node].edges) {
      if (!visited.has(neighbor)) {
        findChainsFromNode(neighbor, new Set(visited), [...currentPath], chains, graph, maxChainLength);
      }
    }
  }
}

function findSwapChains(swapRequests, maxChainLength = 5) {
  const graph = buildSwapGraph(swapRequests);
  const chains = [];
  swapRequests.forEach((request) => {
    const startNode = request.id;
    const visited = new Set();
    const currentPath = [];
    findChainsFromNode(startNode, visited, currentPath, chains, graph, maxChainLength);
  });
  return chains.sort((a, b) => a.length - b.length);
}

function enrichSwapChains(chains, swapRequests) {
  const requestMap = swapRequests.reduce((map, request) => {
    map[request.id] = request;
    return map;
  }, {});
  return chains.map((chain) => chain.map((requestId) => requestMap[requestId]));
}

export default function SwapChainsPage() {
  const [swapRequests, setSwapRequests] = useState([
    { id: '1', userId: 'u1', bookOffered: 'Book A', bookWanted: 'Book B' },
    { id: '2', userId: 'u2', bookOffered: 'Book B', bookWanted: 'Book C' },
    { id: '3', userId: 'u3', bookOffered: 'Book C', bookWanted: 'Book A' },
  ]);

  const [chains, setChains] = useState([]);

  const handleFindChains = () => {
    const foundChains = findSwapChains(swapRequests);
    const enriched = enrichSwapChains(foundChains, swapRequests);
    setChains(enriched);
  };

  return (
    <div className="min-h-screen p-4 bg-white text-blue-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Swap Chains</h1>
        <button
          onClick={handleFindChains}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <RefreshCcw size={18} /> Find Swap Chains
        </button>

        <div className="mt-6 space-y-4">
          {chains.length === 0 ? (
            <p className="text-gray-500">No swap chains found. Try finding some!</p>
          ) : (
            chains.map((chain, idx) => (
              <div
                key={idx}
                className="p-4 border rounded shadow bg-orange-100 text-sm text-blue-900 overflow-x-auto"
              >
                <strong className="text-orange-600">Chain {idx + 1}:</strong>
                <ul className="list-disc pl-6">
                  {chain.map((req, index) => (
                    <li key={index}>
                      User <strong>{req.userId}</strong>: <span className="text-blue-800">{req.bookOffered}</span> → <span className="text-blue-800">{req.bookWanted}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
