
import { useEffect, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from "react-redux";

import bookService from "../../../services/bookService";
import BookCard from "./BookCard";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBook from "../../../components/SearchBook/SearchBook";
import { Link } from "react-router-dom";
import styles from './BookList.module.css';

function BookList() {

    const [books, setBooks] = useState([]);
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    
    const cart = useSelector(state => state.cart.detail);

    useEffect(() => {
        (async() => {
            const res = (await bookService.searchBooks(name.trim(), currentPage)).data;
            setBooks(res);
        })();
    }, [name, currentPage]);

    return (
        <div className="mt-4">
            <div className="container">

                <div className="row">
                    <div className="col-6">
                        <SearchBook name={name} setName={setName} setCurrentPage={setCurrentPage}/>
                    </div>
                    <div className="col-6">
                        <div className={styles.bookCart}>
                            <Link to="/cart" className={styles.cart}>
                                <FaShoppingCart size={36} />
                            </Link>
                            {cart.length > 0 && <div className={styles.round}>{cart.length}</div>}
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    {books.content?.map((book, index) => index <= 5 && (
                        <div key={index} className="col-2">
                            <BookCard 
                                id={book.id} 
                                name={book.name} 
                                price={book.price} 
                                thumbnail={`http://localhost:8080/images/${book.thumbnail}`} 
                                cart={cart}
                            />
                        </div>
                    ))}
                </div>

                <div className="row">
                    {books.content?.map((book, index) => index > 5 && (
                        <div key={index} className="col-2">
                            <BookCard 
                                id={book.id} 
                                name={book.name}
                                price={book.price} 
                                thumbnail={`http://localhost:8080/images/${book.thumbnail}`}
                                cart={cart}
                            />
                        </div>
                    ))}
                </div>

                {
                    books?.totalPages > 1 ? (
                        <div className="mt-2">
                            <Pagination currentPage={currentPage} totalPages={books.totalPages} onFetchNewData={setCurrentPage} />
                        </div>
                    ) : null
                }
            </div>

        </div>
    );
}

export default BookList;