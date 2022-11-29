
import Header from './Header';
import Footer from './Footer';

function GuestLayout({ children }) {
    return (
        <>
            <Header />

            <div className="container">
                {children}
            </div>

            <Footer />
        </>
    );
}

export default GuestLayout;