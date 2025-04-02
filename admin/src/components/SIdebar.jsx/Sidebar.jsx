import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {LayoutDashboard,PlusCircle,List,ShoppingBag,Menu,} from "lucide-react";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-orange-300 to-amber-200 text-stone-800 shadow-lg"
        : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div
      className={`h-screen border-r bg-amber-50 border-stone-100 bg-gradient-to-b from-white to-orange-50/30 px-4 py-6 transition-all duration-300 shadow-lg sticky top-0  ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <button
        className="flex items-center gap-2 mb-8 text-stone-700 hover:text-orange-500 transition-all duration-200 group"
        onClick={toggleSidebar}
      >
        <Menu size={24} className="group-hover:rotate-180 transition-transform duration-300" />
        {isOpen && <span className="font-semibold text-lg">Menu</span>}
      </button>

      <div className="space-y-3">
        <NavLink
          to="/"
          className={navLinkClasses}
          data-tooltip-id="dashboard"
        >
          <LayoutDashboard size={22} className="transition-transform group-hover:scale-110" />
          {isOpen && <p className="font-medium">Dashboard</p>}
        </NavLink>
        {!isOpen && (
          <Tooltip
            id="dashboard"
            content="Dashboard"
            place="right"
            className="!bg-orange-400 !px-3 !py-2"
          />
        )}

        <NavLink
          to="/add"
          className={navLinkClasses}
          data-tooltip-id="add"
        >
          <PlusCircle size={22} className="transition-transform group-hover:scale-110" />
          {isOpen && <p className="font-medium">Add Items</p>}
        </NavLink>
        {!isOpen && (
          <Tooltip
            id="add"
            content="Add Items"
            place="right"
            className="!bg-orange-400 !px-3 !py-2"
          />
        )}

        <NavLink
          to="/list"
          className={navLinkClasses}
          data-tooltip-id="list"
        >
          <List size={22} className="transition-transform group-hover:scale-110" />
          {isOpen && <p className="font-medium">List Items</p>}
        </NavLink>
        {!isOpen && (
          <Tooltip
            id="list"
            content="List Items"
            place="right"
            className="!bg-orange-400 !px-3 !py-2"
          />
        )}

        <NavLink
          to="/orders"
          className={navLinkClasses}
          data-tooltip-id="orders"
        >
          <ShoppingBag size={22} className="transition-transform group-hover:scale-110" />
          {isOpen && <p className="font-medium">Orders</p>}
        </NavLink>
        {!isOpen && (
          <Tooltip
            id="orders"
            content="Orders"
            place="right"
            className="!bg-orange-400 !px-3 !py-2"
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;