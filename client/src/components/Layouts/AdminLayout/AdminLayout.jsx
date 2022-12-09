
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function AdminLayout({ children }) {
    return (
        <>
            <Header />

            <div className="container-fluid" style={{minHeight: 'calc(100vh - 100px)'}}>
                <div className="row" style={{minHeight: 'calc(100vh - 100px)'}}>
                    <div className="col-2 p-0">
                        <Sidebar />
                    </div>
                    <div className="col-8 p-5 flex-fill">
                        {children}
                    </div>
                </div>
            </div>

            <Footer />

        </>
    );
}

export default AdminLayout;