
import axiosJWT from "../helpers/axiosJWT.js";

const getBooks = async(currentPage = 0) => {
    const { data } = await axiosJWT.get(`/books?page=${currentPage}`);
    return data;
}

const getAllBooks = async() => {
    const { data } = await axiosJWT.get(`/allBooks`);
    return data;
}

const addBook = async(body) => {
    return await axiosJWT.post('/book', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}

const editBook = async(id, body) => {
    return await axiosJWT.put(`/book/${id}`, body);
}

const deleteBook = async(id) => {
    return await axiosJWT.delete(`/book/${id}`);
}

const bookService = {
    getBooks,
    getAllBooks,
    addBook,
    editBook,
    deleteBook
};

export default bookService;