import React, { useState } from "react";

export default function AdminReservations() {
  // Mock data for book reservations
  const reservations = [
    {
      id: "R-3001",
      user: "John Doe",
      book: "The Great Gatsby",
      owner: "Jane Smith",
      status: "pending",
      requestDate: "2023-04-08",
      expiryDate: "2023-04-15",
    },
    {
      id: "R-3002",
      user: "Jane Smith",
      book: "1984",
      owner: "Bob Johnson",
      status: "approved",
      requestDate: "2023-04-07",
      expiryDate: "2023-04-14",
    },
    {
      id: "R-3003",
      user: "Bob Johnson",
      book: "Pride and Prejudice",
      owner: "Alice Williams",
      status: "rejected",
      requestDate: "2023-04-06",
      expiryDate: "2023-04-13",
    },
    {
      id: "R-3004",
      user: "Alice Williams",
      book: "The Hobbit",
      owner: "Charlie Brown",
      status: "expired",
      requestDate: "2023-04-01",
      expiryDate: "2023-04-08",
    },
    {
      id: "R-3005",
      user: "Charlie Brown",
      book: "Brave New World",
      owner: "David Wilson",
      status: "pending",
      requestDate: "2023-04-09",
      expiryDate: "2023-04-16",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const viewReservationDetails = (reservationId) => {
    alert(`View details for reservation ${reservationId}`);
  };

  const approveReservation = (reservationId) => {
    alert(`Approve reservation ${reservationId}`);
  };

  const rejectReservation = (reservationId) => {
    alert(`Reject reservation ${reservationId}`);
  };

  const extendReservation = (reservationId) => {
    alert(`Extend reservation ${reservationId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "approved":
        return <span className="badge badge-success">Approved</span>;
      case "rejected":
        return <span className="badge badge-danger">Rejected</span>;
      case "expired":
        return <span className="badge badge-gray">Expired</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      (filter === "all" || reservation.status === filter) &&
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Book Reservations</h2>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Search reservations..."
          className="border px-4 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded mt-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Book</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Request Date</th>
              <th className="px-4 py-2 text-left">Expiry Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="border-t">
                <td className="px-4 py-2">{reservation.id}</td>
                <td className="px-4 py-2">{reservation.user}</td>
                <td className="px-4 py-2">{reservation.book}</td>
                <td className="px-4 py-2">{reservation.owner}</td>
                <td className="px-4 py-2">{getStatusBadge(reservation.status)}</td>
                <td className="px-4 py-2">{reservation.requestDate}</td>
                <td className="px-4 py-2">{reservation.expiryDate}</td>
                <td className="px-4 py-2 text-right">
                  <div className="space-x-1">
                    <button
                      onClick={() => viewReservationDetails(reservation.id)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                    {reservation.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveReservation(reservation.id)}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectReservation(reservation.id)}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {reservation.status === "approved" && (
                      <button
                        onClick={() => extendReservation(reservation.id)}
                        className="text-orange-600 hover:underline"
                      >
                        Extend Reservation
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-6">
        <span>
          Showing <strong>{filteredReservations.length}</strong> of <strong>{reservations.length}</strong> reservations
        </span>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded text-gray-600 bg-gray-100" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border rounded text-gray-600 bg-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
