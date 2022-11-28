
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes, authRoutes, PrivateRoute, AuthRoute } from './routes';
import axiosJWT from './helpers/axiosJWT.js';

function App() {

    const token = useSelector((state) => state.auth.login.currentUser?.accessToken);
    useEffect(() => {
        if (token) {
            axiosJWT.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    return (
        <>
            <ToastContainer />
            <Router>
                <div className="App">
                    <Routes>
                        {
                            publicRoutes.map((route, index) => {
                                const Layout = route.layout;
                                const Page = route.component;

                                return (
                                    <Route key={index} path={route.path} element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }>
                                    </Route>
                                )
                            })
                        }
                        {
                            authRoutes.map((route, index) => {
                                const Layout = route.layout;
                                const Page = route.component;

                                return (
                                    <Route key={index} path={route.path} element={
                                        <AuthRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </AuthRoute>
                                    }>
                                    </Route>
                                );
                            })
                        }
                        {
                            privateRoutes.map((route, index) => {
                                const Layout = route.layout;
                                const Page = route.component;

                                return (
                                    <Route key={index} path={route.path} element={
                                        <PrivateRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }></Route>
                                )
                            })
                        }
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
