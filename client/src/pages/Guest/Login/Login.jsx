
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginFailed, loginStart, loginSuccess } from '../../../redux/authSlice.js';
import { toast } from 'react-toastify';

import { loginUser } from '../../../services/authService.js';
import styles from './Login.module.css';
import { toastConfig } from '../../../configs/toastConfig.js';

function Login() {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Tên người dùng không được bỏ trống!'),
            password: Yup.string().required('Mật khẩu không được bỏ trống!'),
        }),
        onSubmit: function (values) {
            const user = {
                username: values.username,
                password: values.password,
            };

            dispatch(loginStart());

            loginUser(user)
                .then((res) => {
                    dispatch(loginSuccess(res));
                    toast.success('Đăng nhập thành công!', toastConfig);
                })
                .catch((error) => {
                    console.log(error);

                    const errorMessage = error?.response?.data?.message;
                    if (errorMessage) {
                        toast.error(errorMessage, toastConfig);
                    }
                    
                    dispatch(loginFailed());
                });
        }
    });

    return (
        <>
            <div className={styles.wrapper}>
                <div className="p-4">
                    <h2 className="text-center">ĐĂNG NHẬP</h2>
                    <span>Bạn chưa có tài khoản?</span>
                    <br />
                    <span className="text-center">Đăng ký tại <Link to="/register">đây</Link></span>
                </div>

                <form className="flex-fill p-2" onSubmit={formik.handleSubmit}>

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

                    <button type="submit" className="btn btn-primary mt-2">Đăng nhập</button>

                </form>
            </div>
        </>
    );
}

export default Login;