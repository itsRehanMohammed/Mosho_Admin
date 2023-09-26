import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Orders from "./Pages/Orders";
import Settings from "./Pages/Settings";
import Customers from "./Pages/Customers";
import SidebarBottom from "./components/SidebarBottom";
import Login from "./Pages/Login/Login";

import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [activePage, setActivePage] = useState("");
  const [width, setWidth] = useState("");

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const renderPage = () => {
    if (activePage === "home") {
      return <Home />;
    } else if (activePage === "menu") {
      return <Menu />;
    } else if (activePage === "customers") {
      return <Customers />;
    } else if (activePage === "orders") {
      return <Orders setActivePage={setActivePage} />;
    } else if (activePage === "settings") {
      return <Settings setActivePage={setActivePage} />;
    } else {
      return localStorage.getItem("role") === "admin" ? <Home /> : <Login setActivePage={setActivePage} />;
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  return (
    <>
      {localStorage.getItem("role") === "admin" ? (
        width > 600 ? (
          <div>
            <Sidebar onPageChange={handlePageChange} />
            <div className="ml-[8rem]">
              <Navbar />
              {renderPage()}
            </div>
          </div>
        ) : (
          <div>
            <SidebarBottom onPageChange={handlePageChange} />
            <div>
              <Navbar />
              {renderPage()}
            </div>
          </div>
        )
      ) : (
        <div className="ml-[8rem]">{renderPage()}</div>
      )}

      <ToastContainer />
    </>
  );
};

export default App;
