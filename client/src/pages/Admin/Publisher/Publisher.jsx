
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addPublisher, editPublisher, deletePublisher, getAllPublishers } from '../../../services/adminPublisherService.js'
import FormModal from '../../../components/FormModal';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../configs/toastConfig.js';

function AdminPublisher() {

    const [ publishers, setPublishers] = useState([]);

    const [ recallAPI, setToRecallAPI ] = useState(false);
    const [ modalState, setModalState ] = useState({
        type: '',
        heading: '',
        content: 'Tên nhà xuất bản',
        state: false,
        entity: null,
    });

    // get data
    useEffect(() => {
        (async function getData() {
            try {
                const data = await getAllPublishers();
                setPublishers(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [recallAPI]);

    function showCreateModal() {
        setModalState({
            ...modalState,
            type: 'create',
            heading: 'Thêm nhà xuất bản',
            state: true,
            entity: null,
        });
    }

    function showEditModal(e) {
        const publisher = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'edit',
            heading: 'Sửa nhà xuất bản',
            state: true,
            entity: publisher,
        });
    }

    function showDeleteModal(e) {
        const publisher = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'delete',
            heading: 'Xóa nhà xuất bản',
            state: true,
            entity: publisher,
        });
    }

    function handleAdd(body) {
        addPublisher(body)
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

    function handleEdit(id, body) {
        editPublisher(id, body)
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

    function handleDelete(id) {
        deletePublisher(id)
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
            <h1>Nhà xuất bản</h1>
            <button className="btn btn-primary" onClick={showCreateModal}>Thêm nhà xuất bản</button>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-2">STT</th>
                        <th className="col-8">Tên nhà xuất bản</th>
                        <th className="col-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers?.map((publisher, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{publisher.name}</td>
                            
                            <td>
                                <button onClick={(e) => showEditModal(e)} data-id={publisher.id} data-name={publisher.name} className="btn btn-outline-primary">Sửa</button>
                                <button onClick={(e) => showDeleteModal(e)} data-id={publisher.id} data-name={publisher.name} className="btn btn-danger" style={{marginLeft: '4px'}}>Xóa</button>
                            </td>

                        </tr>

                    ))}
                </tbody>
            </table>

            {
                modalState.state &&
                <FormModal callback={{
                    setModalState, 
                    handleAdd,
                    handleEdit,
                    handleDelete
                }} modalState={modalState} />
            }
            <ToastContainer />
        </div>

    );
}

export default AdminPublisher;