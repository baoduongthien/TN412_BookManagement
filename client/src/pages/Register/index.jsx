
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './Register.module.css';
import { registerUser } from '../../redux/authRequest';

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.auth.login.currentUser);

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
            username: Yup.string().required('Tên người dùng không được bỏ trống!').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
            password: Yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Tối thiểu 6 ký tự').max(40, 'Tối đa 40 ký tự'),
            confirmPassword: Yup.string().required('Xác nhận mật khẩu không được bỏ trống!').oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không khớp'),
        }),
        onSubmit: function(values) {
            const user = {
                username: values.username,
                password: values.password,
                email: values.email,
                role: ['user'],
            };
    
            registerUser(user, dispatch, navigate);
        }
    });

    return (
        <>
            {currentUser ? <Navigate to="/" /> : (
                <div className={styles.wrapper}>
                    <div className="p-4">
                        <h2 className="text-center">ĐĂNG KÝ</h2>
                        <span>Bạn đã có tài khoản?</span>
                        <br />
                        <span className="text-center">Đăng nhập tại <Link to="/login">đây</Link></span>
                    </div>

                    <form className="flex-fill p-2" onSubmit={formik.handleSubmit}>

                        <div className="form-group mt-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Nhập email...."
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="username">Tên người dùng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Nhập tên người dùng...."
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.username && formik.touched.username && <p className="text-danger">{formik.errors.username}</p>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="passowrd">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu..."
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu..."
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword &&<p className="text-danger">{formik.errors.confirmPassword}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary mt-2">Đăng ký</button>

                    </form>
                </div>
            )}
        </>
    );
}

export default Register;