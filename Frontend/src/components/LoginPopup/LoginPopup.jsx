import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowlogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, phone } = data;

    
  


    // Sign up validations
    if (currState === "Sign Up") {
      if (name.trim().length < 2) {
        toast.error("Name must be at least 2 characters");
        return false;
      }

      // Phone number validation 
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Phone number must be 10 digits");
        return false;
      }
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    // Password validation 
    if (currState === "Sign Up" && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(password)) {
      toast.error("Password must include upper, lower, number & special character");
      return false;
    }

    return true;  
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const res = await axios.post(`${url}${endpoint}`, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowlogin(false);
        toast.success(
          currState === "Login"
            ? "Logged in successfully!"
            : "Account created successfully!"
        );
      } else {
        
        if (currState === "Login" && res.data.message === "User Not Found") {
          toast.error("User not found");
        } else {
          toast.error(currState === "Login" ? "Invalid credentials" : res.data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowlogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={data.name}
                onChange={onChangeHandler}
                autoComplete="name"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Your phone"
                value={data.phone}
                onChange={onChangeHandler}
                autoComplete="tel"
                required
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            autoComplete="email"
            required
          />

          <div className="password-input-container">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              autoComplete="current-password"
              required
            />
            <span
              className="password-visibility"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Create account"}
        </button>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
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
