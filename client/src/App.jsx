
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes, PrivateRoute } from './routes';

function App() {
  return (
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
                        }></Route>)
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
  );
}

export default App;
