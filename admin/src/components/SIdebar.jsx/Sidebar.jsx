import React from 'react'

import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    
  return (
   <div className="bg-[#ffece9] min-h-screen w-64 fixed left-0 top-0 pt-20 text-[#ff6347] ">
      <div className="flex flex-col space-y-2  p-4">
        <NavLink 
          to='/add'
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-white text-[#ff6347] shadow-sm' : 'hover:bg-[#ffdcd7]'
            }`
          }
        >
          <img src={assets.add_icon} alt="" className="w-6 h-6" />
          <p className="font-medium">Add Items</p>
        </NavLink>
        
        <NavLink 
          to='/list'
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-white text-[#ff6347] shadow-sm' : 'hover:bg-[#ffdcd7]'
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="font-medium">List Items</p>
        </NavLink>
        
        <NavLink 
          to='/orders'
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-white text-[#ff6347] shadow-sm' : 'hover:bg-[#ffdcd7]'
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
