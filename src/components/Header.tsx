import React from "react";
import { ModeToggle } from "./mode-toggle";
import { useLocation } from "react-router-dom";
import { Input } from "./ui/input";

const formatPathName = (path: string) => {
  return path
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const Header: React.FC = () => {
  const location = useLocation();
  const formattedPathName = formatPathName(location.pathname);

  return (
    <header className="flex flex-col bg-primary-foreground px-4 p-2 border-b gap-2">
      <div className="flex flex-row justify-between">
        <div className="text-3xl px-1 font-extrabold">{formattedPathName}</div>
        <ModeToggle />
      </div>
      {/* <div className="outline rounded-md px-2 py-1">Search</div> */}
      <Input type="text" placeholder="Search" />
    </header>
  );
};
