
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { getAllAuthors } from '../../../services/adminAuthorService.js';
import FormModal from './FormModal.jsx';

function AdminAuthor() {

    const [authors, setAuthors] = useState([]);

    const [recallAPI, setToRecallAPI] = useState(false);
    const [modalState, setModalState] = useState({
        type: 'create',
        heading: 'Thêm tác giả',
        state: false,
        author: null,
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

    function showModal() {
        setModalState({
            type: 'create',
            heading: 'Thêm tác giả',
            state: true,
            author: null,
        });
    }

    function handleEdit(e) {
        const author = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            type: 'edit',
            heading: 'Sửa tác giả',
            state: true,
            author,
        });
    }

    function handleDelete(e) {
        const author = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            type: 'delete',
            heading: 'Xóa tác giả',
            state: true,
            author,
        });
    }

    return (
        <div className="wrapper">
            <h1>Tác giả</h1>
            <button className="btn btn-primary" onClick={showModal}>Thêm tác giả</button>
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
                                <button onClick={(e) => handleEdit(e)} data-id={author.id} data-name={author.name} className="btn btn-outline-primary">Sửa</button>
                                <button onClick={(e) => handleDelete(e)} data-id={author.id} data-name={author.name} className="btn btn-danger ml-1">Xóa</button>
                            </td>

                        </tr>

                    ))}
                </tbody>
            </table>

            { modalState.state && <FormModal callback={{setModalState, setToRecallAPI}} state={{modalState, recallAPI}} />}
            <ToastContainer />
        </div>

    );
}

export default AdminAuthor;