import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useParams
} from "react-router-dom";

import BackButton from "../components/BackButton";

function PetDetails() {

    const { id } = useParams();

    const [pet, setPet] =
        useState(null);

    useEffect(() => {

        loadPet();

    }, []);

    const loadPet = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/pets/${id}`
                );

            setPet(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    if (!pet) {

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );
    }

    return (

        <div className="container py-5">

            <BackButton
                destination="/"
            />

            <div className="card shadow-lg border-0 p-4">

                <div className="row align-items-center">

                    <div className="col-lg-5 text-center">

                        <img
                            src={pet.imageUrl}
                            alt={pet.name}
                            className="img-fluid rounded shadow"
                            style={{
                                width: "100%",
                                maxHeight: "500px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                    <div className="col-lg-7">

                        <h1 className="fw-bold mb-3">
                            {pet.name}
                        </h1>

                        <hr />

                        <div className="row">

                            <div className="col-md-6 mb-3">
                               <strong>Type:</strong> {pet.type}
                            </div>

                            <div className="col-md-6 mb-3">
                               <strong>Breed:</strong> {pet.breed}
                            </div>

                            <div className="col-md-6 mb-3">
                               <strong>Age:</strong> {pet.age} Years
                            </div>

                            <div className="col-md-6 mb-3">
                               <strong>Gender:</strong> {pet.gender}
                            </div>

                            <div className="col-md-6 mb-3">
                               <strong>Status:</strong> {pet.status}
                            </div>

                            <div className="col-md-6 mb-3">
                               <strong>Location:</strong> {pet.location}
                            </div>

                            <div className="col-md-6 mb-3">
                              <strong>Vaccination:</strong>
                              {" "}
                              {pet.vaccination}
                            </div>

                            <div className="col-md-6 mb-3">
                              <strong>Fee:</strong>
                              {" "}
                              ₹{pet.adoptionFee}
                            </div>

                        </div>

                        <div className="mt-3">

                            <h5>Description</h5>

                            <p className="text-muted">
                              {pet.description}
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default PetDetails;