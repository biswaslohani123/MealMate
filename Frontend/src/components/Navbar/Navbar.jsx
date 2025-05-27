import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CgProfile } from "react-icons/cg";
import { LogOut } from "lucide-react";
import axios from "axios";
import Notification from "../Notification/Notification";

const Navbar = ({ setShowlogin }) => {
  const { getTotalCartAmount, token, setToken, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menu, setMenu] = useState("Home");
  const [profileImage, setProfileImage] = useState(assets.profiles_icon);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        setProfileImage(assets.profiles_icon);
      }
    };

    fetchProfileImage();
  }, [token, url]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const scrollToSection = (id, label) => {
    setMenu(label);
    setMobileMenuOpen(false);
    if (isHome) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="MealMate Logo" className="logo" />
      </Link>

      <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        ☰
      </div>

      <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
          Home
        </Link>
        <a
          onClick={() => scrollToSection("Our-gallery", "Our-gallery")}
          className={menu === "Our-gallery" ? "active" : ""}
        >
          Our Gallery
        </a>
        <a
          onClick={() => scrollToSection("explore-menu", "Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <Link
          to="/about"
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          About Us
        </Link>
      </ul>

      <div className="navbar-right">
        <Notification />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowlogin(true)}>Sign Up/Login</button>
        ) : (
          <div className="navbar-profile" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <img
              src={profileImage}
              alt="Profile"
              className="profile-icon"
              onError={(e) => (e.target.src = assets.profiles_icon)}
            />
            {showProfileDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/account")}>
                  <CgProfile />
                  <p>Account</p>
                </li>
                <li onClick={handleLogout} className="account-item logout">
                  <LogOut />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
