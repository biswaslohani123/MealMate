import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SIdebar.jsx/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext.";

import Users from "./pages/Users/Users";

const App = () => {
  const url = "http://localhost:4000";

  const { atoken } = useContext(AdminContext);

  if (!atoken) {
    return <Login />;
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />

      <Navbar />

      <div className="flex mt-[65px]">
        <Sidebar className="w-1/4" />

        <div className="w-3/4 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/users" element={<Users url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;