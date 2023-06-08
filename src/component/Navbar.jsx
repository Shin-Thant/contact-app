import React from "react";

import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white p-2 flex items-center justify-around space-x-5 h-14 cursor-pointer me-5">
        <div className="flex items-center space-x-3">
          <img
            className="w-[40px]"
            src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
            alt=""
          />
          <h1 className="text-[#5f6368] text-2xl">Kontacts</h1>
          <div className="space-x-24">
            <input
              type="text"
              placeholder="Search"
              className="xl:w-[600px] w-[200px] p-3 bg-[#3c404314] outline-none rounded-lg px-16 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center">
          <UserMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
