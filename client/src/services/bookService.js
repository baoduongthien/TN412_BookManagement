
import axiosJWT from "../helpers/axiosJWT.js";

const getBooks = async(currentPage = 0) => {
    const { data } = await axiosJWT.get(`/books?page=${currentPage}`);
    return data;
}

const getAllBooks = async() => {
    const { data } = await axiosJWT.get(`/allBooks`);
    return data;
}

const getBook = async(id) => {
    const { data } = await axiosJWT.get(`/book/${id}`);
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
    return await axiosJWT.put(`/book/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}

const deleteBook = async(id) => {
    return await axiosJWT.delete(`/book/${id}`);
}

const searchBooks = async(name = '', currentPage = 0) => {
    return await axiosJWT.get(`/books/search?name=${name}&page=${currentPage}`);
}

const bookService = {
    getBooks,
    getAllBooks,
    getBook,
    addBook,
    editBook,
    deleteBook,
    searchBooks
};

export default bookService;