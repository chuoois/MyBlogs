import React from "react"
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./private-route";
import { HomeLayout, AuthLayout, AdminLayout } from "../components/layout";
import { HomePage, LoginPage, DashboardPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        element: <PrivateRoute />, 
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
