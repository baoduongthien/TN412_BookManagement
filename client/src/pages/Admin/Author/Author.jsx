
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import authorService from '../../../services/authorService.js';
import { toastConfig } from '../../../configs/toastConfig.js';
import FormModal from '../../../components/FormModal';
import Pagination from '../../../components/Pagination/Pagination.jsx';

function Author() {

    const [authors, setAuthors] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    const [recallAPI, setToRecallAPI] = useState(false);
    const [modalState, setModalState] = useState({
        type: '',
        heading: '',
        content: 'Tên tác giả',
        state: false,
        entity: null,
    });

    // get data
    useEffect(() => {
        (async function getData() {
            try {
                setIsLoading(true);

                const data = await authorService.getAuthors(currentPage);

                setIsLoading(false);
                setTotalPages(() => data.totalPages);
                setAuthors(data.content);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        })();
    }, [recallAPI, currentPage]);

    function showCreateModal() {
        setModalState({
            ...modalState,
            type: 'create',
            heading: 'Thêm tác giả',
            state: true,
            entity: null,
        });
    }

    function showEditModal(e) {
        const author = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'edit',
            heading: 'Sửa tác giả',
            state: true,
            entity: author,
        });
    }

    function showDeleteModal(e) {
        const author = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'delete',
            heading: 'Xóa tác giả',
            state: true,
            entity: author,
        });
    }

    function handleAddAuthor(body) {
        authorService.addAuthor(body)
            .then(() => {
                toast.success('Thêm thành công!', toastConfig);

                setToRecallAPI(!recallAPI);
                setModalState({ ...modalState, state: false });
            })
            .catch(error => {
                toast.error('Thêm thất bại!', toastConfig);
                console.log(error);
            });
    }

    function handleEditAuthor(id, body) {
        authorService.editAuthor(id, body)
            .then(() => {
                toast.success('Sửa thành công!', toastConfig);

                setToRecallAPI(!recallAPI);
                setModalState({ ...modalState, state: false });
            })
            .catch(error => {
                toast.error('Sửa thất bại!', toastConfig);
                console.log(error);
            });
    }

    function handleDeleteAuthor(id) {
        authorService.deleteAuthor(id)
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
            <h1>Tác giả</h1>
            <button className="btn btn-primary" onClick={showCreateModal}>Thêm tác giả</button>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-2">STT</th>
                        <th className="col-8">Tên tác giả</th>
                        <th className="col-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={3} className="text-center">Đang tải dữ liệu...</td>
                        </tr>
                    ) : (
                        <>
                            {authors.length > 0 ? authors.map((author, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + currentPage * 5 + 1}</th>
                                    <td>{author.name}</td>

                                    <td>
                                        <button onClick={(e) => showEditModal(e)} data-id={author.id} data-name={author.name} className="btn btn-outline-primary">Sửa</button>
                                        <button onClick={(e) => showDeleteModal(e)} data-id={author.id} data-name={author.name} className="btn btn-danger" style={{ marginLeft: '4px' }}>Xóa</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="text-center">Không có tác giả</td>
                                </tr>
                            )}
                        </>
                    )}

                </tbody>
            </table>

            {totalPages > 1 && authors.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onFetchNewData={setCurrentPage} />}
            {
                modalState.state &&
                <FormModal callback={{
                    setModalState,
                    handleAdd: handleAddAuthor,
                    handleEdit: handleEditAuthor,
                    handleDelete: handleDeleteAuthor
                }} modalState={modalState} />
            }
        </div>
    );
}

export default Author;