import React from "react";
import { CalendarIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-white flex flex-col items-center shadow-md">
      <div className="w-10 h-10 p-2 mb-4 hidden md:block">
        <Link to="/">
          <img
            src={`/images/logo.png`}
            alt="placeholder"
            className="w-full h-full object-cover my-4"
          />
        </Link>
      </div>
      <div className="pt-10">
        <Link to="/patient-list">
          <ListBulletIcon className="w-6 h-6 mb-8 text-gray-600" />
        </Link>
        <Link to="/er-dashboard">
          <CalendarIcon className="w-6 h-6 text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
