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
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-blue-50">
    <div className="flex flex-col gap-6 m-auto items-start p-10 max-w-md w-full bg-white rounded-xl shadow-xl border border-blue-200">
      <div className="w-full">
        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border border-blue-300 rounded-lg w-full p-3 mt-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border border-blue-300 rounded-lg w-full p-3 mt-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-amber-500 text-white font-semibold rounded-md text-lg hover:bg-orange-700 transition duration-300"
      >
        Login
      </button>
    </div>
  </form>
  
  );
};

export default Login;
