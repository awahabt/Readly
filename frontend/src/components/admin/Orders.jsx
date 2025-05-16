import React, { useState } from "react";

const AdminOrders = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const orders = [
    {
      id: "O-5001",
      swapId: "SW-1234",
      sender: "John Doe",
      recipient: "Jane Smith",
      book: "The Great Gatsby",
      status: "shipped",
      trackingNumber: "TRK123456789",
      shippedDate: "2023-04-05",
      estimatedDelivery: "2023-04-10",
      deliveryMethod: "delivery",
    },
    {
      id: "O-5002",
      swapId: "SW-1235",
      sender: "Jane Smith",
      recipient: "John Doe",
      book: "To Kill a Mockingbird",
      status: "delivered",
      trackingNumber: "TRK987654321",
      shippedDate: "2023-04-03",
      estimatedDelivery: "2023-04-08",
      deliveryMethod: "pickup",
    },
    {
      id: "O-5003",
      swapId: "SW-1236",
      sender: "Bob Johnson",
      recipient: "Alice Williams",
      book: "1984",
      status: "processing",
      trackingNumber: "",
      shippedDate: "",
      estimatedDelivery: "",
      deliveryMethod: "delivery",
    },
    {
      id: "O-5004",
      swapId: "SW-1237",
      sender: "Alice Williams",
      recipient: "Bob Johnson",
      book: "Animal Farm",
      status: "shipped",
      trackingNumber: "TRK456789123",
      shippedDate: "2023-04-06",
      estimatedDelivery: "2023-04-11",
      deliveryMethod: "pickup",
    },
    {
      id: "O-5005",
      swapId: "SW-1238",
      sender: "Charlie Brown",
      recipient: "David Wilson",
      book: "Pride and Prejudice",
      status: "pending",
      trackingNumber: "",
      shippedDate: "",
      estimatedDelivery: "",
      deliveryMethod: "delivery",
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      (filter === "all" || order.status === filter) &&
      (deliveryFilter === "all" || order.deliveryMethod === deliveryFilter) &&
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const handleAction = (action, id) => {
    alert(`${action} order ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <input
          type="text"
          placeholder="Search orders..."
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          value={deliveryFilter}
          onChange={(e) => setDeliveryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Delivery Methods</option>
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup from public place</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Swap ID</th>
              <th className="px-4 py-2 text-left">Sender</th>
              <th className="px-4 py-2 text-left">Recipient</th>
              <th className="px-4 py-2 text-left">Book</th>
              <th className="px-4 py-2 text-left">Delivery Method</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Shipped Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.swapId}</td>
                <td className="px-4 py-2">{order.sender}</td>
                <td className="px-4 py-2">{order.recipient}</td>
                <td className="px-4 py-2">{order.book}</td>
                <td className="px-4 py-2 capitalize">
                  {order.deliveryMethod === "pickup"
                    ? "Pickup from public place"
                    : "Delivery"}
                </td>
                <td className={`px-4 py-2`}>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2">{order.shippedDate || "—"}</td>
                <td className="px-4 py-2 text-right">
                  <div className="space-x-1">
                    <button
                      onClick={() => handleAction("View details for", order.id)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleAction("Update tracking info for", order.id)}
                      className="text-orange-600 hover:underline"
                    >
                      Track
                    </button>
                    {order.status === "processing" && (
                      <button
                        onClick={() => handleAction("Mark as shipped", order.id)}
                        className="text-purple-600 hover:underline"
                      >
                        Ship
                      </button>
                    )}
                    {order.status === "shipped" && (
                      <button
                        onClick={() => handleAction("Mark as delivered", order.id)}
                        className="text-green-600 hover:underline"
                      >
                        Deliver
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders
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
};

export default AdminOrders;
