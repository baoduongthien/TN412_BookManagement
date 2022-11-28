
import axiosJWT from "../helpers/axiosJWT.js";

export const getAllAuthors = async() => {
    const { data } = await axiosJWT.get('/authors');
    return data;
}

export const addAuthor = async(body) => {
    return await axiosJWT.post('/author', body);
}

export const editAuthor = async(id, body) => {
    return await axiosJWT.put(`/author/${id}`, body);
}

export const deleteAuthor = async(id) => {
    return await axiosJWT.delete(`/author/${id}`);
}