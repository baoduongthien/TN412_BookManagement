
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { HomeLayout, AdminLayout } from '../components/Layouts';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/login', component: Login, layout: HomeLayout },
    { path: '/register', component: Register, layout: HomeLayout },
];

const privateRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
];

function PrivateRoute({ children }) {
    const currentUser = useSelector(state => state.auth.login.currentUser);

    let isAuthenticated = false;
    if (currentUser) {
        isAuthenticated = currentUser.roles.some(role => role === 'ROLE_ADMIN');
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export { publicRoutes, privateRoutes, PrivateRoute };