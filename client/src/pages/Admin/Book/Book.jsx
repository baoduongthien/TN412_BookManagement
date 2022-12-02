
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import bookService from '../../../services/bookService.js';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import { Link } from 'react-router-dom';
import FormModal from '../../../components/FormModal/FormModal.jsx';
import { toastConfig } from '../../../configs/toastConfig.js';

function Author() {
   
    const [books, setBooks] = useState([]);

    const [recallAPI, setToRecallAPI] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(-1);
    const [modalState, setModalState] = useState({
        type: '',
        heading: '',
        content: '',
        state: false,
        entity: null,
    });

    // get data
    useEffect(() => {
        (async function getData() {
            try {
                const data = await bookService.getBooks(currentPage);

                setTotalPages(() => data.totalPages);
                setBooks(data.content);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [recallAPI, currentPage]);

    function showDeleteModal(e) {
        const book = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'delete',
            heading: 'Xóa sách',
            state: true,
            entity: book,
        });
    }

    function handleDeleteBook(id) {
        bookService.deleteBook(id)
            .then(() => {
                toast.success('Xóa thành công!', toastConfig);

                setToRecallAPI(!recallAPI);
                setModalState({ ...modalState, state: false });
            })
            .catch(error => {
                toast.error('Xóa thất bại!', toastConfig);
                console.log(error);
            });
    }

    return (
        <div className="wrapper">
            <h1>Sách</h1>
            <Link to={`/admin/book/add`} className="btn btn-primary">Thêm sách</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-2">STT</th>
                        <th className="col-8">Tên sách</th>
                        <th className="col-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? books.map((book, index) => (
                        <tr key={index}>
                            <th scope="row">{index + currentPage * 5 + 1}</th>
                            <td>{book.name}</td>

                            <td>
                                <Link to={`/admin/book/detail/${book.id}`} className="btn btn-outline-primary" style={{ marginLeft: '4px' }}>Chi tiết</Link>
                                <button data-id={book.id} data-name={book.name} onClick={(e) => showDeleteModal(e)} className="btn btn-danger" style={{ marginLeft: '4px' }}>Xóa</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="text-center">Không có sách</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && books.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onFetchNewData={setCurrentPage} />}

            {
                modalState.state &&
                <FormModal callback={{
                    setModalState,
                    handleDelete: handleDeleteBook
                }} modalState={modalState} />
            }
            
        </div>
    );
}

export default Author;