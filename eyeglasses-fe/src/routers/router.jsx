import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListingProduct from "../pages/ListingProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

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
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "category/:id",
        element: <ListingProduct />,
      },

      {
        path: "product/:id",
        element: <ProductDetail />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
