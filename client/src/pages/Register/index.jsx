
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Register.module.css';
import { registerUser } from '../../redux/apiRequest';

function Register() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const role = [ 'user' ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        const user = {
            username: userName,
            password: password,
            email: email,
            role: role,
        };

        registerUser(user, dispatch, navigate);
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
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email..." value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu..." value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </div>
    );
}

export default Register;