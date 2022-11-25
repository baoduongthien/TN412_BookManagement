
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './Header.module.css';
import { logoutUser } from '../../../../redux/authRequest';

function Header() {

    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser(dispatch, navigate);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="w-100">
                    <div className="d-flex justify-content-between w-100">

                        <div className="d-flex">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            { user?.roles.some(role => role === 'admin') ? <Nav.Link as={Link} to="/Admin">Dashboard</Nav.Link> : null }
                        </div>

                        <div className="d-flex">
                            { user ? (
                                <>
                                <p className={styles.navbarUser}>Hi! {user.username}</p>
                                <Nav.Link as={Link} onClick={handleLogout}>Đăng xuất</Nav.Link>
                                </>
                            ) : (
                                <>
                                <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                                <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
                                </>
                            )}
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;