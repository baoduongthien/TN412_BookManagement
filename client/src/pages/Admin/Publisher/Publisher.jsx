
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import publisherService from '../../../services/publisherService.js'
import FormModal from '../../../components/FormModal';
import { toastConfig } from '../../../configs/toastConfig.js';

function Publisher() {

    const [publishers, setPublishers] = useState([]);

    const [recallAPI, setToRecallAPI] = useState(false);
    const [modalState, setModalState] = useState({
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
                const data = await publisherService.getAllPublishers();
                setPublishers(data.content);
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
        publisherService.addPublisher(body)
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
        publisherService.editPublisher(id, body)
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
        publisherService.deletePublisher(id)
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
                    {publishers.length > 0 ? publishers.map((publisher, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{publisher.name}</td>

                            <td>
                                <button onClick={(e) => showEditModal(e)} data-id={publisher.id} data-name={publisher.name} className="btn btn-outline-primary">Sửa</button>
                                <button onClick={(e) => showDeleteModal(e)} data-id={publisher.id} data-name={publisher.name} className="btn btn-danger" style={{ marginLeft: '4px' }}>Xóa</button>
                            </td>

                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="text-center">Không có nhà xuất bản</td>
                        </tr>
                    )}
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
        </div>

    );
}

export default Publisher;