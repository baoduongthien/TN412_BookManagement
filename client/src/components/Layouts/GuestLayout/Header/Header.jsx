
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../../../services/authService.js';

function Header() {

    const currentUser = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser(dispatch, navigate);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Trang chủ</Link>
                    </li>

                    {currentUser?.roles.some((role) => role === 'admin') ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Dashboard</Link>
                        </li>
                    ) : null}

                </ul>

                <div className="navbar-nav">
                    {currentUser ? (
                        <>
                            <span className="navbar-text">Chào {currentUser.username}</span>
                            <Link className="nav-link" onClick={handleLogout}>Đăng xuất</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">Đăng nhập</Link>
                            <Link className="nav-link" to="/register">Đăng ký</Link>
                        </>
                    )}
                </div>

            </div>

        </nav>
    );
}

export default Header;