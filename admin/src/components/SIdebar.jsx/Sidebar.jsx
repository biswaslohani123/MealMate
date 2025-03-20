import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {LayoutDashboard,PlusCircle,List,ShoppingBag,Menu,} from "lucide-react";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 
        ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
            : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
        } `;

  return (
    <div
      className={`h-screen border-r border-gray-200 bg-white px-4 py-6 transition-all duration-300 shadow-xl sticky top-0 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
     
      <button
        className="flex items-center gap-2 mb-6 hover:text-blue-800 transition-all"
        onClick={toggleSidebar}
      >
        <Menu size={26} />
        {isOpen && <span className="font-semibold text-lg">Menu</span>}
      </button>

      <div className="space-y-2">
        <NavLink
          to="/dashboard"
          className={navLinkClasses}
          data-tooltip-id="dashboard"
        >
          <LayoutDashboard size={22} />
          {isOpen && <p className="font-medium">Dashboard</p>}
        </NavLink>
        {!isOpen && (
          <Tooltip id="dashboard" content="Dashboard" place="right" />
        )}

        <NavLink to="/add" className={navLinkClasses} data-tooltip-id="add">
          <PlusCircle size={22} />
          {isOpen && <p className="font-medium">Add Items</p>}
        </NavLink>
        {!isOpen && <Tooltip id="add" content="Add Items" place="right" />}

        <NavLink to="/list" className={navLinkClasses} data-tooltip-id="list">
          <List size={22} />
          {isOpen && <p className="font-medium">List Items</p>}
        </NavLink>
        {!isOpen && <Tooltip id="list" content="List Items" place="right" />}

        <NavLink
          to="/orders"
          className={navLinkClasses}
          data-tooltip-id="orders"
        >
          <ShoppingBag size={22} />
          {isOpen && <p className="font-medium">Orders</p>}
        </NavLink>
        {!isOpen && <Tooltip id="orders" content="Orders" place="right" />}
      </div>
    </div>
  );
};

export default Sidebar;
