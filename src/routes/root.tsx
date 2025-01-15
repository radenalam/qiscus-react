import { Layout } from "@/components/Layout/Layout";
import { Chat } from "@/pages/Chat";
import { Setting } from "@/pages/Setting";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/chats",
        element: <Chat />,
      },

      {
        path: "/calls",
        element: <Chat />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
    ],
  },
  // {
  //   path: "/chats/:id",
  //   element: <Room />,
  // },
];
