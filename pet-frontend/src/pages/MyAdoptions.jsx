import React,
{
    useEffect,
    useState
}
from 'react';

import axios from 'axios';

function MyAdoptions() {

    const [requests,
        setRequests] =
        useState([]);

    useEffect(() => {

        fetchRequests();

    }, []);

    const fetchRequests =
        async () => {

        try {

            const userId =
                localStorage.getItem(
                    'userId'
                );

            const response =
                await axios.get(
                    `http://localhost:8080/adoptions/user/${userId}`
                );

            setRequests(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">

            <h2
                className="mb-4"
            >
                My Adoption Requests
            </h2>

            <table
                className="table table-bordered"
            >

                <thead
                    className="table-dark"
                >

                    <tr>

                        <th>ID</th>

                        <th>Pet</th>

                        <th>Status</th>

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
                                {request.pet?.name}
                            </td>

                            <td>

                                {request.status ===
                                'APPROVED'
                                    ? 'Approved'
                                    : request.status === 'REJECTED'
                                    ? 'Rejected'
                                    : 'Pending'}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default MyAdoptions;