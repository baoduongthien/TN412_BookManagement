
import axiosJWT from "../helpers/axiosJWT.js";

const getAllCategories = async() => {
    const { data } = await axiosJWT.get('/categories');
    return data;
}

const addCategory = async(body) => {
    return await axiosJWT.post('/category', body);
}

const editCategory = async(id, body) => {
    return await axiosJWT.put(`/category/${id}`, body);
}

const deleteCategory = async(id) => {
    return await axiosJWT.delete(`/category/${id}`);
}

const categoryService = {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
};

export default categoryService;