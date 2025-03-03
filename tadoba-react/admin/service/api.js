import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hotel'; // Backend URL

export const getAllHotels = async () => {
    return await axios.get(`${API_URL}/hotel-packages`);
};

export const createHotel = async (data) => {
    return await axios.post(`${API_URL}/hotel-packages`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const deleteHotel = async (id) => {
    return await axios.delete(`${API_URL}/hotel-packages/${id}`);
};

export const updateHotel = async (id, data) => {
    return await axios.put(`${API_URL}/hotel-packages/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const getAllHotelsForDropdown = async () => {
    return await axios.get(`${API_URL}/hotels-dropdown`);
};
export const getHotelPackageById = async (id) => {
    return await axios.get(`${API_URL}/hotel-packages/${id}`);
};
