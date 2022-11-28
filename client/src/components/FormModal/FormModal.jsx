
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './FormModal.module.css';

function FormModal({ callback, modalState }) {

    const { type, heading, content } = modalState;
    const { handleAdd, handleEdit, handleDelete } = callback;
    const vnType = {
        create: 'Tạo',
        edit: 'Sửa',
        delete: 'Xóa'
    };

    function handleClose(e) {
        e?.preventDefault();
        callback.setModalState({ ...modalState, state: false });
    }

    const formik = useFormik({
        initialValues: {
            name: modalState?.entity?.name || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được bỏ trống!').max(40, 'Tên không được quá 40 ký tự'),
        }),
        onSubmit: function(values) {
            const id = modalState?.entity?.id;

            switch(type) {
                case 'create':
                    handleAdd(values);
                    break;

                case 'edit':
                    handleEdit(id, values);
                    break;

                case 'delete':
                    handleDelete(id);
                    break;

                default:
                    console.log('????');
            }
        }
    });

    return (
        <div className={styles.modal}>
            <div className={styles.modalOverlay} onClick={() => handleClose()}></div>

            <div className={styles.modalBody}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h3 className="text-center">{heading}</h3>
                    <div className="form-group mt-2">
                        <label htmlFor="name">{content}</label>
                        <input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type="text"
                            className="form-control"
                            placeholder={ content + '...' }
                            disabled={ type === 'delete' }
                        />
                        {formik.errors.name && formik.touched.name && <p className="text-danger">{formik.errors.name}</p>}
                    </div>

                    <div className="d-flex justify-content-center mt-2">
                        <input type="submit" className={`btn ${type === 'delete' ? 'btn-danger' : 'btn-primary'}`} value={vnType[type]} />
                        <button className={`btn btn-outline-primary ${styles.ml4}`} onClick={(e) => handleClose(e)}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormModal;