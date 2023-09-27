import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = ({ setActivePage }) => {
  const [restaurantAvailable, setRestaurantAvailable] = useState(true);
  const [restaurantOpen, setRestaurantOpen] = useState(true);
  const [pincodeDB, setPincodeDB] = useState();
  const userData = async () => {
    const response = await fetch("https://mosho.onrender.com/api/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    localStorage.setItem("username", data.name);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
  };
  const fetchSettings = async () => {
    const response = await fetch("https://mosho.onrender.com/api/getSettings");
    const data = await response.json();
    setRestaurantAvailable(data.restaurantAvailable);
    setRestaurantOpen(data.restaurantAvailable);

    setPincodeDB(data.pincodes);
  };
  useEffect(() => {
    userData();
    fetchSettings();
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
      setActivePage("menu");
      setTimeout(() => {
        setActivePage("settings");
      }, 1);
    } else {
      toast.error(data.message);
    }
  };
  const handleDeletePincode = async (index) => {
    // Send a DELETE request to delete the pincode by index
    const response = await fetch(
      "https://mosho.onrender.com/api/deletepincode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index,
        }),
      }
    );
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      // Fetch updated pincodes after deletion
      fetchSettings();
      setActivePage("menu");
      setTimeout(() => {
        setActivePage("settings");
      }, 1);
    } else {
      toast.error(data.message);
    }
  };
  const handleRestaurant = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ restaurantAvailable: restaurantAvailable }),
    };
    const response = await fetch(
      "https://mosho.onrender.com/api/updatesettings",
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      setRestaurantOpen(data.restaurantAvailable);
      setActivePage("menu");
      setTimeout(() => {
        setActivePage("settings");
      }, 1);
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
            <img
              style={{ width: "240px", height: "240px", marginRight: "30px" }}
              src="./assets/avatar.webp"
              alt="User Avatar"
              className="w-300 h-300 rounded-lg"
            />
          </div>

          {/* Name and Role */}
          <div className="ml-4">
            <h1 className="text-3xl font-semibold">
              Hi, {localStorage.getItem("username")}{" "}
            </h1>
            <p className="text-gray-500 text-lg">
              {localStorage.getItem("role")}{" "}
            </p>
            <p className="text-gray-500 text-lg font-semibold">
              {restaurantOpen ? "Restaurant is Open" : " Restaurant is Close"}{" "}
            </p>
            <button
              onClick={() => setRestaurantAvailable(false)}
              type="button"
              style={{ backgroundColor: "#ff492f" }}
              className="mr-3 my-4 px-2 py-3 text-white rounded-lg  focus:outline-none focus:ring"
            >
              Close Restaurant
            </button>
            <button
              onClick={() => setRestaurantAvailable(true)}
              type="button"
              className="mr-3 my-4 px-2 py-3 text-white bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
            >
              Open Restaurant
            </button>
            <button
              onClick={handleRestaurant}
              type="button"
              className="mr-3 my-4 px-2 py-3 text-white bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Add Serviceable Pin Code
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
              type="number"
              id="pincode"
              name="pincode"
              className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Pin Code"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              style={{ backgroundColor: "#ff492f" }}
              className="w-full px-4 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div
        style={{ position: "absolute", right: "0px", top: "10%" }}
        className="h-screen w-96 border rounded-lg shadow-lg -my-4 ml-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-5">
          Serviceable Pincodes
        </h1>
        <div className="space-y-2">
          {pincodeDB
            ? pincodeDB.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-around items-center mb-3"
                >
                  <h3 className="text-lg font-bold ">code: {item}</h3>
                  <button
                    style={{
                      backgroundColor: "#ff492f",
                      color: "#fff",
                      padding: "4px 10px",
                    }}
                    onClick={() => handleDeletePincode(index)}
                    className="text-white-800 hover:text-red-900 cursor-pointer"
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Settings;
