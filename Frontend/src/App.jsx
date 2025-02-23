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




const App = () => {
  const [showlogin, setShowlogin] = useState(false);
  

  return (
    <>
      {showlogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
      <div className="app">
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/about" element={<AboutUs/>} />
          
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/MenuBook" element={<MenuBook/>}/>

         
       
        
          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
