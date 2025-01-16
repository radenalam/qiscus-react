export interface RoomData {
  roomData: {
    room: {
      name: string;
      id: number;
      is_group?: boolean;
      image_url: string;
      participant: { id: string; name: string; role?: number }[];
    };
    comments: {
      id: number;
      type: "text" | "file";
      message: string;
      sender: string;
      attachments?: { id: string; url: string; type: string }[]; // Properti baru
    }[];
  };
}
