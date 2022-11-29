
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { GuestLayout, AdminLayout } from '../components/Layouts';
import Guest from '../pages/Guest';
import Admin from '../pages/Admin';

const publicRoutes = [
    { path: '/', component: Guest.Home, layout: GuestLayout },
];

const authRoutes = [
    { path: '/login', component: Guest.Login, layout: GuestLayout },
    { path: '/register', component: Guest.Register, layout: GuestLayout },
];

const privateRoutes = [
    { path: '/admin', component: Admin.Home, layout: AdminLayout },
    { path: '/admin/authors', component: Admin.Author, layout: AdminLayout },
    { path: '/admin/categories', component: Admin.Category, layout: AdminLayout },
    { path: '/admin/publishers', component: Admin.Publisher, layout: AdminLayout },
];

function AuthRoute({ children}) {
    const currentUser = useSelector(state => state.auth.login.currentUser);
    if (!currentUser) {
        return children;
    }

    const isAdminUser = currentUser.roles.some(role => role === 'admin');
    return isAdminUser ? <Navigate to="/admin" /> : <Navigate to="/" />
}

function PrivateRoute({ children }) {
    const currentUser = useSelector(state => state.auth.login.currentUser);

    let isAuthenticated = false;
    if (currentUser) {
        isAuthenticated = currentUser.roles.some(role => role === 'admin');
    }

    return isAuthenticated ? children : <Navigate to="/" />;
}

export { publicRoutes, privateRoutes, authRoutes, PrivateRoute, AuthRoute };