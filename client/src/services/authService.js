
import axios from 'axios';

import { logoutSuccess } from "../redux/authSlice";

const URL_LOGIN = 'http://localhost:8080/api/auth/signin';
const URL_REGISTER = 'http://localhost:8080/api/auth/signup';

export const loginUser = async (user) => {
    const { data } = await axios.post(URL_LOGIN, user);
    return data;    
}

export const registerUser = async (user) => {
    const { data } = await axios.post(URL_REGISTER, user);
    return data;
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutSuccess());
    navigate('/login');
}