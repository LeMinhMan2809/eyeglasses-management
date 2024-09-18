import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Product from "../pages/ListingProduct";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ListingProduct from "../pages/ListingProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

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
    ],
  },
]);

export default router;
