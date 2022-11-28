
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addCategory, deleteCategory, editCategory, getAllCategories } from '../../../services/adminCategoryService.js';
import FormModal from '../../../components/FormModal';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../configs/toastConfig.js';

function AdminCategory() {

    const [ categories, setCategories] = useState([]);

    const [ recallAPI, setToRecallAPI ] = useState(false);
    const [ modalState, setModalState ] = useState({
        type: '',
        heading: '',
        content: 'Tên danh mục',
        state: false,
        entity: null,
    });

    // get data
    useEffect(() => {
        (async function getData() {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [recallAPI]);

    function showCreateModal() {
        setModalState({
            ...modalState,
            type: 'create',
            heading: 'Thêm danh mục',
            state: true,
            entity: null,
        });
    }

    function showEditModal(e) {
        const category = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'edit',
            heading: 'Sửa danh mục',
            state: true,
            entity: category,
        });
    }

    function showDeleteModal(e) {
        const category = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
        };

        setModalState({
            ...modalState,
            type: 'delete',
            heading: 'Xóa danh mục',
            state: true,
            entity: category,
        });
    }

    function handleAdd(body) {
        addCategory(body)
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
        editCategory(id, body)
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
        deleteCategory(id)
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
            <h1>Danh mục</h1>
            <button className="btn btn-primary" onClick={showCreateModal}>Thêm danh mục</button>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-2">STT</th>
                        <th className="col-8">Tên danh mục</th>
                        <th className="col-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((category, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{category.name}</td>
                            
                            <td>
                                <button onClick={(e) => showEditModal(e)} data-id={category.id} data-name={category.name} className="btn btn-outline-primary">Sửa</button>
                                <button onClick={(e) => showDeleteModal(e)} data-id={category.id} data-name={category.name} className="btn btn-danger" style={{marginLeft: '4px'}}>Xóa</button>
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

export default AdminCategory;