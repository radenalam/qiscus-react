import React from "react";
import { MessageCircle, PhoneCall, Settings } from "lucide-react";
import { NavbarButton } from "./NavbarButton";

const navbarItems = [
  { icon: MessageCircle, label: "Chats", href: "/chats" },
  { icon: PhoneCall, label: "Calls", href: "/calls" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary-foreground bottom-0 w-full py-1 px-8 border-t">
      <ul className="flex flex-row gap-4 w-full justify-between">
        {navbarItems.map((item, index) => (
          <li key={index}>
            <NavbarButton
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
