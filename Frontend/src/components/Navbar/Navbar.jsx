import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ setShowlogin }) => {
  const { getTotalCartAmount, token} = useContext(StoreContext);
  const navigate = useNavigate();
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
          Our Gallery
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
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowlogin(true)}>Sign Up/Login</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profiles_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/account")}>
                <CgProfile />
                <p style={{ whiteSpace: "nowrap" }}>Account</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
