
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import styles from './Register.module.css';
import { registerUser } from '../../redux/authRequest';

function Register() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
    const [ userNameMessage, setUserNameMessage ] = useState(null);
    const [ passwordMessage, setPasswordMessage ] = useState(null);
    const [ emailMessage, setEmailMessage ] = useState(null);
    const [ confirmPasswordMessage, setConfirmPasswordMessage ] = useState(null);
    
    const passwordRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // validate
    function validateEmail(value) {
        if (!isEmail(value)) {
            setEmailMessage('Email không đúng định dạng!');
        } else {
            setEmailMessage('');
        }
    }
    
    function validateUserName(value) {
        if (!isLength(value, 3, 20)) {
            setUserNameMessage('Tên người dùng phải từ 3 - 20 kí tự!');
        } else {
            setUserNameMessage('');
        }
    }

    function validatePassword(value) {        
        if (!isLength(value, 6, 40)) {
            setPasswordMessage('Mật khẩu phải từ 6 - 40 kí tự!');
        } else {
            setPasswordMessage('');
        }
        
        validateConfirmPassword(confirmPassword);
    }

    function validateConfirmPassword(value) {
        if (passwordRef.current.value !== value) {
            setConfirmPasswordMessage('Mật khẩu xác nhận phải giống ban đầu');
        } else {
            setConfirmPasswordMessage('');
        }
    }

    function isValid() {
        if (emailMessage === '' && userNameMessage === '' && passwordMessage === '' && confirmPasswordMessage === '') {
            return true;
        }
        return false;
    }

    // handle
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!isValid()) {
            validateEmail(email);
            validateUserName(userName);
            validatePassword(password);
            validateConfirmPassword(confirmPassword);
            return;
        }

        const user = {
            username: userName,
            password: password,
            email: email,
            role: [ 'user' ],
        };

        registerUser(user, dispatch, navigate);
    }

    return (
        <div className={styles.wrapper}>
            <div class="p-4">
                <h2 className="text-center">ĐĂNG KÝ</h2>
                <span>Bạn đã có tài khoản?</span>
                <br />
                <span className="text-center">Đăng nhập tại <Link to="/login">đây</Link></span>
            </div>

            <form class="flex-fill p-2" onSubmit={(e) => handleSubmit(e)}>

                <div class="form-group mt-2">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="email"
                        placeholder="Nhập email...."
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value) }} 
                        onBlur={(e) => validateEmail(e.target.value)}
                    />
                    <p class="text-danger">{emailMessage}</p>
                </div>

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
                        ref={passwordRef}
                        onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value) }}
                        onBlur={(e) => validatePassword(e.target.value)}
                    />
                    <p class="text-danger">{passwordMessage}</p>
                </div>

                <div class="form-group mt-2">
                    <label htmlFor="confirm-passowrd">Xác nhận mật khẩu</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="confirm-passowrd" 
                        placeholder="Nhập lại mật khẩu..."
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value) }}
                        onBlur={(e) => validateConfirmPassword(e.target.value)}
                    />
                    <p class="text-danger">{confirmPasswordMessage}</p>
                </div>

                <button type="submit" class="btn btn-primary mt-2">Đăng ký</button>

            </form>
        </div>
    );
}

export default Register;