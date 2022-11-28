
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getAllAuthors } from '../../../services/adminAuthorService.js';
import { addAuthor, editAuthor, deleteAuthor } from '../../../services/adminAuthorService.js';
import { toastConfig } from '../../../configs/toastConfig.js';
import FormModal from '../../../components/FormModal';

function AdminAuthor() {

    const [authors, setAuthors] = useState([]);

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
                const data = await getAllAuthors();
                setAuthors(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [recallAPI]);

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
        addAuthor(body)
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
        editAuthor(id, body)
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
        deleteAuthor(id)
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
                    {authors?.map((author, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{author.name}</td>
                            
                            <td>
                                <button onClick={(e) => showEditModal(e)} data-id={author.id} data-name={author.name} className="btn btn-outline-primary">Sửa</button>
                                <button onClick={(e) => showDeleteModal(e)} data-id={author.id} data-name={author.name} className="btn btn-danger" style={{marginLeft: '4px'}}>Xóa</button>
                            </td>

                        </tr>

                    ))}
                </tbody>
            </table>

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

export default AdminAuthor;