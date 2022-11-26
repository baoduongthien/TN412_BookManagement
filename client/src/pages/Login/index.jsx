
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';

import { loginUser } from '../../redux/authRequest';
import styles from './Login.module.css';

function Login() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ userNameMessage, setUserNameMessage ] = useState(null);
    const [ passwordMessage, setPasswordMessage ] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // validate
    function validateUserName(userName) {
        if (isEmpty(userName)) {
            setUserNameMessage('Tên người dùng không được bỏ trống!');
        } else {
            setUserNameMessage('');
        }
    }

    function validatePassword(password) {
        if (isEmpty(password)) {
            setPasswordMessage('Mật khẩu không được bỏ trống!');
        } else {
            setPasswordMessage('');
        }
    }

    function isValid() {
        if (userNameMessage === '' && passwordMessage === '') {
            return true;
        }
        return false;
    }

    // handle
    function handleSubmit(e) {
        e.preventDefault();

        if (!isValid()) {
            validateUserName(userName);
            validatePassword(password);
            return;
        }

        const user = {
            username: userName,
            password: password,
        };

        loginUser(user, dispatch, navigate);
    }

    return (
        <div className={styles.wrapper}>
            <div class="p-4">
                <h2 className="text-center">ĐĂNG NHẬP</h2>
                <span>Bạn chưa có tài khoản?</span>
                <br />
                <span className="text-center">Đăng ký tại <Link to="/register">đây</Link></span>
            </div>

            <form class="flex-fill p-2" onSubmit={(e) => handleSubmit(e)}>

                <div class="form-group mt-2">
                    <label htmlFor="username">Tên người dùng</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="username"
                        placeholder="Nhập tên người dùng...."
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value); validateUserName(e.target.value) }} 
                        onBlur={(e) => validateUserName(e.target.value)}
                    />
                    <p class="text-danger">{userNameMessage}</p>
                </div>

                <div class="form-group mt-2">
                    <label htmlFor="passowrd">Mật khẩu</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value) }}
                        onBlur={(e) => validatePassword(e.target.value)}
                    />
                    <p class="text-danger">{passwordMessage}</p>
                </div>

                <button type="submit" class="btn btn-primary mt-2">Đăng nhập</button>

            </form>
        </div>
    );
}

    export default Login;