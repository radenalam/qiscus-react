import { Users, UsersRound } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type MessageContentProps = {
  type: string;
  room_name: string;
  sender: string;
  last_text: string;
  image_url?: string;
  id?: number;
};

export const MessageContent: React.FC<MessageContentProps> = ({
  type,
  room_name,
  sender,
  last_text,
  image_url,
}) => {
  return (
    <div className="max-h-24">
      {type === "group" ? (
        <div className="flex items-center gap-2 mx-2">
          <Avatar>
            <AvatarImage src={image_url} />
            <AvatarFallback>
              <UsersRound />
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1 w-full">
              <div className="font-bold h-1/3">{room_name}</div>
              <div className="h-2/3 items-start">
                {sender}: {last_text}
              </div>
            </div>
            <div className="flex items-start p-1">11.12</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center h-16 gap-2 mx-2">
          <Avatar>
            <AvatarImage src={image_url} />
            <AvatarFallback>
              <Users />
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full border-b justify-between">
            <div className="flex flex-col gap-1 ">
              <div className="font-bold">{room_name}</div>
              <div className="">{last_text}</div>
            </div>
            <div className="flex items-start p-1">11.12</div>
          </div>
        </div>
      )}
    </div>
  );
};
