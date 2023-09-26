import React from "react";

const Navbar = () => {
  return (
    <nav className="px-3 py-2 bg-gray-100 flex flex-row items-center justify-between">
      <div className="md:text-[30px] text-[16px] font-bold text-[#262626]">The Mosho</div>
      <div className="shadow rounded p-1 md:w-[330px] w-[200px]">
        <input
          type="search"
          name="search-items"
          placeholder="Search from wide range of menu..."
          className="md:w-[300px] w-[180px]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
