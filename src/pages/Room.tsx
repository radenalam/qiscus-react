import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Paperclip, SendHorizonalIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoomData } from "@/lib/roomData";

interface RoomProps extends RoomData {
  currentUser: string;
  CloseRoom: () => void;
}

export const Room: React.FC<RoomProps> = ({
  roomData,
  currentUser,
  CloseRoom,
}) => {
  const [comments, setComments] = useState(roomData.comments);
  const [newMessage, setNewMessage] = useState<string>("");

  const type = roomData.room.is_group === false ? "direct" : "group";

  const addMessage = (
    message: string,
    type: "text" | "file",
    attachments?: any[]
  ) => {
    const newComment = {
      id: Date.now(),
      type,
      message,
      sender: currentUser,
      attachments: attachments || [],
    };

    setComments((prevComments) => [...prevComments, newComment]);
    console.log(comments);
    setNewMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Buat blob URL untuk file baru
      addMessage("Uploaded a file", "file", [
        {
          id: `${Date.now()}`, // ID unik untuk lampiran
          url: fileURL,
          type: file.type,
        },
      ]);
    }
  };

  const roomImage = roomData.room.image_url;
  const roomName = roomData.room.name;
  const user = roomData.room.participant.find(
    (p) => p.id !== currentUser
  )?.name;
  const whoParticipants = roomData.room.participant
    .map((p) => p.name)
    .join(", ");

  return (
    <div className="flex flex-col h-full bg-primary-foreground">
      {/* Header */}
      <header className="flex items-center p-4 bg-primary-foreground text-secondary-foreground shadow-md border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={roomImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">
                {type === "group" ? roomName : user}
              </h1>
              <p className="text-sm text-secondary-foreground">
                {type === "group" ? whoParticipants : ""}
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
        {comments.map((comment) => (
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
                <div>
                  <p className="text-sm font-bold">
                    {
                      roomData.room.participant.find(
                        (p) => p.id === comment.sender
                      )?.name
                    }
                  </p>
                  <p>{comment.message}</p>
                  <div className="mt-2 space-y-2">
                    {comment.attachments?.map((attachment) => {
                      if (attachment.type.startsWith("image/")) {
                        return (
                          <img
                            key={attachment.id}
                            src={attachment.url}
                            alt="Uploaded Image"
                            className="max-w-full rounded-lg"
                          />
                        );
                      } else if (attachment.type.startsWith("video/")) {
                        return (
                          <video
                            key={attachment.id}
                            src={attachment.url}
                            controls
                            className="max-w-full rounded-lg"
                          />
                        );
                      } else if (attachment.type === "application/pdf") {
                        return (
                          <iframe
                            key={attachment.id}
                            src={attachment.url}
                            title="PDF File"
                            className="w-full h-64 border rounded-lg"
                          />
                        );
                      } else {
                        return (
                          <a
                            key={attachment.id}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View File
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold">
                    {
                      roomData.room.participant.find(
                        (p) => p.id === comment.sender
                      )?.name
                    }
                  </p>
                  <p>{comment.message}</p>
                </div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addMessage(newMessage, "text");
            }
          }}
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
