import { useState } from "react"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, PlusCircle, List, ShoppingBag, ChevronLeft, User, ChevronRight } from "lucide-react"
import { Tooltip } from "react-tooltip"
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md"
        : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
    }`

  return (
    <div
      className={`h-screen bg-white border-r border-stone-100 transition-all duration-300 shadow-xl sticky top-0 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Toggle Button */}
      <div className="absolute -right-3 top-6">
        <button
          onClick={toggleSidebar}
          className="bg-white p-1.5  cursor-pointer rounded-full shadow-md border border-stone-100 text-orange-500 hover:bg-orange-50 transition-all duration-200 focus:outline-none"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* logo section */}
      <div className="px-4 py-6 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div >
            <img className="w-20" src={assets.logo} alt="" />
          </div>
          {isOpen && (
            <div className="transition-opacity duration-300">
              <h1 className="font-bold text-lg text-stone-800">Transit</h1>
              
            </div>
          )}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
        <div className="space-y-1.5">
          {/* Dashboard */}
          <NavLink to="/" className={navLinkClasses} data-tooltip-id="dashboard">
            <div className="w-8 h-8 flex items-center justify-center">
              <LayoutDashboard size={20} className="transition-transform duration-200" />
            </div>
            {isOpen && <p>Dashboard</p>}
          </NavLink>
          {!isOpen && (
            <Tooltip
              id="dashboard"
              content="Dashboard"
              place="right"
              className="!bg-orange-500 !text-white !px-3 !py-2 !rounded-md !shadow-lg !text-sm"
            />
          )}

          {/* Add Items */}
          <NavLink to="/add" className={navLinkClasses} data-tooltip-id="add">
            <div className="w-8 h-8 flex items-center justify-center">
              <PlusCircle size={20} className="transition-transform duration-200" />
            </div>
            {isOpen && <p>Add Items</p>}
          </NavLink>
          {!isOpen && (
            <Tooltip
              id="add"
              content="Add Items"
              place="right"
              className="!bg-orange-500 !text-white !px-3 !py-2 !rounded-md !shadow-lg !text-sm"
            />
          )}

          {/* List Items */}
          <NavLink to="/list" className={navLinkClasses} data-tooltip-id="list">
            <div className="w-8 h-8 flex items-center justify-center">
              <List size={20} className="transition-transform duration-200" />
            </div>
            {isOpen && <p>List Items</p>}
          </NavLink>
          {!isOpen && (
            <Tooltip
              id="list"
              content="List Items"
              place="right"
              className="!bg-orange-500 !text-white !px-3 !py-2 !rounded-md !shadow-lg !text-sm"
            />
          )}

          {/* Orders */}
          <NavLink to="/orders" className={navLinkClasses} data-tooltip-id="orders">
            <div className="w-8 h-8 flex items-center justify-center">
              <ShoppingBag size={20} className="transition-transform duration-200" />
            </div>
            {isOpen && <p>Orders</p>}
          </NavLink>
          {!isOpen && (
            <Tooltip
              id="orders"
              content="Orders"
              place="right"
              className="!bg-orange-500 !text-white !px-3 !py-2 !rounded-md !shadow-lg !text-sm"
            />
          )}

          {/* Users */}
          <NavLink to="/users" className={navLinkClasses} data-tooltip-id="users">
            <div className="w-8 h-8 flex items-center justify-center">
              <User size={20} className="transition-transform duration-200" />
            </div>
            {isOpen && <p>Users</p>}
          </NavLink>
          {!isOpen && (
            <Tooltip
              id="users"
              content="Users"
              place="right"
              className="!bg-orange-500 !text-white !px-3 !py-2 !rounded-md !shadow-lg !text-sm"
            />
          )}
        </div>
      </div>

      
    </div>
  )
}

export default Sidebar
