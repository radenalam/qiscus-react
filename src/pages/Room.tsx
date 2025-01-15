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

  const currentUser = "customer@mail.com";

  const addMessage = (message: string, type: "text" | "file") => {
    if (message.trim() === "") return;
    const newComment = {
      id: Date.now(),
      type: type,
      message: message,
      sender: currentUser,
    };

    setComments([...comments, newComment]);
    setNewMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      addMessage(JSON.stringify({ fileURL, type: file.type }), "file");
    }
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
              comment.sender === currentUser ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-lg border ${
                comment.sender === currentUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {comment.type === "file" ? (
                (() => {
                  const { fileURL, type } = JSON.parse(comment.message);
                  if (type.startsWith("image/")) {
                    return (
                      <img
                        src={fileURL}
                        alt="Uploaded"
                        className="max-w-full rounded-lg"
                      />
                    );
                  } else if (type.startsWith("video/")) {
                    return (
                      <video
                        src={fileURL}
                        controls
                        className="max-w-full rounded-lg"
                      />
                    );
                  } else if (type === "application/pdf") {
                    return (
                      <iframe
                        src={fileURL}
                        title="PDF File"
                        className="w-full h-64 border rounded-lg"
                      />
                    );
                  } else {
                    return (
                      <a
                        href={fileURL}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    );
                  }
                })()
              ) : (
                <>
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
                </>
              )}
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
        <label className="ml-3 p-2 bg-secondary rounded-lg cursor-pointer">
          <Paperclip size={24} />
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        <button
          onClick={() => addMessage(newMessage, "text")}
          className="ml-3 p-2 bg-secondary rounded-lg"
        >
          <SendHorizonalIcon size={24} />
        </button>
      </footer>
    </div>
  );
};
