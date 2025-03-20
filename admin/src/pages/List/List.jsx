import React, { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url, token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching items");
      }
    } catch (error) {
      toast.error("Failed to load items");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b  to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">List Items</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No items found
              </h3>
              <p className="text-gray-500">Enter valid items</p>
            </div>
          ) : (
            filteredList.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => removeFood(item._id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-orange-600 font-medium">
                      Rs.{item.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
