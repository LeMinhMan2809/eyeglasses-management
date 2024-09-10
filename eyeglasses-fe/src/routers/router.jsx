import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Product from "../pages/Product";
import Home from "../pages/Home";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
