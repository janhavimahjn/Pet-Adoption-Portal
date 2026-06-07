import React,
{
    useEffect,
    useState
}
from 'react';

import axios from 'axios';

import {
    useParams
}
from 'react-router-dom';

import PetCard from '../components/PetCard';

import BackButton from '../components/BackButton';

function CategoryPage() {

    const { type } =
        useParams();

    const [allPets,setAllPets] =
        useState([]);

    const [pets,setPets] =
        useState([]);

    const [search,setSearch] =
        useState('');

    const [gender,setGender] =
        useState('');

    const [sort,setSort] =
        useState('');

    // FETCH PETS

    useEffect(() => {

        fetchPets();

    }, [type]);

    const fetchPets =
    async () => {

        try {

            const response =
                await axios.get(
                    'http://localhost:8080/pets'
                );

            setAllPets(response.data);

            setPets(response.data);

        } catch(error){

            console.log(error);
        }
    };

    // FILTER PETS

    useEffect(() => {

        let filtered =
            [...allPets];

        // SEARCH

        if(search){

            filtered =
                filtered.filter(
                    pet =>
                    pet.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
                    ||
                    pet.breed
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
                    ||
                    pet.type
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
                );
        }

        // GENDER

        if(gender){

            filtered =
                filtered.filter(
                    pet =>
                    pet.gender === gender
                );
        }

        // SORT

        if(sort === 'ageLow'){

            filtered.sort(
                (a,b)=>
                a.age - b.age
            );
        }

        if(sort === 'ageHigh'){

            filtered.sort(
                (a,b)=>
                b.age - a.age
            );
        }

        setPets(filtered);

    }, [search,gender,sort,allPets]);

    return (

        <div className="container mt-5">

            <BackButton
                destination="/"
            />

            <h1
                className="text-center mb-5"
            >
                Available Pets
            </h1>

            {/* FILTERS */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        type="text"
                        placeholder=
                        "Search by name or breed"
                        className="form-control"
                        value={search}
                        onChange={(e)=>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e)=>
                            setGender(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={sort}
                        onChange={(e)=>
                            setSort(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="ageLow">
                            Age Low To High
                        </option>

                        <option value="ageHigh">
                            Age High To Low
                        </option>

                    </select>

                </div>

            </div>

            {/* PETS */}

            <div className="row g-4">

                {pets.length > 0 ? (

                    pets.map((pet) => (

                        <div
                            key={pet.id}
                            className=
                            "col-lg-4 col-md-6 col-12"
                        >

                            <PetCard
                                pet={pet}
                            />

                        </div>

                    ))

                ) : (

                    <div className="col-12">

                        <div
                            className=
                            "alert alert-warning text-center"
                        >

                            No pets found.

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default CategoryPage;