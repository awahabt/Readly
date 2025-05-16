import { useState, useEffect } from "react";
import { Check, ChevronDown, Filter, Search, X } from "lucide-react";

export default function AdminSwapRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [swapRequests, setSwapRequests] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchSwapRequests = async () => {
    setLoading(true);
    try {
          const token = localStorage.getItem("token");  
      const response = await fetch("http://localhost:8000/api/swap-requests",{
         headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch swap requests");
      }
      
      const result = await response.json();
      setSwapRequests(result.data || []);
    } catch (error) {
      console.error("Error fetching swap requests:", error);
      setSwapRequests([]);
    } finally {
      setLoading(false);
    }
  };

  fetchSwapRequests();
}, []);


  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  const approveRequest = (id) => {
    const updatedRequests = swapRequests.map(request =>
      request.id === id ? { ...request, status: "approved" } : request
    );
    setSwapRequests(updatedRequests);
    setShowDetailsDialog(false);
  };

  const rejectRequest = (id) => {
    const updatedRequests = swapRequests.map(request =>
      request.id === id ? { ...request, status: "rejected" } : request
    );
    setSwapRequests(updatedRequests);
    setShowDetailsDialog(false);
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "pending":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case "approved":
        return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
      case "rejected":
        return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
      default:
        return <span className={base}>{status}</span>;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-blue-800">Swap Requests</h2>
        <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search requests..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select className="border rounded px-4 py-2 text-sm">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-auto rounded shadow border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Book Offered</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Book Wanted</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Condition</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Date</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-sm text-gray-500">
                  Loading swap requests...
                </td>
              </tr>
            ) : swapRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-sm text-gray-500">
                  No swap requests found.
                </td>
              </tr>
            ) : (
              swapRequests.map((request) => (
                <tr key={request.id} className="hover:bg-orange-50">
                  <td className="px-4 py-2 text-sm">{request.id}</td>
                  <td className="px-4 py-2 text-sm">{request.user}</td>
                  <td className="px-4 py-2 text-sm">{request.bookHave?.title}</td>
                  <td className="px-4 py-2 text-sm">{request.bookWant?.title}</td>
                  <td className="px-4 py-2 text-sm">{request.bookHave?.condition}</td>
                  <td className="px-4 py-2 text-sm">{getStatusBadge(request.status)}</td>
                  <td className="px-4 py-2 text-sm">{request.date}</td>
                  <td className="px-4 py-2 text-sm text-right">
                    <button
                      className="text-blue-600 hover:text-orange-600"
                      onClick={() => viewRequestDetails(request)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDetailsDialog && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl mx-4 md:mx-auto p-6 rounded shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-blue-800">Swap Request Details</h3>
              <button onClick={() => setShowDetailsDialog(false)} className="text-gray-600 hover:text-red-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Request ID</h4>
                <p>{selectedRequest.id}</p>
              </div>
              <div>
                <h4 className="font-medium">Status</h4>
                {getStatusBadge(selectedRequest.status)}
              </div>
              <div>
                <h4 className="font-medium">User</h4>
                <p>{selectedRequest.user}</p>
              </div>
              <div>
                <h4 className="font-medium">Date</h4>
                <p>{selectedRequest.date}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-orange-600 font-semibold">Book Offered</h4>
              <div className="border rounded p-4 bg-orange-50">
                <h5 className="font-semibold">{selectedRequest.bookHave?.title}</h5>
                <p>Condition: {selectedRequest.bookHave?.condition}</p>
                <p>Author: {selectedRequest.bookHave?.author}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-orange-600 font-semibold">Book Wanted</h4>
              <div className="border rounded p-4 bg-orange-50">
                <h5 className="font-semibold">{selectedRequest.bookWant?.title}</h5>
                <p>Minimum Condition: {selectedRequest.bookWant?.condition}</p>
                <p>Author: {selectedRequest.bookWant?.author}</p>
              </div>
            </div>

            <div>
              <h4 className="text-orange-600 font-semibold">Delivery Method</h4>
              <p className="text-sm capitalize">{selectedRequest.delivery?.method}</p>
              {selectedRequest.delivery?.method === "delivery" && (
                <p className="text-sm">Address: {selectedRequest.delivery.address}</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={() => rejectRequest(selectedRequest.id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </button>
                  <button
                    onClick={() => approveRequest(selectedRequest.id)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetailsDialog(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
