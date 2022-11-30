
import axiosJWT from "../helpers/axiosJWT.js";

const getAllAuthors = async(currentPage = 0) => {
    const { data } = await axiosJWT.get(`/authors?page=${currentPage}`);
    return data;
}

const addAuthor = async(body) => {
    return await axiosJWT.post('/author', body);
}

const editAuthor = async(id, body) => {
    return await axiosJWT.put(`/author/${id}`, body);
}

const deleteAuthor = async(id) => {
    return await axiosJWT.delete(`/author/${id}`);
}

const authorService = {
    getAllAuthors,
    addAuthor,
    editAuthor,
    deleteAuthor
};

export default authorService;