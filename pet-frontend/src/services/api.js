import axios from 'axios';

const BASE_URL = 'http://localhost:8080/pets';

export const getAllPets = () => {
    return axios.get(BASE_URL);
};

export const addPet = (pet) => {
    return axios.post(BASE_URL, pet);
};