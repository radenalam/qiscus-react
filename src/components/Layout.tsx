import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <main className="flex-1">
      <Header />
      <Outlet />
      <Navbar />
    </main>
  );
};
