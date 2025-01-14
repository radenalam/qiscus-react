import { Layout } from "@/components/Layout";
import { Chat } from "@/pages/Chat";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/messages",
        element: <Chat />,
      },
    ],
  },
];
