import React from "react";
import Sidebar from "./sidebar.tsx";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;
