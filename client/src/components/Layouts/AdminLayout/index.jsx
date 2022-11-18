
import Header from './Header';
import Footer from './Footer';

function AdminLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default AdminLayout;