import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowlogin }) => {
  // for Cart signal
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // creating a state variable

  const [menu, setMenu] = useState("Home");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="MealMate Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#Our-gallery"
          onClick={() => setMenu("Our-gallery")}
          className={menu === "Our-gallery" ? "active" : ""}
        >
         Our-gallery
        </a>
       
        <a
          href="#Footer"
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
        

      </ul>
    
      
      <div className="navbar-right">
        
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowlogin(true)}>Sign Up/Login</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profiles_icon} alt="" />
            <ul className="nav-profile-dropdown">
          
           
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p style={{whiteSpace:"nowrap"}}>My Orders</p>
              </li>
              <hr />
              <li onClick={Logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
