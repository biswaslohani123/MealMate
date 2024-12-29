import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowlogin, setIsSignUp}) => {

    // for Cart signal
    const {getTotalCartAmount} = useContext(StoreContext)

    // creating a state variable

    const [menu, setMenu] = useState("Home")

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="MealMate Logo" className='logo' /></Link> 
        <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick= {() => setMenu("Menu")}className={menu === "Menu"?"active":""}>Menu</a>
            <a href='#Mobile-download' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app"?"active":""}>Mobile-app</a>
            <a href="#Footer" onClick={() => setMenu("Contact Us")}className={menu === "Contact Us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
            <button onClick={() => setShowlogin(true)}>Login</button>
        </div>
      
    </div>
  )
}

export default Navbar
