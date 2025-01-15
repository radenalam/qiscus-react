import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen fixed w-full">
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {/* <footer><Navbar /></footer> */}
      </div>
    </div>
  );
};
