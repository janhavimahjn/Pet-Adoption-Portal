import React,
{
    useEffect,
    useState
}
from 'react';

import axios from 'axios';

import BackButton
from '../components/BackButton';

function AdoptionRequests() {

    const [requests,
        setRequests] =
        useState([]);

    useEffect(() => {

        fetchRequests();

    }, []);

    const fetchRequests =
        async () => {

        try {

            const response =
                await axios.get(
                    'http://localhost:8080/adoptions'
                );

            setRequests(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const updateStatus =
        async (
            id,
            status
        ) => {

        try {

            await axios.put(
                `http://localhost:8080/adoptions/${id}`,
                {
                    status
                }
            );

            fetchRequests();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/admin"
            />

            <h2 className="mb-4">
                Adoption Requests
            </h2>

            <table
                className="table table-bordered"
            >

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>User</th>

                        <th>Pet</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {requests.map(
                        (request) => (

                        <tr
                            key={request.id}
                        >

                            <td>
                                {request.id}
                            </td>

                            <td>
                                {request.user?.id}
                            </td>

                            <td>
                                {request.pet?.name}
                            </td>

                            <td>

                                {request.status}

                            </td>

                            <td>

                                <button
                                    className=
                                    "btn btn-success me-2"
                                    onClick={() =>
                                        updateStatus(
                                            request.id,
                                            'APPROVED'
                                        )
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className=
                                    "btn btn-danger"
                                    onClick={() =>
                                        updateStatus(
                                            request.id,
                                            'REJECTED'
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdoptionRequests;