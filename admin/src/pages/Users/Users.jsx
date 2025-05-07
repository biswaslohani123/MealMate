"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { UsersIcon, Search, Mail, Phone, Loader2, RefreshCcw, Trash2, RotateCcw } from "lucide-react"
import { toast } from "react-toastify"

const Users = () => {
  const url = "http://localhost:4000"

  const [users, setUsers] = useState([])
  const [deletedUserIds, setDeletedUserIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("atoken")

      const response = await axios.get(url + "/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (response.data.success) {
        const usersData = response.data.users.map((user) => {
          const createdAt = new Date(user.createdAt)
          const formattedDate = createdAt.toLocaleDateString("en-US")
          return { ...user, formattedDate }
        })

        setUsers(usersData)
      } else {
        toast.error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Error loading users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRefresh = () => {
    fetchUsers()
    // Clear deleted users on refresh
    setDeletedUserIds([])
  }

  const handleDeleteUser = (userId) => {
    setDeletedUserIds((prev) => [...prev, userId])
    toast.success("User has been deleted")
  }

  const handleRestoreAll = () => {
    setDeletedUserIds([])
    toast.success("All users have been restored")
  }

  const filteredUsers = users
    .filter((user) => !deletedUserIds.includes(user._id))
    .filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search),
    )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-orange-500">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen from-stone-50 to-white p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Users List</h1>
          <p className="mt-2 text-stone-600">
            Total Users: <span className="font-semibold text-orange-600">{filteredUsers.length}</span>
            {deletedUserIds.length > 0 && (
              <span className="ml-2 text-stone-500">({deletedUserIds.length} deleted)</span>
            )}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 border border-stone-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
              />
            </div>

            <div className="flex gap-2">
              {deletedUserIds.length > 0 && (
                <button
                  onClick={handleRestoreAll}
                  className="flex items-center gap-2 bg-stone-100 text-stone-700 py-2 px-4 rounded-lg hover:bg-stone-200 transition-colors duration-200"
                >
                  <RotateCcw className="h-5 w-5" />
                  Restore All
                </button>
              )}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <RefreshCcw className="h-5 w-5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-stone-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">Joined Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-3 bg-orange-50 rounded-full mb-3">
                          <UsersIcon className="h-6 w-6 text-orange-400" />
                        </div>
                        <h3 className="text-stone-900 font-medium mb-1">No Users Found</h3>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-stone-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center text-white font-medium">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-stone-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-stone-600">
                          <Mail className="h-4 w-4 text-orange-400" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-stone-600">
                          <Phone className="h-4 w-4 text-orange-400" />
                          <span>{user.phone || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.formattedDate}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                          title="Delete User"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
