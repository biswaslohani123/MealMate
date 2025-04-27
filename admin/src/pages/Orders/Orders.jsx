import { useState, useEffect } from "react";
import {
  Package,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  ShoppingBag,
  Clock,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock3,
  RefreshCw,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    const currentOrder = orders.find((order) => order._id === orderId);

    if (
      currentOrder.status === "Order Delivered" &&
      newStatus !== "Order Delivered"
    ) {
      toast.error("You cannot change the status after 'Order Delivered'");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
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
    switch (status) {
      case "Order Received":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Order Processing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Order Out For Delivery":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Order Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Received":
        return <AlertCircle className="h-4 w-4" />;
      case "Order Processing":
        return <Clock3 className="h-4 w-4" />;
      case "Order Out For Delivery":
        return <Truck className="h-4 w-4" />;
      case "Order Delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.address.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.address.firstName} ${order.address.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status.trim() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate total amount for each order
  const calculateTotal = (items, deliveryCharge = 100) => {
    return (
      items.reduce((total, item) => total + item.price * item.quantity, 0) +
      deliveryCharge
    );
  };
  //date and time
  const formatDateTime = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      console.log("Invalid date received:", dateString);
      return {
        date: "Date unavailable",
        time: "Time unavailable",
        fullDate: "Date unavailable",
        fullDateTime: "Date and time unavailable",
      };
    }

    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDate: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      fullDateTime: date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="min-h-screen via-white to-orange-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Orders
              </h1>
              <p className="text-gray-700 text-sm">
                Manage and track all customer orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAllOrder}
              className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* search and filter section */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-4 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email or items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors duration-200 text-gray-900"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-amber-50 px-3 py-2.5 rounded-xl border border-amber-200">
                <Filter className="h-4 w-4 text-amber-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-gray-800 font-medium text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Order Received">Order Received</option>
                  <option value="Order Processing">Processing</option>
                  <option value="Order Out For Delivery">
                    Out For Delivery
                  </option>
                  <option value="Order Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-amber-200 rounded w-1/3"></div>
                    <div className="h-4 bg-amber-200 rounded w-1/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-amber-200 rounded w-2/3"></div>
                      <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                    <div className="h-4 bg-amber-200 rounded w-2/3"></div>
                    <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                    <div className="h-8 bg-amber-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className="p-4 md:p-5 cursor-pointer"
                  onClick={() => toggleOrderExpand(order._id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg border border-amber-100">
                          <Package className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                              {order.address.firstName} {order.address.lastName}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-1">
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDateTime(order.createdAt).date}
                            </p>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDateTime(order.createdAt).time}
                            </p>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              {order.paymentMethod ||
                                order.address.paymentMethod}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {order.items.slice(0, 2).map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-gray-800 border border-amber-100"
                              >
                                {item.name} × {item.quantity}
                              </span>
                            ))}
                            {order.items.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-gray-800 border border-orange-200">
                                +{order.items.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-4 pl-10 lg:pl-0 mt-2 lg:mt-0 lg:items-end">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-orange-500" />
                        <span className="truncate">{order.address.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-4 w-4 text-orange-500" />
                        <span>{order.address.Phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-4 pl-10 lg:pl-0 mt-2 lg:mt-0 lg:items-end">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <span className="truncate">
                          {order.address.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ShoppingBag className="h-4 w-4 text-orange-500" />
                        <span>Items: {order.items.length}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pl-10 lg:pl-0 mt-2 lg:mt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Total:
                        </span>
                        <span className="font-bold text-gray-900">
                          Rs.{" "}
                          {calculateTotal(
                            order.items,
                            order.deliveryCharge || 100
                          )}
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          onChange={(event) => statusHandler(event, order._id)}
                          value={order.status}
                          className={`w-full px-3 py-2 rounded-lg border ${getStatusColor(
                            order.status
                          )} text-sm font-medium transition-colors appearance-none pr-10`}
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Order Processing">Processing</option>
                          <option value="Order Out For Delivery">
                            Out For Delivery
                          </option>
                          <option value="Order Delivered">Delivered</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div
                            className={`flex items-center justify-center ${
                              getStatusColor(order.status).split(" ")[1]
                            }`}
                          >
                            {getStatusIcon(order.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-100">
                      {expandedOrder === order._id ? (
                        <ChevronUp className="h-5 w-5 text-amber-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-amber-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="p-5 border-t border-amber-100 animate-slideDown ">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">
                        Order Details
                      </h4>
                    </div>

                    <div className="bg-white rounded-xl border border-amber-100 overflow-hidden mb-5">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-amber-100">
                          <thead className="bg-amber-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-amber-100">
                            {order.items.map((item, idx) => (
                              <tr key={idx} className="hover:bg-amber-50">
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {item.name}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                                  {item.quantity}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                                  Rs. {item.price}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Rs. {item.price * item.quantity}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td
                                colSpan={3}
                                className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                              >
                                Delivery Charge:
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                Rs. {order.deliveryCharge || 100}
                              </td>
                            </tr>
                            <tr className="bg-amber-50">
                              <td
                                colSpan={3}
                                className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                              >
                                Total Amount:
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                                Rs.{" "}
                                {calculateTotal(
                                  order.items,
                                  order.deliveryCharge || 100
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-amber-100 h-full">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          Delivery Address
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Customer Name
                            </p>
                            <p className="text-gray-900">
                              {order.address.firstName} {order.address.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Phone</p>
                            <p className="text-gray-900">
                              {order.address.Phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Email</p>
                            <p className="text-gray-900">
                              {order.address.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Location
                            </p>
                            <p className="text-gray-900">
                              {order.address.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-amber-100 h-full">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-orange-500" />
                          Payment Information
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Method</p>
                            <p className="text-gray-900 capitalize">
                              {order.paymentMethod ||
                                order.address.paymentMethod}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Status</p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Order Date & Time
                            </p>
                            <p className="text-gray-900">
                              {formatDateTime(order.createdAt).fullDateTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Delivery Charge
                            </p>
                            <p className="text-gray-900">
                              Rs. {order.deliveryCharge || 100}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Total Amount
                            </p>
                            <p className="text-gray-900 font-bold">
                              Rs.{" "}
                              {calculateTotal(
                                order.items,
                                order.deliveryCharge || 100
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-amber-100">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-gray-900 font-medium text-xl mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-700 max-w-md mx-auto">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
