import React from 'react'
import './LoginPopup.css'

import { ImCross } from "react-icons/im";

const LoginPopup = ({setShowlogin,setIsSignUp}) => {
    

   
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
            <h2>Login</h2>
            {/* <img onClick = {() => setShowlogin(false)}src={assets.cross_icon} alt="Close" /> */}
            <ImCross onClick = {() => setShowlogin(false)
            
            }/>
        </div>

       

        
        
        <div className="login-popup-inputs">
           
            <input type="Email" placeholder='Your Email' required />
            <input type="password" placeholder='Your Passowrd' required />

        </div>
        <button>Login</button>
        <p>
            Don't have an account? <span onClick={()=>{
              setShowlogin(false)
              setIsSignUp(true)
            }}>Sign Up here</span>
        </p>

      </form>
    </div>
  )
}

export default LoginPopup
