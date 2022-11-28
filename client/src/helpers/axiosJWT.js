
import axios from 'axios'

const JWT_TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).login?.currentUser?.accessToken || '';

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 
        withCredentials: true,
        Authorization: `Bearer ${JWT_TOKEN}` 
    },
})