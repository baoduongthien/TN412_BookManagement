
import axios from 'axios'

const accessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).login.currentUser?.accessToken;

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 
        withCredentials: true,
        Authorization: `Bearer ${accessToken}`,
    },
})