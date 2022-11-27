
import styles from './Modal.module.css';

function Modal(props) {

    return (
        <div className={styles.modal}>
            <div className={styles.modalOverlay} onClick={() => props.setModalState(false)}></div>

            <div className={styles.modalBody}>
                <form className={styles.form} onSubmit={(e) => props.handleAddAuthor(e)}>
                    <h3 className="text-center">Thêm {props.data.heading}</h3>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Tên {props.data.heading}</label>
                        <input id="name" type="text" className="form-control" placeholder={`Tên ${props.data.heading}...`} />
                    </div>

                    <input type="submit" className='btn btn-primary mt-2' value="Thêm" />
                </form>
            </div>
        </div>
    );
}

export default Modal;