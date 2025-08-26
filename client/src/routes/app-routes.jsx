import React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomeLayout, AuthLayout } from "../components/layout";
import { HomePage, LoginPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            }
        ]

    },
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            }
        ]

    }
]);