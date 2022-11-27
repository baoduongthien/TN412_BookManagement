
import axios from 'axios';

import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";
import { registerFailed, registerStart, registerSuccess } from "../redux/authSlice";
import { logoutFailed, logoutStart, logoutSuccess } from "../redux/authSlice";

const URL_LOGIN = 'http://localhost:8080/api/auth/signin';
const URL_REGISTER = 'http://localhost:8080/api/auth/signup';
const URL_LOGOUT = 'http://localhost:8080/api/auth/logout';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = (await axios.post(URL_LOGIN, user)).data;

        dispatch(loginSuccess(res));

        if (res.roles.some(role => role === 'admin')) {
            navigate('/admin');
        } else {
            navigate('/');
        }
    } catch(error) {
        if (error.code === 'ERR_NETWORK') {
            alert('Server chưa khởi động!');
        } else {
            alert('Tên tài khoản hoặc mật khẩu không chính xác');
        }
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = (await axios.post(URL_REGISTER, user)).data;
        
        alert('Đăng ký thành công!');
        dispatch(registerSuccess(res));

        navigate('/login');
    } catch(error) {
        if (error.code === 'ERR_NETWORK') {
            alert('Server chưa khởi động!');
        } else {
            alert(error.response.data.message);
        }
        dispatch(registerFailed());
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        const message = (await axios.post(URL_LOGOUT)).data;

        dispatch(logoutSuccess(message));

        navigate('/login');
    } catch(error) {
        dispatch(logoutFailed());
    }
}