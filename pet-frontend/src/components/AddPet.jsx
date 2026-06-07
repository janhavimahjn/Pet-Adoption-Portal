import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPet() {

    const navigate = useNavigate();

    const [pet, setPet] = useState({
        name: '',
        type: '',
        breed: '',
        age: '',
        gender: '',
        status: '',
        description: '',
        vaccination: '',
        location: '',
        imageUrl: '',
        adoptionFee: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {

        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:8080/pets',
                pet,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage('Pet Added Successfully');

            setPet({
                name: '',
                type: '',
                breed: '',
                age: '',
                gender: '',
                status: '',
                description: '',
                vaccination: '',
                location: '',
                imageUrl: '',
                adoptionFee: ''
            });

            setTimeout(() => {

                navigate('/');

            }, 1500);

        } catch (error) {

            console.log(error);

            setMessage('Failed To Add Pet');
        }
    };

    return (

        <div className="container mt-5">
            <BackButton
            destination="/"
            />
            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-lg border-0 p-4">

                        <h2 className="text-center mb-4">
                            Add New Pet
                        </h2>

                        {message && (

                            <div className="alert alert-info">

                                {message}

                            </div>

                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Pet Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={pet.name}
                                    onChange={handleChange}
                                    placeholder="Enter pet name"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Pet Type
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="type"
                                    value={pet.type}
                                    onChange={handleChange}
                                    placeholder="Dog / Cat / Bird"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Breed
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="breed"
                                    value={pet.breed}
                                    onChange={handleChange}
                                    placeholder="Enter breed"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Age
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={pet.age}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={pet.gender}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                </select>

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={pet.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Status
                                    </option>

                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Adopted">
                                        Adopted
                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={pet.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter pet description"
                                    required
                                />

                            </div>

                           <div className="mb-3">

                                <label className="form-label">
                                    Vaccination Status
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="vaccination"
                                    value={pet.vaccination}
                                    onChange={handleChange}
                                    placeholder="Fully Vaccinated"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={pet.location}
                                    onChange={handleChange}
                                    placeholder="Pune"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Adoption Fee (₹)
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="adoptionFee"
                                    value={pet.adoptionFee}
                                    onChange={handleChange}
                                    placeholder="2500"
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="imageUrl"
                                    value={pet.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/pet.jpg"
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Add Pet
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddPet;