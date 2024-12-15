import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./components/Context/userData.Context";
import { Toaster } from "react-hot-toast";
import CartProvider from "./components/Context/cart.context";
import Cart from "./Pages/Cart/Cart";

import ProductDetailes from "./Pages/ProductDetailes/ProductDetailes";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Orders from "./Pages/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VarityCode from "./components/VarityCode/Varitycode";
import ResetPassword from "./components/ResetPassword/ResetPassword";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },

        {
          path: "orders/:id",
          element: <ProductDetailes />,
        },
        {
          path: "checkout",
          element: <CheckOut />,
        },
        {
          path: "allorders",
          element: <Orders />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "varify-code",
          element: <VarityCode />,
        },
        {
          path: "reset-password",
          element: <ResetPassword/>,
        }
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
          </CartProvider>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
