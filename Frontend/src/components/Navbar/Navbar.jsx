import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setShowlogin, setIsSignUp}) => {

    // creating a state variable

    const [menu, setMenu] = useState("Home")

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo' />
        <ul className="navbar-menu">
            <li onClick={() => setMenu("Home")} className={menu === "Home"?"active":""}>Home</li>
            <li onClick= {() => setMenu("Menu")}className={menu === "Menu"?"active":""}>Menu</li>
            <li onClick={() => setMenu("Our Gallery")} className={menu === "Our Gallery"?"active":""}>Our Gallery</li>
            <li onClick={() => setMenu("Contact Us")}className={menu === "Contact Us"?"active":""}>Contact Us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
            <button onClick={() => setShowlogin(true)}>Login</button>
        </div>
      
    </div>
  )
}

export default Navbar
