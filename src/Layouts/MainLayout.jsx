import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { Outlet } from "react-router-dom";

export default function MainLayout({children}) {
    return (
        <>
        <Navigation/>
        <Outlet />
        <ScrollToTopButton />
        <Footer/>
        </>
    );
}
