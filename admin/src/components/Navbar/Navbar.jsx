import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext.";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
  };

  const gpToDashboard = () => {
    navigate("/");
  };
  return (
    <div className=" form-white border-b bg-white border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm fixed w-full top-0 z-50 rounded-2xl">
      <div className="flex items-center cursor-pointer" onClick={gpToDashboard}>
        <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src={assets.profile_image}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
          />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white-200 bg-orange-400 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
        >
          <LogOut size={18} className="text-white" />
          <span className="font-medium text-white cursor-pointer">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
