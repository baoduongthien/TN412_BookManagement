
import Container from 'react-bootstrap/Container';

import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <span className={styles.copyright}>Nhóm 8, TN412 - Xây dựng ứng dụng Web với Java</span>
            </Container>
        </div>
    );
}

export default Footer;