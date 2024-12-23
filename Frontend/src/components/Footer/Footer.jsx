import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer" id="Footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Order online with the city's top-rated Day & Night Food and Cakes
            delivery service. Our Food and Cakes Delivery Service is available
            inside Pokhara vAlley.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=100093406100843">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="https://www.instagram.com/lohanibiswas/">
              <img src={assets.instagram_icon} alt="" />
            </a>
            <a href="https://www.linkedin.com/feed/">
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>About Nova</h2>
          <ul>
            <li>
              <Link to='/'>Home</Link>
              </li>
            <li>
              <Link to="/about">Who We Are</Link>
            </li>
            <li>Delivery</li>
            
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <span>Mobile:</span> 9846065223
            </li>
            <li>
              <span>Email:</span> lohanibiswas1@gmail.com
            </li>
            <li>
              <span>Location:</span> Ranipawa, Pokhara
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © MealMate.com - All Right Reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
