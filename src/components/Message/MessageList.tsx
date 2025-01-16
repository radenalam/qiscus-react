import { User, Users } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RoomData } from "@/lib/roomData";

interface NewMessageListProps extends RoomData {
  currentUser: string;
}

export const MessageList: React.FC<NewMessageListProps> = ({
  roomData,
  currentUser,
}) => {
  const type = roomData.room.is_group === false ? "direct" : "group";
  const lastComment = roomData.comments[roomData.comments.length - 1];
  const senderName = roomData.room.participant.find(
    (p) => p.id === lastComment?.sender
  )?.name;
  const roomName = roomData.room.name;
  const user = roomData.room.participant.find(
    (p) => p.id !== currentUser
  )?.name;

  return (
    <div className="flex items-center gap-2 mx-2">
      <Avatar>
        <AvatarImage src={roomData.room.image_url} />
        <AvatarFallback>
          {type === "group" ? <Users /> : <User />}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1 w-full">
          <div className="font-bold">{type === "group" ? roomName : user}</div>
          <div className={type === "group" ? "h-2/3 items-start" : ""}>
            {type === "group"
              ? `${senderName} : ${lastComment?.message}`
              : lastComment?.message}
          </div>
        </div>
        <div className="flex items-start p-1">11.12</div>
      </div>
    </div>
  );
};
