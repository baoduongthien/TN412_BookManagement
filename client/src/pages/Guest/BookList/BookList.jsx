
import { useEffect, useState } from "react";

import bookService from "../../../services/bookService";
import BookCard from "./BookCard";
import Pagination from "../../../components/Pagination/Pagination";

function BookList() {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await bookService.getBooks(currentPage);
            setBooks(res);
        })();
    }, [currentPage]);

    return (
        <div className="mt-4">
            <div className="container">

                <div className="row">
                    {books.content?.map((book, index) => index <= 3 && (
                        <div key={index} className="col-3">
                            <BookCard name={book.name} description={book.description} thumbnail={`http://localhost:8080/images/${book.thumbnail}`} />
                        </div>
                    ))}
                </div>

                <div className="row">
                    {books.content?.map((book, index) => index > 3 && (
                        <div key={index} className="col-3">
                            <BookCard name={book.name} description={book.description} thumbnail={`http://localhost:8080/images/${book.thumbnail}`} />
                        </div>
                    ))}
                </div>

                <div className="mt-2">
                    <Pagination currentPage={currentPage} totalPages={books.totalPages} onFetchNewData={setCurrentPage} />
                </div>
            </div>

        </div>
    );
}

export default BookList;