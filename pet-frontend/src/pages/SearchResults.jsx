import React,
{
    useEffect,
    useState
}
from "react";

import axios from "axios";

import {
    useLocation
}
from "react-router-dom";

import PetCard from "../components/PetCard";

import BackButton from "../components/BackButton";

function SearchResults() {

    const [pets,setPets] =
        useState([]);

    const location =
        useLocation();

    const params =
        new URLSearchParams(
            location.search
        );

    const keyword =
        params.get("keyword") || "";

    useEffect(() => {

        loadPets();

    }, []);

    const loadPets =
    async () => {

        try {

            const response =
            await axios.get(
                `http://localhost:8080/pets/search?keyword=${keyword}`
            );

            setPets(
                response.data
            );

        } catch(error){

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/"
            />

            <h2 className="text-center mb-4">
                Search Results
            </h2>

            {pets.length === 0 ? (

                <div className="alert alert-warning text-center">

                    No Pets Available

                </div>

            ) : (

                <div className="row g-4">

                    {pets.map((pet)=>(

                        <div
                            key={pet.id}
                            className="col-md-4"
                        >

                            <PetCard
                                pet={pet}
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default SearchResults;