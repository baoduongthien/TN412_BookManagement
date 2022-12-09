
import Header from './Header';
import Footer from './Footer';

function GuestLayout({ children }) {
    return (
        <>
            <Header />

            <div className="container" style={{minHeight: 'calc(100vh - 100px)'}}>
                {children}
            </div>

            <Footer />
        </>
    );
}

export default GuestLayout;