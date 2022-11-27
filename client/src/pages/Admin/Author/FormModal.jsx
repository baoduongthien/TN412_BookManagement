
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Modal.module.css';
import { addAuthor, editAuthor, deleteAuthor } from '../../../services/adminAuthorService';

function FormModal({ callback, state }) {

    const formik = useFormik({
        initialValues: {
            name: state.modalState?.author?.name || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên tác giả không được bỏ trống!').max(40, 'Tên tác giả không được quá 40 ký tự'),
        }),
        onSubmit: function (values) {

            if (state.modalState.type === 'create') {
                const body = {
                    name: values.name,
                };

                addAuthor(body)
                    .then(() => {

                        toast.success('Thêm tác giả thành công', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        callback.setToRecallAPI(!state.recallAPI);
                        callback.setModalState({ ...state.modalState, state: false });
                    })
                    .catch(error => console.log(error));
            } else if (state.modalState.type === 'edit') {
                const id = state.modalState.author.id;
                const body = {
                    name: values.name,
                };

                editAuthor(id, body)
                    .then(() => {

                        toast.success('Sửa tác giả thành công', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        callback.setToRecallAPI(!state.recallAPI);
                        callback.setModalState({ ...state.modalState, state: false });
                    })
                    .catch(error => console.log(error));
            } else if (state.modalState.type === 'delete') {
                const id = state.modalState.author.id;
                deleteAuthor(id)
                    .then(() => {
                        toast.success('Xóa tác giả thành công', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        callback.setToRecallAPI(!state.recallAPI);
                        callback.setModalState({ ...state.modalState, state: false });
                    })
                    .catch();
            }

            formik.values.name = '';
        }
    });

    return (
        <div className={styles.modal}>
            <div className={styles.modalOverlay} onClick={() => callback.setModalState({ ...state.modalState, state: false })}></div>

            <div className={styles.modalBody}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h3 className="text-center">{state.modalState.heading}</h3>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Tên tác giả</label>
                        <input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type="text"
                            className="form-control"
                            placeholder="Tên tác giả..."
                            disabled={ state.modalState.type === 'delete' ? 'true' : false }
                        />
                        {formik.errors.name && formik.touched.name && <p className="text-danger">{formik.errors.name}</p>}
                    </div>

                    <input type="submit" className='btn btn-primary mt-2' value={state.modalState === 'create' ? 'Thêm' : 'Đồng ý'} />
                    <button className="btn btn-outline-primary" onClick={(e) => { e.preventDefault(); callback.setModalState({ ...state.modalState, state: false }); }}>Hủy</button>
                </form>
            </div>

        </div>
    );
}

export default FormModal;