
import axiosJWT from "../helpers/axiosJWT.js";

export const getAllPublishers = async() => {
    const { data } = await axiosJWT.get('/publishers');
    return data;
}

export const addPublisher = async(body) => {
    return await axiosJWT.post('/publisher', body);
}

export const editPublisher = async(id, body) => {
    return await axiosJWT.put(`/publisher/${id}`, body);
}

export const deletePublisher = async(id) => {
    return await axiosJWT.delete(`/publisher/${id}`);
}