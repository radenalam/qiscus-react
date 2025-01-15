import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Paperclip, SendHorizonalIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type RoomProps = {
  roomData: {
    room: {
      name: string;
      id: number;
      image_url: string;
      participant: { id: string; name: string; role: number }[];
    };
    comments: { id: number; type: string; message: string; sender: string }[];
  };
  CloseRoom: () => void;
};

export const Room: React.FC<RoomProps> = ({ roomData, CloseRoom }) => {
  const [comments, setComments] = useState(roomData.comments);
  const [newMessage, setNewMessage] = useState<string>("");

  const addMessage = () => {
    if (newMessage.trim() === "") return;

    const customer = "customer@mail.com"; // Hardcoded sender for example
    const newComment = {
      id: Date.now(), // Unique ID
      type: "text",
      message: newMessage,
      sender: customer,
    };

    setComments([...comments, newComment]);
    setNewMessage(""); // Reset input
  };

  return (
    <div className="flex flex-col h-full bg-primary-foreground">
      {/* Header */}
      <header className="flex items-center p-4 bg-primary-foreground text-secondary-foreground shadow-md border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={roomData.room.image_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">{roomData.room.name}</h1>
              <p className="text-sm text-secondary-foreground">
                {roomData.room.participant.length} Participants
              </p>
            </div>
          </div>
          <button className="p-2 bg-secondary rounded-lg" onClick={CloseRoom}>
            <X size={30} />
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 p-4 overflow-y-auto bg-primary-foreground">
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className={`flex ${
              comment.sender === "customer@mail.com"
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-lg border ${
                comment.sender === "customer@mail.com"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <p className="text-sm">
                <strong>
                  {
                    roomData.room.participant.find(
                      (p: any) => p.id === comment.sender
                    )?.name
                  }
                </strong>
              </p>
              <p>{comment.message}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="flex items-center p-4 bg-primary-foreground border-t shadow-md">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg text-secondary-foreground"
        />
        <button
          onClick={addMessage}
          className="ml-3 p-2 bg-secondary rounded-lg"
        >
          <Paperclip size={24} />
        </button>
        <button
          onClick={addMessage}
          className="ml-3 p-2 bg-secondary rounded-lg"
        >
          <SendHorizonalIcon size={24} />
        </button>
      </footer>
    </div>
  );
};
