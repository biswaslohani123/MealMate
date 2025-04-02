import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowlogin }) => {
  // fetching url using Context Api
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });

  // UseState for Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    //  creating Instance
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    // Api call
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowlogin(false);
      toast.success(currState === "Login" 
        ? "Logged in successfully!" 
        : "Account created successfully!", {
        
      });
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowlogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="tel"
              placeholder="Your phone "
              required
            />
          </>
            
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
        
          <div className="password-input-container">

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          
          <span className="password-visibility" onClick={() => setShowPassword((prev) => !prev)}>
           <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash }/>
            

          </span>
        </div>
          </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        
        {currState === "Login" ? (
          <p>
            Create a new account? {" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span><br />
            
           
            
          </p>
          
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
            
          </p>
        )}
      </form>
    </div>

    
  );
};

export default LoginPopup;