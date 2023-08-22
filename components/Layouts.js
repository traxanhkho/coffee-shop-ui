import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layouts({ children }) {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      {children}
      <Footer />
    </div>
  );
}

export default Layouts;
