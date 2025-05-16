import React, { useEffect, useState } from "react";
import AdminOrders from "../../components/admin/Orders";
import AdminReservations from "../../components/admin/Reservations";
import AdminSwapRequests from "../../components/admin/SwapRequest";
import AdminUsers from "../../components/admin/Users";
import AdminReturns from "../../components/admin/Return";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewStats, setOverviewStats] = useState([
    { label: "Total Users", count: 0, icon: "👥" },
    { label: "Swap Requests", count: 0, icon: "🔁" },
    { label: "Orders", count: 0, icon: "📦" },
    { label: "Reservations", count: 0, icon: "⏰" },
    { label: "Return", count: 0, icon: "↩" },
  ]);
  const [loadingStats, setLoadingStats] = useState(true);

  const MenuButton = ({ icon, label, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 text-left w-full ${
        activeTab === tab
          ? "bg-blue-100 text-blue-800 font-semibold"
          : "hover:bg-gray-100"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");  
        const [usersRes, swapRes, reservationRes, orderRes] = await Promise.allSettled([
          fetch("http://localhost:8000/api/user"),
          fetch("http://localhost:8000/api/swap-requests",{   headers: {
          "Authorization": `Bearer ${token}`
        },}),
          fetch("http://localhost:8000/api/reservation",{   headers: {
          "Authorization": `Bearer ${token}`
        },}),
          fetch("http://localhost:8000/api/order",{   headers: {
          "Authorization": `Bearer ${token}`
        },}),
        ]);

        const results = await Promise.allSettled([
          usersRes.status === "fulfilled" ? usersRes.value.json() : null,
          swapRes.status === "fulfilled" ? swapRes.value.json() : null,
          reservationRes.status === "fulfilled" ? reservationRes.value.json() : null,
          orderRes.status === "fulfilled" ? orderRes.value.json() : null,
        ]);

        const [usersData, swapData, reservationData, orderData] = results.map(
          (r) => (r.status === "fulfilled" && r.value?.data?.length) || 0
        );

        setOverviewStats([
          { label: "Total Users", count: usersData, icon: "👥" },
          { label: "Swap Requests", count: swapData, icon: "🔁" },
          { label: "Orders", count: orderData, icon: "📦" },
          { label: "Reservations", count: reservationData, icon: "⏰" },
          { label: "Return", count: 0, icon: "↩" }, // Update if Return API is added
        ]);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white shadow-sm">
        <div className="p-4 border-b font-bold text-xl flex items-center gap-2">
          📚Admin
        </div>
        <div className="p-2">
          <MenuButton icon="🏠" label="Overview" tab="overview" />
          <MenuButton icon="🔁" label="Swap Requests" tab="swap-requests" />
          <MenuButton icon="👥" label="Users" tab="users" />
          <MenuButton icon="📦" label="Orders" tab="orders" />
          <MenuButton icon="⏰" label="Reservations" tab="reservations" />
          <MenuButton icon="↩" label="Return" tab="return" />
        </div>
        <div className="mt-auto p-2 border-t">
          <a href="/logout" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            🚪 Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex gap-2 items-center">
            <a
              href="/super-admin"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🛡️ Super Admin
            </a>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">Dashboard Overview</h2>
              {loadingStats ? (
                <p className="text-gray-500">Loading stats...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {overviewStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="text-4xl">{stat.icon}</div>
                      <h3 className="text-lg font-semibold text-blue-800 mt-2">{stat.label}</h3>
                      <p className="text-2xl font-bold text-orange-600">{stat.count}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "swap-requests" && <AdminSwapRequests />}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "reservations" && <AdminReservations />}
          {activeTab === "return" && <AdminReturns />}
        </main>
      </div>
    </div>
  );
}
