import axios from 'axios';

const API_URL =
    'http://localhost:8080/favorites';

export const addFavorite = (favorite) => {
    return axios.post( API_URL, favorite );
};

export const getFavorites = (userId) => {
    return axios.get( `${API_URL}/pets/${userId}` );
};

export const removeFavorite = (favoriteId) => {
    return axios.delete( `${API_URL}/${favoriteId}` );
};

export const getFavoriteId = (userId, petId) => {
    return axios.get( `${API_URL}/pets/${userId}/${petId}` );
};