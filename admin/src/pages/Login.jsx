import React, { useState, useContext } from "react";

import axios from 'axios'
import { AdminContext } from "../context/AdminContext.";


const Login = () => {
  const { setAtoken, url } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        const { data } = await axios.post(url + "/api/admin/adminlogin", {
            email,
            password,
          });
        
      
      
      if (data.success) {
        console.log(data.token);
        
        localStorage.setItem("atoken", data.token);
        setAtoken(data.token);
      } else {
        alert("Error logging in");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          style={{ backgroundColor: "#3b82f6", color: "white" }}
          className="w-full py-2 rounded-md text-base"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
