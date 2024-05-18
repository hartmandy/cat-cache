import React from "react";
import { CalendarIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-[#151a22] flex flex-col items-center shadow-md">
      <div className="hidden md:flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:bg-[#2a2f38] p-4 ${isActive ? "bg-[#2a2f38]" : ""}`
          }
        >
          <img src={`/images/logo.png`} alt="placeholder" className="w-8 h-8" />
        </NavLink>
      </div>
      <NavLink
        to="/er-dashboard"
        className={({ isActive }) =>
          `hover:bg-[#2a2f38] p-5 ${isActive ? "bg-[#2a2f38]" : ""}`
        }
      >
        <CalendarIcon className="w-6 h-6 text-slate-100 hover:text-slate-300" />
      </NavLink>
      <NavLink
        to="/patient-list"
        className={({ isActive }) =>
          `hover:bg-[#2a2f38] p-5 ${isActive ? "bg-[#2a2f38]" : ""}`
        }
      >
        <ListBulletIcon className="w-6 h-6 text-slate-100 hover:text-slate-300" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
