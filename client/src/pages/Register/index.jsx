
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import styles from './Register.module.css';
import { registerUser } from '../../redux/authRequest';

function Register() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ validationMsg, setValidationMsg ] = useState({
        userName: [],
        password: [],
        email: [],
        ok: true,
    });
    const role = [ 'user' ];


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
            email: email,
            role: role,
        };
        registerUser(user, dispatch, navigate);
    }

    function isValid() {
        const msg = {
            userName: [],
            password: [],
            email: [],
            ok: true,
        };
        if (!isLength(userName, 3, 20)) {
            msg.userName.push('Tên người dùng phải từ 3 - 20 kí tự');
            msg.ok = false;
        }
        if (!isLength(password, 6, 40)) {
            msg.password.push('Mật khẩu phải từ 6 - 40 kí tự');
            msg.ok = false;
        }
        if (!isEmail(email)) {
            msg.email.push('Email không đúng định dạng');
            msg.ok = false;
        }

        setValidationMsg(msg);
        
        return msg.ok === true;
    }

    return (
        <div className={styles.registerForm}>
            <div>
                <h2 className="text-center">ĐĂNG KÝ</h2>
                <span>Bạn đã có tài khoản?</span>
                <br />
                <span className="text-center">Đăng nhập tại <Link to="/login">đây</Link></span>
            </div>

            <Form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên người dùng</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên người dùng..." value={userName} onChange={e => setUserName(e.target.value)} />
                    {validationMsg?.userName?.map((username, index) => <p key={index} className="text-danger">{username}</p>)}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email..." value={email} onChange={e => setEmail(e.target.value)} />
                    {validationMsg?.email?.map((mail, index) => <p key={index} className="text-danger">{mail}</p>)}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu..." value={password} onChange={e => setPassword(e.target.value)}/>
                    {validationMsg?.password?.map((pass, index) => <p key={index} className="text-danger">{pass}</p>)}
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </div>
    );
}

export default Register;