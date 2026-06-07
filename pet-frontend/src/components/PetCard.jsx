import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {addFavorite, removeFavorite, getFavoriteId} from '../services/favoriteService';

function PetCard({ pet, onRemove }) {

    const [adoptionStatus, setAdoptionStatus] =
        useState('NONE');

    const [isFavorite, setIsFavorite] =
        useState(false);

    const [favoriteId, setFavoriteId] =
        useState(null);
    
    const navigate = 
        useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userId =
                localStorage.getItem('userId');

            if (!userId) {
                setAdoptionStatus('NONE');
                setIsFavorite(false);
                return;
            }

            try {
                const statusResponse =
                    await axios.get(
                       `http://localhost:8080/adoptions/status/${userId}/${pet.id}`
                    );
                setAdoptionStatus(
                    statusResponse.data
                );
            } catch (error) {
                setAdoptionStatus('NONE');
            }

            try {
                const favoriteResponse =
                    await getFavoriteId(
                        userId,
                        pet.id
                    );
                if (favoriteResponse.data) {
                    setIsFavorite(true);
                    setFavoriteId(
                        favoriteResponse.data
                    );
                } else {
                    setIsFavorite(false);
                }
            } catch (error) {
                setIsFavorite(false);
            }
        };

        fetchData();
    }, [pet.id]);

    const checkStatus = async () => {

        const userId =
            localStorage.getItem('userId');

        if (!userId) {

            setAdoptionStatus('NONE');
            return;
        }

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/adoptions/status/${userId}/${pet.id}`
                );

            setAdoptionStatus(
                response.data
            );
        } catch (error) {
            console.log(error);
            setAdoptionStatus(
                'NONE'
            );
        }
    };

    const checkFavorite = async () => {

        const userId =
            localStorage.getItem('userId');
        if (!userId) {
            setIsFavorite(false);
            return;
        }

        try {
            const response =
                await getFavoriteId(
                    userId,
                    pet.id
                );

            if (response.data) {
                setIsFavorite(true);
                setFavoriteId(
                    response.data
                );

            } else {
                setIsFavorite(false);
            }

        } catch (error) {
            console.log(error);
            setIsFavorite(false);
        }
    };

    const handleAdopt = async (petId) => {

        const token =
            localStorage.getItem('token');

        if (!token) {
            alert(
                'Please login first'
            );

            return;
        }

        const userId =
            localStorage.getItem('userId');

        try {

            await axios.post(
                'http://localhost:8080/adoptions',
                {
                    userId: Number(userId),
                    petId: petId
                }
            );

            setAdoptionStatus(
                'PENDING'
            );

            alert(
                'Request Sent Successfully'
            );

        } catch (error) {

            alert(
                error.response?.data ||
                'Already Requested'
            );
        }
    };

    const handleFavorite = async (petId) => {

        const token =
            localStorage.getItem('token');

        if (!token) {
            alert(
                'Please login first'
            );
            return;
        }

        const userId =
            localStorage.getItem('userId');

        try {
            const response =
                await addFavorite({
                    userId: Number(userId),
                    petId: petId
                });
            setIsFavorite(true);
            setFavoriteId(
                response.data.id
            );
            alert(
                'Added To Favorites ❤️'
            );
        } catch (error) {
            alert(
                error.response?.data ||
                'Failed To Add Favorite'
            );
        }
    };

    const handleRemoveFavorite = async () => {

        try {
            await removeFavorite(
                favoriteId
            );
            setIsFavorite(false);
            setFavoriteId(null);
            alert(
                'Removed From Favorites'
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="card shadow border-0 h-100"
            style={{
                width: '100%'
            }}
        >
            <img
                src={pet.imageUrl}
                className="card-img-top"
                alt={pet.name}
                style={{
                   height: "250px",
                   objectFit: "cover"
                }}
                onError={(e) => {
                   e.target.src =
                   "https://via.placeholder.com/400x300?text=Pet+Image";
                }}
            />
            <div className="card-body">
                <h4>{pet.name}</h4>
                <p>
                    <strong>Type:</strong>{' '}
                    {pet.type}
                </p>
                <p>
                    <strong>Breed:</strong>{' '}
                    {pet.breed}
                </p>
                <p>
                    <strong>Age:</strong>{' '}
                    {pet.age}
                </p>
                <p>
                    <strong>Gender:</strong>{' '}
                    {pet.gender}
                </p>
                <p>
                    <strong>Status:</strong>{' '}
                    {pet.status}
                </p>
                <p
                    onClick={() =>
                        navigate(`/pet/${pet.id}`)
                    }
                    style={{
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "500",
                        marginTop: "10px"
                    }}
                    onMouseEnter={(e) =>
                        e.target.style.color = "blue"
                    }
                        onMouseLeave={(e) =>
                    e.target.style.color = "black"
                    }
                >
                    View Details
                </p>
                <div className="d-grid gap-2">
                    {!localStorage.getItem('token') ? (
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                alert(
                                    'Please login first'
                                )
                            }
                        >
                            Adopt Now
                        </button>

                    )
                    :
                    adoptionStatus === 'NONE' 
                        ? 
                        (
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                handleAdopt(
                                    pet.id
                                )
                            }
                        >
                            Adopt Now
                        </button>

                    ) : adoptionStatus === 'PENDING' ? (

                        <button
                            className="btn btn-warning"
                            disabled
                        >
                            Pending
                        </button>

                    ) : adoptionStatus === 'APPROVED' ? (

                        <button
                            className="btn btn-primary"
                            disabled
                        >
                            Adopted
                        </button>

                    ) : (
                        <button
                            className="btn btn-danger"
                            disabled
                        >
                            Rejected
                        </button>

                    )}

                    {!onRemove && (

                        isFavorite ? (

                            <button
                                className="btn btn-danger"
                                onClick={
                                    handleRemoveFavorite
                                }
                            >
                                Remove From Favorites
                            </button>

                        ) : (

                            <button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                    handleFavorite(
                                        pet.id
                                    )
                                }
                            >
                                <FaHeart
                                    className="me-2"
                                />

                                Add To Favorites
                            </button>

                        )

                    )}

                    {onRemove && (

                        <button
                            className="btn btn-danger"
                            onClick={
                                onRemove
                            }
                        >
                            Remove From Favorites
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default PetCard;