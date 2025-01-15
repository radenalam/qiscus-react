import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col bg-primary-foreground px-4 p-2 border-b gap-2">
      <div className="flex flex-row justify-between">
        <div className="text-3xl px-1 font-extrabold">Chat</div>
        <ModeToggle />
      </div>
      <Input type="text" placeholder="Search" />
    </header>
  );
};
