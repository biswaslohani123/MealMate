import React, { useState, useEffect } from 'react';
import { Package, Phone, Mail, MapPin, CreditCard, ShoppingBag, Clock, Filter, Search } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-toastify';

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    const currentOrder = orders.find(order => order._id === orderId);

    if (currentOrder.status === "Order Delivered" && newStatus !== "Order Delivered") {
      toast.error("You cannot change the status after 'Order Delivered'");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus
      });
      
      if (response.data.success) {
        await fetchAllOrder();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Order Received ":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Order Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Order Out For Delivery":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Order Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.address.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order </h1>
          
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
          
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
              >
                <option value="all">All Status</option>
                <option value="Order Received ">Order Received</option>
                <option value="Order Processing">Processing</option>
                <option value="Order Out For Delivery">Out For Delivery</option>
                <option value="Order Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="pl-10">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                          <span className="font-medium text-gray-700">{item.name}</span>
                          <span className="text-gray-400">×</span>
                          <span className="text-gray-600">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                 
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{order.address.location}, {order.address.street}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{order.address.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{order.address.Phone}</span>
                    </div>
                  </div>

                 
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                        <span>Total Items:</span>
                      </div>
                      <span className="font-medium text-gray-900">{order.items.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span>Payment: {order.address.paymentMethod}</span>
                      </div>
                      
                    </div>

                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className={`w-full px-3 py-2 rounded-lg border ${getStatusColor(order.status)} text-sm font-medium transition-colors`}
                    >
                      <option value="Order Received ">Order Received</option>
                      <option value="Order Processing">Processing</option>
                      <option value="Order Out For Delivery">Out For Delivery</option>
                      <option value="Order Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">No Orders Found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;