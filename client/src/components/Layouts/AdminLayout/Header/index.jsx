
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../../../redux/authRequest';

function Header() {

    const currentUser = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser(dispatch, navigate);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" style={{ marginLeft: '20px' }} to="/">Trang chủ</Link>

            <div className="navbar-nav" style={{ marginLeft: 'auto' }}>
                <span className="navbar-text">Chào {currentUser.username}</span>
                <Link className="nav-link" onClick={handleLogout}>Đăng xuất</Link>
            </div>
        </nav >
    );
}

export default Header;