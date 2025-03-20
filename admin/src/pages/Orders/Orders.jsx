import React from 'react'
import { Package, Phone, Mail, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"


const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
 
  
  const fetchAllOrder = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);      
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    // Finding the current order status
    const currentOrder = orders.find(order => order._id === orderId);
  
    // implementing Logic
    if (currentOrder.status === "Order Delivered" && newStatus !== "Order Delivered") {
      toast.error("You cannot change the status after 'Order Delivered'");
      return;
    }
  
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: newStatus
    });
  
    if (response.data.success) {
      await fetchAllOrder();
    }
  };
  
 
    
  const getStatusColor = (status) => {
    switch(status) {
      case "Order Received ":
        return "bg-yellow-100 text-yellow-800";
      case "Order Processing":
        return "bg-blue-100 text-blue-800";
      case "Order Out For Delivery":
        return "bg-purple-100 text-purple-800";
      case "Order Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  useEffect(() => {
    fetchAllOrder()
  }, [])
  
  return (
    <div className="max-w-[95%] mx-auto p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
      <span className="text-sm text-gray-500">{orders.length} orders</span>
    </div>

    <div className="space-y-4">
      {orders.map((order, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Package className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Order Items</h3>
                  <p className="text-sm text-gray-600">
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} × {item.quantity}
                        {index !== order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Total Items: {order.items.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Payment: {order.address.paymentMethod} | Amount: Rs. {order.amount}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {order.address.firstName} {order.address.lastName}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {order.address.location}, {order.address.street}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{order.address.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{order.address.Phone}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className={`px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium ${getStatusColor(order.status)}`}
              >
                <option value="Order Received ">Order Received</option>
                <option value="Order Processing">Order Processing</option>
                <option value="Order Out For Delivery">Out For Delivery</option>
                <option value="Order Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Orders Yet</h3>
          <p className="text-sm text-gray-500">Orders will appear here when customers place them.</p>
        </div>
      )}
    </div>
  </div>
  )
}

export default Orders