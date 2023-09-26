import React from "react";

const Sidebar = ({ onPageChange }) => {
  return (
    <div className="h-screen bg-[#262626] w-[8rem] fixed left-0 top-0 flex flex-col items-center justify-between">
      <div className="mt-10">
        <img src="/assets/logo.png" alt="logo" width="50px" />
        <ul className="mt-10">
          <li>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("home")}
            >
              {/* <i className="fas fa-tachometer-alt mr-2"></i> */}
              Home
            </button>
          </li>
          <li>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("menu")}
            >
              {/* <i className="fas fa-shopping-cart mr-2"></i> */}
              Menu
            </button>
          </li>
          <li>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("orders")}
            >
              {/* <i className="fas fa-box mr-2"></i> */}
              Orders
            </button>
          </li>
          <li>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("customers")}
            >
              {/* <i className="fas fa-users mr-2"></i> */}
              Customers
            </button>
          </li>
          <li>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("settings")}
            >
              {/* <i className="fas fa-cog mr-2"></i> */}
              Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <button className="bg-gray-700 text-white rounded-full py-2 px-4 hover:bg-gray-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
