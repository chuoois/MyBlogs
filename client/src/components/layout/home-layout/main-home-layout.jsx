import React from "react"
import { Outlet } from "react-router-dom";
import { HomeHeader } from "./header-home-layout.jsx"; 
import { HomeFooter } from "./footer-home-layout.jsx";

export const HomeLayout = () => {
    return (
        <div>
            <HomeHeader />
            <Outlet />
            <HomeFooter />
        </div>
    );
};