import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CgProfile } from "react-icons/cg";
import { LogOut } from "lucide-react";
import axios from "axios";
import Notification from "../Notification/Notification"; // ✅ Importing Notification

const Navbar = ({ setShowlogin }) => {
  const { getTotalCartAmount, token, setToken, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menu, setMenu] = useState("Home");
  const [profileImage, setProfileImage] = useState(assets.profiles_icon); // Default profile icon

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (response.data.success) {
          const image = response.data.user.image;

          const fullImageUrl =
            image.startsWith("blob:") || image.startsWith("http")
              ? image
              : `${url}/images/${image}`;

          setProfileImage(fullImageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileImage(assets.profiles_icon); // Fallback in case of error
      }
    };

    fetchProfileImage();
  }, [token, url]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="MealMate Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        {isHome && (
          <>
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
          </>
        )}
        <a
          href="#Footer"
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
        <Link
          to="/about"
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          About Us
        </Link>
      </ul>

      {isHome && (
        <div className="navbar-right">
          <Notification /> {/* ✅ Notification Icon added here */}

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
              <img
                src={profileImage}
                alt="Profile"
                className="profile-icon"
                onError={(e) => (e.target.src = assets.profiles_icon)}
              />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/account")}>
                  <CgProfile />
                  <p style={{ whiteSpace: "nowrap" }}>Account</p>
                </li>
                <li onClick={handleLogout} className="account-item logout">
                  <LogOut />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
