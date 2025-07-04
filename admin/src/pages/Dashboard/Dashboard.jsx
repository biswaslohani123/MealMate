import { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext.";
import {
  Package,
  Users,
  Clock,
  Mail,
  Calendar,
  IndianRupee,
  BarChart3,
  Utensils,
  TrendingUp,
  ListCollapse,
} from "lucide-react";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { atoken, getDashData, dashdata } = useContext(AdminContext);
  const [dateFilter, setDateFilter] = useState("week");

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken, getDashData]);

  const generateSalesData = () => {
    if (!dashdata.latestorders || dashdata.latestorders.length === 0) {
      return [];
    }

    const today = new Date();
    let startDate, endDate;
    let dateFormat, groupByKey;

    switch (dateFilter) {
      case "week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        dateFormat = "day";
        groupByKey = (date) =>
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
        break;

      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );

        dateFormat = "date";
        groupByKey = (date) => date.getDate();
        break;

      case "year":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

        dateFormat = "month";
        groupByKey = (date) => date.getMonth();
        break;
    }

    const filteredOrders = dashdata.latestorders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const salesByDate = {};

    if (dateFilter === "week") {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      daysOfWeek.forEach((day) => {
        salesByDate[day] = 0;
      });
    } else if (dateFilter === "month") {
      const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        salesByDate[i] = 0;
      }
    } else if (dateFilter === "year") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      months.forEach((month, index) => {
        salesByDate[month] = 0;
      });
    }

    filteredOrders.forEach((order) => {
      const orderDate = new Date(order.date);
      let key;

      if (dateFilter === "year") {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        key = monthNames[orderDate.getMonth()];
      } else {
        key = groupByKey(orderDate);
      }

      if (!salesByDate[key]) {
        salesByDate[key] = 0;
      }

      salesByDate[key] += order.amount;
    });

    // Converting to array format for chart
    if (dateFilter === "month") {
      // For month view, sort by date numerically
      return Object.entries(salesByDate)
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => Number.parseInt(a.name) - Number.parseInt(b.name));
    } else if (dateFilter === "year") {
      // For year view, maintain month order
      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthOrder.map((month) => ({
        name: month,
        sales: salesByDate[month] || 0,
      }));
    } else {
      // For week view, maintain the predefined order
      return Object.entries(salesByDate).map(([name, sales]) => ({
        name,
        sales,
      }));
    }
  };

  // getting most ordered items
  const getMostOrderedItems = useMemo(() => {
    if (!dashdata.latestorders || dashdata.latestorders.length === 0) {
      return [];
    }

    const itemCounts = {};

    dashdata.latestorders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = {
            name: item.name,
            count: 0,
            price: item.price,
            totalQuantity: 0,
          };
        }
        itemCounts[item.name].count += 1;
        itemCounts[item.name].totalQuantity += item.quantity;
      });
    });

    return Object.values(itemCounts)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5);
  }, [dashdata.latestorders]);

  const salesData = generateSalesData();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Transit Dashboard
          </h1>
          <div className="h-1 w-24 bg-orange-400 mx-auto md:mx-0 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">
                Total Orders
              </h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2">
              <CountUp end={dashdata.orders || 0} duration={2} />
            </p>
            <p className="text-sm text-stone-500">Total orders received</p>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ListCollapse className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">
                Total FoodItems
              </h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2">
              <CountUp end={dashdata.totalFoods || 0} duration={2} />
            </p>
            <p className="text-sm text-stone-500">Total FoodItems</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">
                Total Users
              </h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2">
              <CountUp end={dashdata.users || 0} duration={2} />
            </p>
            <p className="text-sm text-stone-500">Registered customers</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-orange-50 to-amber-100 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <IndianRupee className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">
                Overall Income
              </h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2 flex items-center gap-2">
              Rs
              <CountUp end={dashdata.totalIncome || 0} duration={2} />
            </p>
            <p className="text-sm text-stone-500">Total Income</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {salesData.length > 0 && (
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-5 border-b border-stone-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-stone-800">
                    Sales
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDateFilter("week")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      dateFilter === "week"
                        ? "bg-orange-500 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setDateFilter("month")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      dateFilter === "month"
                        ? "bg-orange-500 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setDateFilter("year")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      dateFilter === "year"
                        ? "bg-orange-500 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={8}
                  barCategoryGap={16}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      padding: "8px 12px",
                    }}
                    formatter={(value) => [`Rs ${value}`, "Sales"]}
                    labelStyle={{ color: "#64748b", fontWeight: 500 }}
                    cursor={{ fill: "rgba(249, 115, 22, 0.1)" }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                      <stop offset="100%" stopColor="#fdba74" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <div className="flex items-center space-x-3">
              <Utensils className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-stone-800">
                Most Ordered Items
              </h2>
            </div>
          </div>
          <div className="divide-y divide-stone-100">
            {getMostOrderedItems.length > 0 ? (
              getMostOrderedItems.map((item, index) => (
                <div
                  key={index}
                  className="p-5 hover:bg-stone-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-stone-500">
                          Rs.{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-stone-700">
                        {item.totalQuantity} ordered
                      </div>
                      <div className="text-xs text-emerald-600 mt-1 flex items-center justify-end">
                        <TrendingUp className="h-3 w-3 inline mr-0.5" />
                        Popular
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-medium text-stone-800 mb-1">
                  No Data Available
                </h3>
                <p className="text-stone-500">No order data </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-100">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-stone-800">
              Latest Orders
            </h2>
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {dashdata.latestorders && dashdata.latestorders.length > 0 ? (
            dashdata.latestorders.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-stone-50/50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      {item.items.map((i) => (
                        <div
                          key={i._id}
                          className="flex items-center space-x-3"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          <p className="text-sm font-medium text-stone-800 flex-1">
                            {i.name}
                          </p>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">
                              Rs.{i.price}
                            </span>
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
                              ×{i.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-stone-500">
                        <div className="flex items-center space-x-1.5">
                          <Mail className="h-4 w-4 text-orange-400" />
                          <span>{item.address.email}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="h-4 w-4 text-orange-400" />
                          <span>
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium text-stone-800 mb-1">
                No Orders Yet
              </h3>
              <p className="text-stone-500">
                No recent orders have been placed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
