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
        return "bg-orange-50 text-green-700 border-amber-200";
      case "Order Processing":
        return " bg-orange-50 text-yellow-700 border-amber-200";
      case "Order Out For Delivery":
        return " bg-orange-50 text-green-700 border-amber-200";
      case "Order Delivered":
        return " bg-orange-50 text-red-700 border-amber-200";
      default:
        return " bg-red-500 text-red-700 border-amber-200";
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
    <div className="min-h-screen bg-gradient-to-b  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Orders</h1>
          <p className="mt-2 text-stone-600">Manage and track all customer orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 border border-stone-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by user email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-stone-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-stone-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200 bg-amber-50"
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

        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden transition-all duration-200 hover:shadow-xl group"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Package className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-900">{order.address.firstName} {order.address.lastName}</h3>
                        <p className="text-sm text-stone-500">
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
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          <span className="font-medium text-stone-700">{item.name}</span>
                          <span className="text-stone-400">×</span>
                          <span className="text-stone-600">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin className="h-4 w-4 text-orange-400" />
                      <span>{order.address.location}, {order.address.street}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Mail className="h-4 w-4 text-orange-400" />
                      <span>{order.address.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Phone className="h-4 w-4 text-orange-400" />
                      <span>{order.address.Phone}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-stone-600">
                        <ShoppingBag className="h-4 w-4 text-orange-400" />
                        <span>Total Items:</span>
                      </div>
                      <span className="font-medium text-stone-900">{order.items.length}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-stone-600">
                        <CreditCard className="h-4 w-4 text-orange-400" />
                        <span>Payment: {order.address.paymentMethod}</span>
                      </div>
                    </div>

                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className={`w-full px-3 py-2 bg-amber-50 rounded-lg border-1 ${getStatusColor(order.status)} text-sm font-medium transition-colors`}
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
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-stone-100">
              <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-stone-900 font-medium mb-1">No Orders Found</h3>
              <p className="text-stone-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;