
import axiosJWT from "../helpers/axiosJWT.js";

export const getAllAuthors = async() => {
    try {
        const { data } = await axiosJWT.get('/authors');
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const addAuthor = async(body) => {
    try {
        return await axiosJWT.post('/author', body);
    } catch(error) {
        console.log(error);        
    }
}

export const editAuthor = async(id, body) => {
    try {
        return await axiosJWT.put(`/author/${id}`, body);
    } catch(error) {
        console.log(error);        
    }
}

export const deleteAuthor = async(id) => {
    try {
        return await axiosJWT.delete(`/author/${id}`);
    } catch(error) {
        console.log(error);        
    }
}