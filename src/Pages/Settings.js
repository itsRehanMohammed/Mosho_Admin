import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const userData = async () => {
    const response = await fetch("https://mosho.onrender.com/api/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    localStorage.setItem("username", data.name);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
  };
  useEffect(() => {
    userData();
  }, []);
  const [pincode, setPincode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://mosho.onrender.com/api/addpincode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pincode,
      }),
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      setPincode("");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <>
      <div className="flex  justify-center  bg-gray-100">
        <div className="bg-white rounded-lg p-4 flex w-full items-center">
          {/* Avatar Image (Full Width) */}
          <div>
            <img style={{ width: "240px", height: "240px", marginRight: "30px" }} src="./assets/avatar.webp" alt="User Avatar" className="w-300 h-300 rounded-lg" />
          </div>

          {/* Name and Role */}
          <div className="ml-4">
            <h1 className="text-3xl font-semibold">Hi, {localStorage.getItem("username")} </h1>
            <p className="text-gray-500 text-lg">{localStorage.getItem("role")} </p>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Add Serviceable Pin Code</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input onChange={(e) => setPincode(e.target.value)} value={pincode} type="number" id="pincode" name="pincode" className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter Pin Code" />
          </div>
          <div className="mb-6">
            <button type="submit" style={{ backgroundColor: "#ff492f" }} className="w-full px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600">
              Add
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Settings;
