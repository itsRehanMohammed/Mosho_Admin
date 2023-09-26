import React from "react";

const HomeTopData = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-6 mt-2">
      <div className="bg-white shadow rounded-md px-4 py-2">
        <p className="text-gray-400 uppercase text-sm">Total Revenue</p>
        <p className="text-3xl font-bold">$18,294</p>
      </div>
      <div className="bg-white shadow rounded-md px-4 py-2">
        <p className="text-gray-400 uppercase text-sm">Dine-In Orders</p>
        <p className="text-3xl font-bold">568</p>
      </div>
      <div className="bg-white shadow rounded-md px-4 py-2">
        <p className="text-gray-400 uppercase text-sm">Take-Away Orders</p>
        <p className="text-3xl font-bold">287</p>
      </div>
      <div className="bg-white shadow rounded-md px-4 py-2">
        <p className="text-gray-400 uppercase text-sm">Take-Away Orders</p>
        <p className="text-3xl font-bold">287</p>
      </div>
    </div>
  );
};

export default HomeTopData;
