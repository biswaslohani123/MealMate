import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <button onClick={() => setToken('')} className='btn'>Logout</button>
        <img className='profile' src={assets.profile_image} alt="" />
        
    </div>
  )
}

export default Navbar
