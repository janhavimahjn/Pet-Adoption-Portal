import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { getFavorites, removeFavorite } from '../services/favoriteService';

import PetCard from '../components/PetCard';

function Favorites() {

    const [pets, setPets] =
        useState([]);

    useEffect(() => {

        fetchFavorites();

    }, []);

    const fetchFavorites =
        async () => {

        try {

            const userId =
                localStorage.getItem(
                    'userId'
                );

            const response =
                await getFavorites(
                    userId
                );

            setPets(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const handleRemoveFavorite =
        async (favoriteId) => {

        try {

            await removeFavorite(
                favoriteId
            );

            fetchFavorites();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">
            <BackButton
               destination="/"
            />
            <h2
              className="mb-4 text-center"
            >
                ❤️ My Favorite Pets
            </h2>

            {pets.length === 0 ? (

                <div
                  className="alert alert-info"
                >
                    No Favorite Pets Yet
                </div>

            ) : (

                <div className="row g-4">

                    {pets.map(item => (

                        <div
                           key={item.pet.id}
                           className="col-lg-4 col-md-6 col-12"
                        >
                            <PetCard
                                pet={item.pet}
                                onRemove={() =>
                                    handleRemoveFavorite(
                                        item.favoriteId
                                    )
                                }
                            />

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Favorites;