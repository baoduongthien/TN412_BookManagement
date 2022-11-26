
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className="container">
                <span className={styles.copyright}>Nhóm 8, TN412 - Xây dựng ứng dụng Web với Java</span>
            </div>
        </div>
    );
}

export default Footer;