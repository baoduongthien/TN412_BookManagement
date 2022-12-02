
import styles from './BookCard.module.css';

function BookCard({ name, description, thumbnail }) {
    return (
        <div className={`card ${styles.bookCard}`}>
            <div className={`${styles.cardDivImg}`}>
                <img className={`card-img-top ${styles.image}`} src={thumbnail} alt="book" />
            </div>

            <div className={`card-body`}>
                <h5 className={`card-title ${styles.cardTitle}`}>{name}</h5>
                <p className={`card-text ${styles.cardText}`}>{description}</p>
                <a href="#" className={`btn btn-primary ${styles.btn}`}>Thêm vào giỏ hàng</a>
            </div>
        </div>
    );
}

export default BookCard;