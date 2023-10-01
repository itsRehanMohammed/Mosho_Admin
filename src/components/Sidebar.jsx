import React from "react";
import { toast } from "react-toastify";

const Sidebar = ({ onPageChange }) => {
  const logoutHandeler = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      const response = await fetch("https://mosho.onrender.com/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: localStorage.getItem("refresh_token"),
        }),
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      const data = await response.json();
      toast.success(data.status);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div className="h-screen bg-[#262626] w-[8rem] fixed left-0 top-0 flex flex-col items-center justify-between">
      <div className="mt-10">
        <img src="/assets/logo.png" alt="logo" width="50px" />
        <ul className="mt-10">
          <li>
            <button className="text-gray-400 hover:text-white" onClick={() => onPageChange("home")}>
              {/* <i className="fas fa-tachometer-alt mr-2"></i> */}
              Home
            </button>
          </li>
          <li>
            <button className="text-gray-400 hover:text-white" onClick={() => onPageChange("menu")}>
              {/* <i className="fas fa-shopping-cart mr-2"></i> */}
              Menu
            </button>
          </li>
          <li>
            <button className="text-gray-400 hover:text-white" onClick={() => onPageChange("orders")}>
              {/* <i className="fas fa-box mr-2"></i> */}
              Orders
            </button>
          </li>
          <li>
            <button className="text-gray-400 hover:text-white" onClick={() => onPageChange("customers")}>
              {/* <i className="fas fa-users mr-2"></i> */}
              Users
            </button>
          </li>
          <li>
            <button className="text-gray-400 hover:text-white" onClick={() => onPageChange("settings")}>
              {/* <i className="fas fa-cog mr-2"></i> */}
              Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <button onClick={logoutHandeler} className="bg-gray-700 text-white rounded-full py-2 px-4 hover:bg-gray-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
