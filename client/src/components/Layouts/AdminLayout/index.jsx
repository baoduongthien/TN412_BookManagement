
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function AdminLayout({ children }) {
    return (
        <>
            <Header />

            <Sidebar />

            <Footer />

        </>
    );
}

export default AdminLayout;