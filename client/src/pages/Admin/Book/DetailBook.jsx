
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FormBook from "./FormBook";
import bookService from '../../../services/bookService';

function DetailBook() {

    const bookId = useParams().id;

    const [ book, setBook ] = useState();

    useEffect(() => {
        (async() => {
            try {
                const res = await bookService.getBook(bookId);
                setBook(res);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [bookId]);

    return (
        <>
            <h1>Chi tiết sách</h1>
            {book && <FormBook type="detail" book={book}/>}
        </>
    );
}

export default DetailBook;