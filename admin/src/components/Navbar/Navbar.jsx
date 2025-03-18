import React from 'react'

import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
    <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
    <img src={assets.profile_image} alt="Profile" className="h-10 w-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity" />
  </div>
  )
}

export default Navbar
