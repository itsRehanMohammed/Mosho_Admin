import React from "react";

const SidebarBottom = ({ onPageChange }) => {
  return (
    <>
      <div className="w-screen h-[4rem] bg-[#262626] fixed bottom-0 flex flex-row items-center justify-between z-10 px-2 py-1">
        <img src="/assets/logo.png" alt="logo" width="50px" />
        <ul className="flex flex-row items-center justify-between overflow-x-scroll mx-5">
          <li className="ml-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("home")}
            >
              {/* <i className="fas fa-tachometer-alt mr-2"></i> */}
              Home
            </button>
          </li>
          <li className="ml-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("menu")}
            >
              {/* <i className="fas fa-shopping-cart mr-2"></i> */}
              Menu
            </button>
          </li>
          <li className="ml-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("orders")}
            >
              {/* <i className="fas fa-box mr-2"></i> */}
              Orders
            </button>
          </li>
          <li className="ml-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("customers")}
            >
              {/* <i className="fas fa-users mr-2"></i> */}
              Customers
            </button>
          </li>
          <li className="ml-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => onPageChange("settings")}
            >
              {/* <i className="fas fa-cog mr-2"></i> */}
              Settings
            </button>
          </li>
        </ul>
        <div className="">
          <button className="bg-gray-700 text-white rounded-full py-2 px-4 hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarBottom;
