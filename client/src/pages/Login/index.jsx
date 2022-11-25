
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import isEmpty from 'validator/lib/isEmpty';

import styles from './Login.module.css';
import { loginUser } from '../../redux/authRequest';

function Login() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validationMsg, setValidationMsg ] = useState({
        userName: [],
        password: [],
        ok: true,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!isValid()) {
            return;
        }
        
        const user = {
            username: userName,
            password: password,
        };
        loginUser(user, dispatch, navigate);
    }

    function isValid() {
        const msg = {
            userName: [],
            password: [],
            ok: true,
        };
        if (isEmpty(userName)) {
            msg.userName.push('Tên người dùng không được bỏ trống');
            msg.ok = false;
        }
        if (isEmpty(password)) {
            msg.password.push('Mật khẩu không được bỏ trống');
            msg.ok = false;
        }

        setValidationMsg(msg);
        
        return msg.ok === true;
    }

    return (
        <div className={styles.loginForm}>
            <div>
                <h2 className="text-center">ĐĂNG NHẬP</h2>
                <span>Bạn chưa có tài khoản?</span>
                <br />
                <span className="text-center">Đăng ký tại <Link to="/register">đây</Link></span>
            </div>

            <Form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên đăng nhập..."
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    ></Form.Control>
                    {validationMsg?.userName?.map((username, index) => <p key={index} className="text-danger">{username}</p>)}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu..." 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                    {validationMsg?.password?.map((pass, index) => <p key={index} className="text-danger">{pass}</p>)}
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;