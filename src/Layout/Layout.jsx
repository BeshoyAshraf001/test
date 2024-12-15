import React from "react";

import { Outlet } from "react-router-dom";

import Footer from "./../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container pt-28 pb-5">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
