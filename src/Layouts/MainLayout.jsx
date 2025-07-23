import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

export default function MainLayout({children}) {
    return (
        <>
        <Navigation/>
        {children}
        <Footer/>
        </>
    );
}
