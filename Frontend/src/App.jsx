import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUS/About";
import MenuBook from "./pages/MenuBook/MenuBook";

import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";

import OurGallery from "./components/Gallery/OurGallery";



const App = () => {
  const [showlogin, setShowlogin] = useState(false);

  return (
    <>
     <ToastContainer/>
      {showlogin ? <LoginPopup setShowlogin={setShowlogin} /> : <></>}
      <div className="app">
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
       
          <Route path="/ourgallery" element={<OurGallery/>}/>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/about" element={<AboutUs />} />
          
          
          <Route path="/verify" element={<Verify />} />
          <Route path="/MenuBook" element={<MenuBook />} />
          <Route path="/myOrders" element={<MyOrders />} />
          
          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
