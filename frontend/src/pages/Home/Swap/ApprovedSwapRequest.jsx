// src/pages/ApprovedSwapRequests.jsx

import React, { useEffect, useState } from 'react';

const ApprovedSwapRequests = () => {
  const [approvedSwaps, setApprovedSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching approved swap requests from API
  useEffect(() => {
    // Replace this with actual API call
    const fetchApprovedSwaps = async () => {
      try {
        // Example simulated response
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                user: 'Ali',
                haveBook: {
                  title: 'Atomic Habits',
                  image: '/books/atomic-habits.jpg',
                },
                wantBook: {
                  title: 'Deep Work',
                  image: '/books/deep-work.jpg',
                },
                swapDate: '2025-04-20',
                deliveryMethod: 'Pickup from public place',
              },
              {
                id: 2,
                user: 'Sara',
                haveBook: {
                  title: 'The Alchemist',
                  image: '/books/alchemist.jpg',
                },
                wantBook: {
                  title: 'Ikigai',
                  image: '/books/ikigai.jpg',
                },
                swapDate: '2025-04-21',
                deliveryMethod: 'Pickup from public place',
              },
            ]);
          }, 1000)
        );
        setApprovedSwaps(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch swap requests:', error);
        setLoading(false);
      }
    };

    fetchApprovedSwaps();
  }, []);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Approved Swap Requests</h2>

      {loading ? (
        <div className="text-center text-orange-500 font-medium">Loading swap requests...</div>
      ) : approvedSwaps.length === 0 ? (
        <div className="text-center text-gray-500 font-medium">No approved swap requests yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedSwaps.map((swap) => (
            <div
              key={swap.id}
              className="bg-white rounded-lg shadow-md p-4 border border-blue-100"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                  <p className="text-lg font-semibold text-orange-500 mb-1">
                    {swap.user} wants to swap:
                  </p>
                  <p className="text-gray-700">Swap Date: {swap.swapDate}</p>
                  <p className="text-gray-700">Delivery: {swap.deliveryMethod}</p>
                </div>
              </div>

              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <img
                    src={swap.haveBook.image}
                    alt={swap.haveBook.title}
                    className="w-24 h-36 object-cover mx-auto rounded-md shadow"
                  />
                  <p className="mt-2 text-sm font-medium text-blue-600">{swap.haveBook.title}</p>
                  <p className="text-xs text-gray-500">Book You Have</p>
                </div>

                <div className="text-center">
                  <img
                    src={swap.wantBook.image}
                    alt={swap.wantBook.title}
                    className="w-24 h-36 object-cover mx-auto rounded-md shadow"
                  />
                  <p className="mt-2 text-sm font-medium text-blue-600">{swap.wantBook.title}</p>
                  <p className="text-xs text-gray-500">Book You Want</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedSwapRequests;
