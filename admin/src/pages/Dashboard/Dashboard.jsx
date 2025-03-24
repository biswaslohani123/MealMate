import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.";
import { Package, Users, Clock, Mail, Calendar } from "lucide-react";

const Dashboard = () => {
  const { atoken, getDashData, dashdata } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">
          MealMate Dashboard
        </h1>
        <p className="text-stone-600 mt-2">Welcome back to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-orange-300 to-amber-200 rounded-2xl p-6 text-stone-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <h2 className="text-lg font-medium">Total Orders</h2>
              </div>
              <p className="text-4xl font-bold">{dashdata.orders}</p>
            
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Package className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-300 to-amber-200 rounded-2xl p-6 text-stone-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <h2 className="text-lg font-medium">Total Users</h2>
              </div>
              <p className="text-4xl font-bold">{dashdata.users}</p>
              <p className="text-sm text-stone-700">Registered users</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100">
        <div className="px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <h2 className="text-lg font-semibold text-stone-800">
                Latest Orders
              </h2>
            </div>
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {dashdata.latestorders && dashdata.latestorders.length > 0 ? (
            dashdata.latestorders.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-stone-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <Package className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        {item.items.map((i) => (
                          <div
                            key={i._id}
                            className="flex items-center space-x-3"
                          >
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            <p className="text-sm font-medium text-stone-900">
                              {i.name}
                            </p>
                            <div className="flex items-center text-sm font-medium text-orange-600">
                              <span>Rs. {i.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-stone-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4 text-orange-400" />
                          <span>{item.address.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
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
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-stone-900 font-medium mb-1">No Orders Yet</h3>
              <p className="text-stone-500 text-sm">
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