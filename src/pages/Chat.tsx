import React, { useState } from "react";
import { MessageList } from "@/components/Message/MessageList";
import { Room } from "./Room";
import { results } from "@/lib/const/response.json";
import { Header } from "@/components/Header";

export const Chat: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const handleSelectRoom = (room: any) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex h-screen fixed w-full">
      <div className="flex w-full h-full">
        <div
          className={`bg-primary-foreground border-r overflow-y-auto ${
            selectedRoom ? "hidden lg:block lg:w-1/3" : "w-full lg:w-1/3"
          }`}
        >
          <Header />
          {results.map((result: any) => (
            <div
              key={result.room.id}
              className="cursor-pointer py-2 hover:bg-accent border-b"
              onClick={() => handleSelectRoom(result)}
            >
              <MessageList
                type="group"
                room_name={result.room.name}
                last_text={result.comments[result.comments.length - 1]?.message}
                sender={
                  result.room.participant.find(
                    (p: any) =>
                      p.id ===
                      result.comments[result.comments.length - 1]?.sender
                  )?.name
                }
                image_url={result.room.image_url}
              />
            </div>
          ))}
        </div>

        <div
          className={`flex-1 ${
            selectedRoom ? "w-full lg:w-2/3" : "hidden lg:block"
          }`}
        >
          {selectedRoom ? (
            <Room
              roomData={selectedRoom}
              CloseRoom={() => setSelectedRoom(null)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
