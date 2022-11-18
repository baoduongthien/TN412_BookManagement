
import { HomeLayout, AdminLayout } from '../components/Layouts';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/login', component: Login, layout: HomeLayout },
    { path: '/register', component: Register, layout: HomeLayout },
    // { path: '/admin', component: Register, layout: AdminLayout },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };