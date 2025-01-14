import { MessageCircle, PhoneCall, Settings } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary-foreground p-2 fixed bottom-0 w-full px-8 outline">
      <ul className="flex flex-row gap-4 w-full justify-between">
        <li className="flex flex-col items-center gap-1">
          <MessageCircle size={30} />
          <Label htmlFor="chat">Chats</Label>
        </li>
        <li className="flex flex-col items-center gap-1">
          <PhoneCall size={30} />
          <Label htmlFor="calls">Calls</Label>
        </li>
        <li className="flex flex-col items-center gap-1">
          <Settings size={30} />
          <Label htmlFor="settings">Settings</Label>
        </li>
      </ul>
    </nav>
  );
};
