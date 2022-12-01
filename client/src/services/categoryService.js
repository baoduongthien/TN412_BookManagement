
import axiosJWT from "../helpers/axiosJWT.js";

const getCategories = async(currentPage = 0) => {
    const { data } = await axiosJWT.get(`/categories?page=${currentPage}`);
    return data;
}

const getAllCategories = async() => {
    const { data } = await axiosJWT.get('/allCategories');
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
    getCategories,
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
};

export default categoryService;