
import Header from './Header';
import Footer from './Footer';

function HomeLayout({ children }) {
    return (
        <div className="d-flex flex-column vh-100">
            <Header />

            <div className="flex-grow-1 d-flex">
                {children}
            </div>

            <Footer />
        </div>
    );
}

export default HomeLayout;