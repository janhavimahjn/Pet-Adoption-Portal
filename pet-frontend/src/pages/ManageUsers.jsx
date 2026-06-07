import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/users'
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/users/${id}`
            );

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    const changeRole = async (id, role) => {

        try {

            await axios.put(
                `http://localhost:8080/users/${id}`,
                {
                    role: role
                }
            );

            alert('Role Updated');

            fetchUsers();

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
                Manage Users
            </h2>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.role}</td>

                            <td>

                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        changeRole(
                                            user.id,
                                            user.role === 'ADMIN'
                                                ? 'USER'
                                                : 'ADMIN'
                                        )
                                    }
                                >
                                    Change Role
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageUsers;