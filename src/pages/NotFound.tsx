import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/404_Not_Found.png";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-lg:h-screen flex flex-col justify-center items-center gap-4">
      <img src={logo} className="w-1/2 lg:w-1/3" />
      <Button variant="outline" onClick={() => navigate("/")}>
        Back to Home Page
      </Button>
    </div>
  );
};
