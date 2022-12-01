
import axiosJWT from "../helpers/axiosJWT.js";

const getPublishers = async(currentPage = 0) => {
    const { data } = await axiosJWT.get(`/publishers?page=${currentPage}`);
    return data;
}

const getAllPublishers = async() => {
    const { data } = await axiosJWT.get('/allPublishers');
    return data;
}

const addPublisher = async(body) => {
    return await axiosJWT.post('/publisher', body);
}

const editPublisher = async(id, body) => {
    return await axiosJWT.put(`/publisher/${id}`, body);
}

const deletePublisher = async(id) => {
    return await axiosJWT.delete(`/publisher/${id}`);
}

const publisherService = {
    getPublishers,
    getAllPublishers,
    addPublisher,
    editPublisher,
    deletePublisher
};

export default publisherService;