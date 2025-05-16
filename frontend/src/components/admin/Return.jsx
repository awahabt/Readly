import React, { useEffect, useState } from 'react';

const AdminReturns = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Mock data for visualization
    const mockReturns = [
      {
        bookName: "The Alchemist",
        pickupAddress: "123 Street, Lahore",
        contactNumber: "03001234567"
      },
      {
        bookName: "Sapiens",
        pickupAddress: "456 Avenue, Islamabad",
        contactNumber: "03111234567"
      },
      {
        bookName: "Atomic Habits",
        pickupAddress: "789 Road, Karachi",
        contactNumber: "03221234567"
      }
    ];
    setReturnRequests(mockReturns);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Book Return Requests</h1>

      {returnRequests.length === 0 ? (
        <p className="text-gray-600">No return requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Book Name</th>
                <th className="px-4 py-3 text-left">Pickup Address</th>
                <th className="px-4 py-3 text-left">Contact Number</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {returnRequests.map((req, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{req.bookName}</td>
                  <td className="px-4 py-3">{req.pickupAddress}</td>
                  <td className="px-4 py-3">{req.contactNumber}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Return Request Details</h2>
            <p><strong>Book Name:</strong> {selectedRequest.bookName}</p>
            <p><strong>Pickup Address:</strong> {selectedRequest.pickupAddress}</p>
            <p><strong>Contact Number:</strong> {selectedRequest.contactNumber}</p>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReturns;
