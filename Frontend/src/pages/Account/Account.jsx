import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

import './Account.css'
import { ShoppingBag } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';




const Account = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="account-container">
      
      <div className="account-options">
        <div onClick={() => navigate("/myprofile")} className="account-item">
        <CircleUserRound />
          <p>My Profile</p>
        </div>
        <div onClick={() => navigate("/myorders")} className="account-item">
        <ShoppingBag />
          <p>My Orders</p>
        </div>
        <div onClick={handleLogout} className="account-item logout">
        <LogOut />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
