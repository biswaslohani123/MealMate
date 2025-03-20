import React from 'react'
import { Trash2 } from 'lucide-react';
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const List = ({url, token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
  
    
    if (response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  const removeFood = async(foodId) => {
   //api call
   const response = await axios.post(`${url}/api/food/remove`,{id:foodId}, {headers:{token}});
   await fetchList();
   if (response.data.success) {
      toast.success(response.data.message)
   }else{
    toast.error("Error");
   }
    
  }
  useEffect(() => {
    fetchList();
  },[])
  return (
    <div className="max-w-screen-xl mx-auto p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">All Foods List</h2>
      <span className="text-sm text-gray-500">{list.length} items</span>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-700">Image</div>
        <div className="text-sm font-semibold text-gray-700">Name</div>
        <div className="text-sm font-semibold text-gray-700">Category</div>
        <div className="text-sm font-semibold text-gray-700">Price</div>
        <div className="text-sm font-semibold text-gray-700 text-center">Action</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {list.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No items found</div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center">
                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              </div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-gray-600">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>
              <div className="text-gray-900">Rs. {item.price.toFixed(2)}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => removeFood(item._id)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-150"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default List
