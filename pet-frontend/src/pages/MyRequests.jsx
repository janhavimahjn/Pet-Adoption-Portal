import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';

function MyRequests() {

    const [requests, setRequests] =
        useState([]);

    useEffect(() => {

        fetchRequests();

    }, []);

    const fetchRequests = async () => {

        const response =
            await axios.get(
                'http://localhost:8080/adoptions'
            );

        setRequests(
            response.data
        );
    };

    return (

        <div className="container mt-5">
            <BackButton
                destination="/"
            />
            <h2>
                My Requests
            </h2>

            <table className="table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {requests.map(req => (

                        <tr key={req.id}>

                            <td>
                                {req.id}
                            </td>

                            <td>
                                {req.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default MyRequests;