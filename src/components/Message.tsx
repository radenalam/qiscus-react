import { Circle } from "lucide-react";
import React from "react";

export const Message: React.FC = () => {
  return (
    <div className="flex w-full border-b-2 h-16 items-center gap-4 px-3">
      <Circle size={50} />
      <div>
        <div className="font-bold">Name</div>
        <div>Lorem ipsum dolor, sit amet ...</div>
      </div>
    </div>
  );
};
