import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {

    const [pets, setPets] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const petsRes =
                await axios.get(
                    'http://localhost:8080/pets'
                );

            setPets(petsRes.data);

            const reqRes =
                await axios.get(
                    'http://localhost:8080/adoptions'
                );

            setRequests(reqRes.data);

        } catch (error) {

            console.log(error);
        }
    };

    const availablePets =
        pets.filter(
            pet =>
                pet.status === 'Available'
        ).length;

    const approvedRequests =
        requests.filter(
            req =>
                req.status === 'APPROVED'
        ).length;

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Welcome User
            </h1>

            <div className="row">

                <div className="col-md-3">

                    <div className="card shadow p-3">

                        <h5>
                            Available Pets
                        </h5>

                        <h2>
                            {availablePets}
                        </h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-3">

                        <h5>
                            Requests
                        </h5>

                        <h2>
                            {requests.length}
                        </h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-3">

                        <h5>
                            Approved
                        </h5>

                        <h2>
                            {approvedRequests}
                        </h2>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserDashboard;