import React from "react";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const location = useLocation(); // Mendapatkan URL saat ini

  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={"flex flex-col items-center gap-1 rounded-md font-bold"}
    >
      <Icon size={30} fill={isActive ? "currentColor" : "none"} />
      <span className="text-xs">{label}</span>
    </Link>
  );
};
