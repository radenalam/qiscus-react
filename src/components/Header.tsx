import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col bg-secondary px-4 py-2 outline my-2 gap-1">
      <div className="text-3xl px-1 font-extrabold">Chat</div>
      <div className="outline rounded-md px-3 py-1">Search</div>
    </div>
  );
};
