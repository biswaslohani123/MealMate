import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext.";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);

  const logout = () => {
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
  };
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm fixed w-full top-0 z-50">
      <div className="flex items-center">
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-cyan-200 transition-colors duration-200"
        >
          <LogOut size={18} />
          <span className="font-medium ">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
