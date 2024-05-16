import React from "react";
import { MagnifyingGlassIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-white flex flex-col items-center p-2 shadow-lg">
      <div className="w-10 h-10 mb-4">
        <img
          src={`/images/logo.jpg`}
          alt="placeholder"
          className="w-full h-full object-cover my-4"
        />
      </div>
      <div className="mt-16">
        <Link to="/patient-list">
          <MagnifyingGlassIcon className="w-6 h-6 mb-8 text-gray-600" />
        </Link>
        <Link to="/er-dashboard">
          <CalendarIcon className="w-6 h-6 text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
