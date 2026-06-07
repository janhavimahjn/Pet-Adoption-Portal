import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function Home() {

    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    useEffect(() => {

        fetchPets();

    }, []);

    const fetchPets = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/pets'
            );

            setPets(response.data);
            setFilteredPets(response.data);
            setLoading(false);

        } catch (error) {

            console.log(error);
            setLoading(false);
        }
    };
    
    const navigate =
    useNavigate();

    const searchPets = () => {
    
        if(!keyword.trim()){
           return;
        }
        navigate(
             `/search-results?keyword=${keyword}`
        );
    };

    return (

        <div>

            {/* Hero Section */}

            <div className="bg-dark text-white text-center p-5">

                <h1 className="display-4 fw-bold">
                    Pet Adoption Portal
                </h1>

                <p className="lead mt-3">
                    Find your perfect furry friend.
                </p>

                <div className="d-flex justify-content-center mt-4">

                    <div
                        className="position-relative"
                        style={{
                            width: "600px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Search by name, type or breed"
                            className="form-control form-control-lg pe-5"
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchPets();
                                }
                            }} 
                        />

                        <FaSearch
                            onClick={searchPets}
                            style={{
                                position: "absolute",
                                right: "20px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#6c757d",
                                fontSize: "22px"
                            }}
                        />

                    </div>

                </div>
                
            </div>

            {/* Categories */}

            <div className="container mt-5">

                <h2 className="text-center mb-4">
                    Browse Categories
                </h2>

                <div className="row text-center">

                    <div className="col-md-3 mb-4">

                        <Link
                            to="/category/Dog"
                            className="text-decoration-none"
                        >

                            <div className="card shadow border-0 p-4 h-100">

                                <h3>🐶</h3>

                                <h5 className="mt-3">
                                    Dogs
                                </h5>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-3 mb-4">

                        <Link
                            to="/category/Cat"
                            className="text-decoration-none"
                        >

                            <div className="card shadow border-0 p-4 h-100">

                                <h3>🐱</h3>

                                <h5 className="mt-3">
                                    Cats
                                </h5>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-3 mb-4">

                        <Link
                            to="/category/Bird"
                            className="text-decoration-none"
                        >

                            <div className="card shadow border-0 p-4 h-100">

                                <h3>🦜</h3>

                                <h5 className="mt-3">
                                    Birds
                                </h5>

                            </div>

                        </Link>

                    </div>

                    <div className="col-md-3 mb-4">

                        <Link
                            to="/category/Rabbit"
                            className="text-decoration-none"
                        >

                            <div className="card shadow border-0 p-4 h-100">

                                <h3>🐰</h3>

                                <h5 className="mt-3">
                                    Rabbits
                                </h5>

                            </div>

                        </Link>

                    </div>

                </div>

            </div>

            {/* Pets Section */}

            <div className="container mt-5 mb-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="mb-0">
                        Available Pets
                    </h2>

                    <button
                        className="btn btn-dark rounded-circle shadow"
                        style={{
                            width: "50px",
                            height: "50px"
                        }}
                        onClick={() =>
                        navigate("/category/dog")
                        }
                    >
                    <FaArrowRight />
                    </button>

                </div>

                {loading ? (

                    <div className="text-center">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                    </div>

                ) : (

                    <div className="row g-4">

                        {filteredPets
                            .slice(0, 4)
                            .map((pet) => (

                            <div
                                key={pet.id}
                                className="col-lg-3 col-md-6"
                            >

                                <PetCard pet={pet} />

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Home;