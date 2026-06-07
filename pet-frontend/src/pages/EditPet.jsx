import React,
{
    useEffect,
    useState
}
from "react";

import axios from "axios";

import {
    useParams,
    useNavigate
}
from "react-router-dom";

import BackButton from "../components/BackButton";

function EditPet() {

    const { id } = useParams();

    const navigate =
        useNavigate();

    const [pet, setPet] =
        useState({
            name: "",
            type: "",
            breed: "",
            age: "",
            gender: "",
            status: "",
            description: "",
            vaccination: "",
            location: "",
            imageUrl: "",
            adoptionFee: ""
        });

    useEffect(() => {

        loadPet();

    }, []);

    const loadPet =
    async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/pets/${id}`
                );

            setPet({
                name: response.data.name || "",
                type: response.data.type || "",
                breed: response.data.breed || "",
                age: response.data.age || "",
                gender: response.data.gender || "",
                status: response.data.status || "",
                description: response.data.description || "",
                vaccination: response.data.vaccination || "",
                location: response.data.location || "",
                imageUrl: response.data.imageUrl || "",
                adoptionFee: response.data.adoptionFee || ""
            });

        } catch(error){

            console.log(error);
        }
    };

    const handleChange =
    (e) => {

        setPet({
            ...pet,
            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/pets/${id}`,
                pet
            );

            alert(
                "Pet Updated Successfully"
            );

            navigate(
                "/manage-pets"
            );

        } catch(error){

            console.log(error);

            alert(
                "Failed To Update Pet"
            );
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/manage-pets"
            />

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Edit Pet
                </h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="mb-3">

                        <label>
                            Pet Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={pet.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Type
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="type"
                            value={pet.type}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Breed
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="breed"
                            value={pet.breed}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Age
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={pet.age}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Gender
                        </label>

                        <select
                            className="form-select"
                            name="gender"
                            value={pet.gender}
                            onChange={handleChange}
                        >

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>
                            Status
                        </label>

                        <select
                            className="form-select"
                            name="status"
                            value={pet.status}
                            onChange={handleChange}
                        >

                            <option value="Available">
                                Available
                            </option>

                            <option value="Adopted">
                                Adopted
                            </option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>
                            Description
                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            name="description"
                            value={pet.description || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Vaccination
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="vaccination"
                            value={pet.vaccination || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={pet.location || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Adoption Fee
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="adoptionFee"
                            value={pet.adoptionFee || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Image URL
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="imageUrl"
                            value={pet.imageUrl || ""}
                            onChange={handleChange}
                        />

                    </div>

                    {pet.imageUrl && (

                        <div className="text-center mb-4">

                            <img
                                src={pet.imageUrl}
                                alt="Pet Preview"
                                className="img-fluid rounded"
                                style={{
                                    maxHeight: "250px"
                                }}
                            />

                        </div>

                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Update Pet
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditPet;