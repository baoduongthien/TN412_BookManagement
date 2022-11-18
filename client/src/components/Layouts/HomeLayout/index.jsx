
import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';

function HomeLayout({ children }) {
    return (
        <div>
            <Header />

            <Container>
                {children}
            </Container>

            <Footer />
        </div>
    );
}

export default HomeLayout;