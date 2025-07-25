import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import ScrollToTopButton from "../Components/ScrollToTopButton";

export default function MainLayout({children}) {
    return (
        <>
        <Navigation/>
        {children}
        <ScrollToTopButton />
        <Footer/>
        </>
    );
}
