
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './Sidebar.module.css';
import { logoutUser } from '../../../../redux/authRequest';

function Sidebar() {

    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser(dispatch, navigate);
    }

    return (
    <div className={styles.wrapper}>
        <div>

        </div>
        <div className={styles.navbar}>
            <Link to="/">Trang chủ</Link>
            <Link to="/categories">Danh mục</Link>
            <Link to="/books">Sách</Link>
        </div>
    </div>
    );
}

export default Sidebar;