import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import ComingSoon from "./screens/ComingSoon";
import NowPlaying from "./screens/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "movies/:id",
          },
        ],
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
        children: [
          {
            path: ":id",
          },
        ],
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
        children: [
          {
            path: ":id",
          },
        ],
      },
    ],
  },
]);
