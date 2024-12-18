import React from 'react'
import './SignUpPopup.css'

import { ImCross } from "react-icons/im";

const SignUpPopup = ({ setIsSignUp,setShowlogin }) => {
  return (
     <div className='login-popup'>
          <form className='login-popup-container'>
            <div className="login-popup-title">
                <h2>SignUp</h2>
                {/* <img onClick = {() => setIsSignUp(false)}src={assets.cross_icon} alt="Close" /> */}
                <ImCross onClick = {() => setIsSignUp(false)
                }/>
            </div>
            
            <div className="login-popup-inputs">
                <input type="text" placeholder='First Name' required />
                <input type="text" placeholder='Last Name' required />
                <input type="email" placeholder='your Email' required />
                <input type="password" placeholder='Your password' required />
                <input type="password" placeholder='Confirm password' required />
            </div>
            <button >Sign Up</button>
            <p>
            Already have an account? <span onClick={()=>{
              setShowlogin(true)
              setIsSignUp(false)
            }}>Login in here</span>
        </p>
           <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
           </div>
    
          </form>
        </div>
  )
}

export default SignUpPopup
