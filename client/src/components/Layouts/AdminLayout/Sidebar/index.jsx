
import { Link } from 'react-router-dom';

function Sidebar() {

    return (
        <nav id="sidebarMenu" className="d-md-block bg-light sidebar collapse" style={{height: '100%'}}>
            <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/admin">
                            Bảng điều khiển
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/authors">
                            Tác giả
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/categories">
                            Danh mục
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/publishers">
                            Nhà xuất bản
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/books">
                            Sách
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>

    );
}

export default Sidebar;