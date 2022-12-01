
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes, authRoutes, PrivateRoute, AuthRoute } from './routes';

function App() {

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
