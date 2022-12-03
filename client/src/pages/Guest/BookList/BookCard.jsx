
import { useDispatch } from 'react-redux';
import { changeCart } from '../../../redux/cartSlice';
import styles from './BookCard.module.css';

function BookCard({ id, name, price, thumbnail, cart }) {

    const dispatch = useDispatch();

    function handleAddToCart() {

        const hasBook = cart.some(book => book.id === id);
        if (hasBook) {
            const newCart = cart.map(book => book.id === id ? { ...book, quantity: book.quantity + 1 } : book );

            dispatch(changeCart(newCart));
        } else {
            dispatch(changeCart([
                ...cart,
                {
                    id,
                    name,
                    thumbnail,
                    price,
                    quantity: 1
                }
            ]));
            
        }
    }

    return (
        <div className={`card ${styles.bookCard}`}>
            <div className={`${styles.cardDivImg}`}>
                <img className={`card-img-top ${styles.image}`} src={thumbnail} alt="book" />
            </div>

            <div className={`card-body`}>
                <h5 className={`card-title ${styles.cardTitle}`}>{name}</h5>
                <p className={`card-text ${styles.cardText}`}>{price} VNĐ</p>
                <button className={`btn btn-primary ${styles.btn}`} onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}

export default BookCard;