import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const getUser = (id) => {
    return axios.get( `${API_URL}/${id}` );
};

export const updateProfile = (id, user) => {
    return axios.put( `${API_URL}/profile/${id}`, user );
};

export const changePassword = (id, password) => {
    return axios.put( `${API_URL}/change-password/${id}`,
        {newPassword: password}
    );
};

export const getStats = (id) => {
    return axios.get( `${API_URL}/stats/${id}` );
};

export const uploadPhoto = (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(
        `http://localhost:8080/users/upload-photo/${userId}`,
        formData
        
    );
};