
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { HomeLayout, AdminLayout } from '../components/Layouts';

import Home from '../pages/Guest/Home';

import Admin from '../pages/Admin';
import AdminAuthor from '../pages/Admin/Author';
import AdminCategory from '../pages/Admin/Category';
import AdminPublisher from '../pages/Admin/Publisher/Publisher';

import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/login', component: Login, layout: HomeLayout },
    { path: '/register', component: Register, layout: HomeLayout },
];

const privateRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/authors', component: AdminAuthor, layout: AdminLayout },
    { path: '/admin/categories', component: AdminCategory, layout: AdminLayout },
    { path: '/admin/publishers', component: AdminPublisher, layout: AdminLayout },
];

function PrivateRoute({ children }) {
    const currentUser = useSelector(state => state.auth.login.currentUser);

    let isAuthenticated = false;
    if (currentUser) {
        isAuthenticated = currentUser.roles.some(role => role === 'admin');
    }

    return isAuthenticated ? children : <Navigate to="/" />;
}

export { publicRoutes, privateRoutes, PrivateRoute };