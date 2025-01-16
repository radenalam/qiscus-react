import { Chat } from "@/pages/Chat";
import { NotFound } from "@/pages/NotFound";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
