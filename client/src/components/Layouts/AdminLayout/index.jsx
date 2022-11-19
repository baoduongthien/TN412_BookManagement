
import Sidebar from './Sidebar';
import Footer from './Footer';

function AdminLayout({ children }) {
    return (
        <div className="d-flex vw-100 vh-100">
            <Sidebar />
            <div className="d-flex flex-column flex-grow-1">
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default AdminLayout;