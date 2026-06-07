import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllPets,
    deletePet
} from '../services/petService';
import BackButton from '../components/BackButton';

function ManagePets() {

    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    const fetchPets = async () => {

        try {

            const response = await getAllPets();

            setPets(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchPets();

    }, []);

    const handleDelete = async (id) => {

        if (
            window.confirm(
                'Delete this pet?'
            )
        ) {

            try {

                await deletePet(id);

                fetchPets();

            } catch (error) {

                console.log(error);
            }
        }
    };

    return (

        <div className="container mt-5">
            <BackButton
            destination="/admin"
            />
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Manage Pets
                </h2>

                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/add-pet")
                    }
                >
                    + Add New Pet
                </button>

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Location</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {pets.map((pet) => (

                            <tr key={pet.id}>

                                <td>{pet.id}</td>

                                <td>{pet.name}</td>

                                <td>{pet.type}</td>

                                <td>{pet.breed}</td>

                                <td>{pet.age}</td>

                                <td>{pet.gender}</td>

                                <td>{pet.location}</td>

                                <td>₹{pet.adoptionFee}</td>

                                <td>{pet.status}</td>

                                <td>

                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/edit-pet/${pet.id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(pet.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManagePets;