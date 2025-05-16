// src/pages/ApprovedSwapChains.jsx

import React, { useEffect, useState } from 'react';

const ApprovedSwapChains = () => {
  const [swapChains, setSwapChains] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API fetch (replace with actual API call)
  useEffect(() => {
    const fetchApprovedSwapChains = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                chainTitle: 'Chain Swap #001',
                participants: [
                  {
                    user: 'Ali',
                    haveBook: {
                      title: 'Rich Dad Poor Dad',
                      image: '/books/rich-dad.jpg',
                    },
                    wantBook: {
                      title: 'The 4-Hour Workweek',
                      image: '/books/four-hour.jpg',
                    },
                  },
                  {
                    user: 'Sara',
                    haveBook: {
                      title: 'The 4-Hour Workweek',
                      image: '/books/four-hour.jpg',
                    },
                    wantBook: {
                      title: 'The Alchemist',
                      image: '/books/alchemist.jpg',
                    },
                  },
                  {
                    user: 'Usman',
                    haveBook: {
                      title: 'The Alchemist',
                      image: '/books/alchemist.jpg',
                    },
                    wantBook: {
                      title: 'Rich Dad Poor Dad',
                      image: '/books/rich-dad.jpg',
                    },
                  },
                ],
              },
              // Add more chains as needed
            ]);
          }, 1000)
        );

        setSwapChains(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching swap chains:', error);
        setLoading(false);
      }
    };

    fetchApprovedSwapChains();
  }, []);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Approved Swap Chains</h2>

      {loading ? (
        <div className="text-center text-orange-500 font-medium">Loading swap chains...</div>
      ) : swapChains.length === 0 ? (
        <div className="text-center text-gray-500 font-medium">No approved swap chains yet.</div>
      ) : (
        <div className="space-y-8">
          {swapChains.map((chain) => (
            <div
              key={chain.id}
              className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            >
              <h3 className="text-xl font-bold text-orange-500 mb-4">{chain.chainTitle}</h3>

              <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
                {chain.participants.map((p, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-orange-100 w-full md:w-[30%]"
                  >
                    <p className="text-blue-600 font-semibold text-center mb-2">{p.user}</p>

                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <img
                          src={p.haveBook.image}
                          alt={p.haveBook.title}
                          className="w-20 h-32 object-cover rounded shadow mx-auto"
                        />
                        <p className="text-sm text-blue-600 mt-2 font-medium">{p.haveBook.title}</p>
                        <p className="text-xs text-gray-500">Has</p>
                      </div>

                      <div className="text-xl text-orange-500 font-bold mx-4">➡️</div>

                      <div className="text-center">
                        <img
                          src={p.wantBook.image}
                          alt={p.wantBook.title}
                          className="w-20 h-32 object-cover rounded shadow mx-auto"
                        />
                        <p className="text-sm text-blue-600 mt-2 font-medium">{p.wantBook.title}</p>
                        <p className="text-xs text-gray-500">Wants</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedSwapChains;
