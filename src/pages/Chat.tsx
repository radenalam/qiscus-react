import { Message } from "@/components/Message";

export const Chat: React.FC = () => {
  return (
    <div className="flex flex-col gap">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};
