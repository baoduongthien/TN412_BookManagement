
import { loginFailed, loginStart, loginSuccess } from "./authSlice";
import { registerFailed, registerStart, registerSuccess } from "./authSlice";
import { logoutFailed, logoutStart, logoutSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const URL = 'http://localhost:8080/api/auth/signin';
        const res = await (await fetch(
            URL, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) 
            })
        ).json();

        if (!res.accessToken) {
            alert('Tên tài khoản hoặc mật khẩu không chính xác');
            throw new Error(res.error);
        }

        dispatch(loginSuccess(res));

        navigate('/');
    } catch(error) {
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const URL = 'http://localhost:8080/api/auth/signup';
        const res = await (await fetch(
            URL, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) 
            })
        ).json();

        dispatch(registerSuccess(res));

        navigate('/login');
    } catch(error) {
        dispatch(registerFailed());
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        const URL = 'http://localhost:8080/api/auth/logout';
        const message = await (await fetch(URL, { method: 'POST' })).json();

        dispatch(logoutSuccess(message));

        navigate('/login');
    } catch(error) {
        dispatch(logoutFailed());
    }
}