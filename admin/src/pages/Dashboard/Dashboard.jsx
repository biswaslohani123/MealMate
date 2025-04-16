import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.";
import { Package, Users, Clock, Mail, Calendar, IndianRupee } from "lucide-react";
import CountUp from 'react-countup';

const Dashboard = () => {
  const { atoken, getDashData, dashdata } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-stone-800 mb-3">
          MealMate Dashboard
        </h1>
        <div className="h-1 w-24 bg-orange-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">Total Orders</h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2">
              <CountUp end={dashdata.orders || 0} duration={2} />
            </p>
            <p className="text-sm text-stone-500">Total orders received</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-stone-700">Total Users</h2>
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
              <h2 className="text-lg font-semibold text-stone-700">Overall Income</h2>
            </div>
            <p className="text-4xl font-bold text-stone-800 mb-2 flex items-center">
              <CountUp end={dashdata.totalIncome || 0} duration={2}  />
            </p>
            <p className="text-sm text-stone-500">Total Income</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-100">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-stone-800">Latest Orders</h2>
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
                            <span className="text-sm font-medium text-orange-600">
                              Rs.{i.price}
                            </span>
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                              ×{i.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-stone-500">
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
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium text-stone-800 mb-1">No Orders Yet</h3>
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