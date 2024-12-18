import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import SignUpPopup from './components/SignUpPopup/SignUpPopup'

const App = () => {
  const [showlogin, setShowlogin] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
 
  return (
    <>
    {showlogin && <LoginPopup setShowlogin={setShowlogin} setIsSignUp={setIsSignUp} />}
    {isSignUp && <SignUpPopup setIsSignUp={setIsSignUp} setShowlogin={setShowlogin}/>}
    <div className='app'>
   
      <Navbar setShowlogin={setShowlogin} setIsSignUp= {setIsSignUp}/>
      <Routes>
        < Route path="/" element={<Home/>} />
        < Route path="/Cart" element={<Cart/>} />
        < Route path="/order" element={<PlaceOrder/>} />
        

      </Routes>
    </div>
    </>
  )
}

export default App;
