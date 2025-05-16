import { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/api/auth", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUsers(result.data || []);
        } else {
          console.error("Failed to fetch users:", result.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const viewUserDetails = (userId) => alert(`Viewing profile for user ${userId}`);
  const editUser = (userId) => alert(`Editing username/password for ${userId}`);
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    alert(`Deleted user ${userId}`);
  };
  const suspendUser = (userId) =>
    setUsers(users.map(user => user.id === userId ? { ...user, status: "suspended" } : user));
  const activateUser = (userId) =>
    setUsers(users.map(user => user.id === userId ? { ...user, status: "active" } : user));
  const addUser = () => alert("Opening form to add user");

  const getStatusBadge = (status) => {
    const color =
      status === "active" ? "bg-blue-200 text-blue-800" :
        status === "inactive" ? "bg-gray-200 text-gray-700" :
          "bg-orange-200 text-orange-800";
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>;
  };

  const getRoleBadge = (role) => {
    const color = role === "admin" ? "bg-orange-500 text-white" : "bg-blue-500 text-white";
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{role}</span>;
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-orange-600">Manage Users</h2>
        <button onClick={addUser} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
          <UserPlus className="mr-2 h-5 w-5" />
          Add User
        </button>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 py-2 w-full border border-gray-300 rounded-md focus:outline-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-orange-100 text-orange-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Swaps</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center px-4 py-6 text-gray-500">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center px-4 py-6 text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{getStatusBadge(user.status)}</td>
                  <td className="px-4 py-2">{getRoleBadge(user.role)}</td>
                  <td className="px-4 py-2">{user.joined}</td>
                  <td className="px-4 py-2">{user.swaps}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="inline-flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button onClick={() => viewUserDetails(user.id)} className="text-blue-600 hover:underline text-xs">View</button>
                      <button onClick={() => editUser(user.id)} className="text-orange-600 hover:underline text-xs">Edit</button>
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                      {user.status === "active" ? (
                        <button onClick={() => suspendUser(user.id)} className="text-yellow-600 hover:underline text-xs">Suspend</button>
                      ) : (
                        <button onClick={() => activateUser(user.id)} className="text-green-600 hover:underline text-xs">Activate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 pt-4">
        <p>Showing {users.length} of {users.length} users</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded text-blue-600 border-blue-400 hover:bg-blue-50">Previous</button>
          <button className="px-3 py-1 border rounded text-blue-600 border-blue-400 hover:bg-blue-50">Next</button>
        </div>
      </div>
    </div>
  );
}
