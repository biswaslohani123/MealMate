import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'


const Navbar = ({setShowlogin, setIsSignUp}) => {

    // creating a state variable

    const [menu, setMenu] = useState("Home")

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo' />
        <ul className="navbar-menu">
            <Link onClick={() => setMenu("Home")} className={menu === "Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick= {() => setMenu("Menu")}className={menu === "Menu"?"active":""}>Menu</a>
            <a href='#Our-Gallery' onClick={() => setMenu("Our Gallery")} className={menu === "Our Gallery"?"active":""}>Our Gallery</a>
            <a href="#Footer" onClick={() => setMenu("Contact Us")}className={menu === "Contact Us"?"active":""}>Contact Us</a>
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
