import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../componemts/Footer";
import { motion } from "motion/react"

const Layout = () => {
  
    return (
        <div
            className="max-w-screen-xl mx-auto "
        >
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;