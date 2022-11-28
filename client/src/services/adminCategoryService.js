
import axiosJWT from "../helpers/axiosJWT.js";

export const getAllCategories = async() => {
    const { data } = await axiosJWT.get('/categories');
    return data;
}

export const addCategory = async(body) => {
    return await axiosJWT.post('/category', body);
}

export const editCategory = async(id, body) => {
    return await axiosJWT.put(`/category/${id}`, body);
}

export const deleteCategory = async(id) => {
    return await axiosJWT.delete(`/category/${id}`);
}