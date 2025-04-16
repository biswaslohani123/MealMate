"use client"

import { useState, useEffect } from "react"
import { Trash2, Search, ToggleLeft, ToggleRight, X } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"

const List = ({ url, token }) => {
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedFoodId, setSelectedFoodId] = useState(null)
  const [isToggling, setIsToggling] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)

        const categories = [...new Set(response.data.data.map((item) => item.category))]
        setAllCategories(categories)
      } else {
        toast.error("Error fetching items")
      }
    } catch (error) {
      toast.error("Failed to load items")
    }
  }

  const confirmDelete = (foodId) => {
    setSelectedFoodId(foodId)
    setShowConfirm(true)
  }

  const removeFood = async () => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: selectedFoodId }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error("Failed to remove item")
      }
    } catch (error) {
      toast.error("Error removing item")
    } finally {
      setShowConfirm(false)
      setSelectedFoodId(null)
    }
  }

  const toggleFoodStatus = async (foodId, currentStatus) => {
    if (isToggling) return

    setIsToggling(true)
    try {
      const response = await axios.post(`${url}/api/food/toggle-status`, { id: foodId }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setList((prevList) =>
          prevList.map((item) => (item._id === foodId ? { ...item, active: !currentStatus } : item)),
        )
      } else {
        toast.error("Failed to update status")
      }
    } catch (error) {
      toast.error("Error updating status")
    } finally {
      setIsToggling(false)
    }
  }

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(item.category)
    return matchesSearch && matchesCategories
  })

  return (
    <div className="min-h-screen bg-gradient-to-b p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Menu Items</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 border border-stone-100">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
              />
            </div>

            <div className="mt-2 ">
              <h3 className=" font-medium mb-4  text-amber-600 mb-3 cursor-pointer">Categories</h3>
              <div className="flex flex-wrap gap-2 cursor-pointer">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                      ${
                        selectedCategories.includes(category)
                          ? "bg-gradient-to-r from-orange-300 to-amber-500 cursor-pointer text-white shadow-md hover:shadow-lg hover:from-orange-200 hover:to-amber-600"
                          : "bg-white text-stone-700 border border-stone-200 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                  >
                    {category}
                    {selectedCategories.includes(category) && <X className="h-3.5 w-3.5" />}
                  </button>
                ))}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center gap-2 mt-4"
                  >
                    Clear all
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-1">No items found</h3>
              <p className="text-stone-500">Try adjusting your search criteria or category filters</p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100 group relative ${!item.active ? "opacity-70" : ""}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={() => confirmDelete(item._id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-red-50 text-red-500 transition-colors shadow-lg"
                    >
                      <Trash2 size={18} className="cursor-pointer" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-stone-900">{item.name}</h3>
                    <span className="text-orange-600 font-medium">Rs.{item.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200">
                      {item.category}
                    </span>
                    <div className="flex items-center ">
                      <span className={` text-xs mr-2 ${item.active ? "text-green-600" : "text-red-600"}`}>
                        {item.active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() => toggleFoodStatus(item._id, item.active)}
                        disabled={isToggling}
                        className="p-1 cursor-pointer rounded-full focus:outline-none"
                      >
                        {item.active ? (
                          <ToggleRight size={24} className="text-green-500" />
                        ) : (
                          <ToggleLeft size={24} className="text-red-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80">
            <h3 className="text-lg font-medium text-stone-900 mb-3">Are you sure?</h3>
            <p className="text-stone-600 mb-4">Do you want to delete this item?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 rounded text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                No
              </button>
              <button onClick={removeFood} className="px-3 py-1 rounded text-white bg-amber-500 hover:bg-amber-600">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
