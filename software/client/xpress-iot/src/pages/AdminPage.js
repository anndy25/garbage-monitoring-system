import React, { useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";

import { Outlet } from "react-router-dom";
import { SocketProvider } from "../contexts/SocketContext";

const AdminPage = () => {
  
  return (
    <SocketProvider>
      <div className="h-screen flex">
        <div className="sticky top-0 left-0 w-1/5 h-screen overflow-x-auto">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-slate-20 min-h-full">
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default AdminPage;
