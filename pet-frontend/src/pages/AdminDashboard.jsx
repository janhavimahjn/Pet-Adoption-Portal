import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const [pets, setPets] = useState([]);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const petsResponse =
                await axios.get(
                    'http://localhost:8080/pets'
                );

            setPets(petsResponse.data);

            const usersResponse =
                await axios.get(
                    'http://localhost:8080/users'
                );

            setUsers(usersResponse.data);

        } catch (error) {

            console.log(error);
        }
    };

    const availablePets =
        pets.filter(
            pet =>
                pet.status === 'Available'
        ).length;

    return (

        <div className="d-flex">

            <div
                className="bg-dark text-white p-4"
                style={{
                    width: '250px',
                    minHeight: '100vh'
                }}
            >
                <BackButton
                destination="/"
                />
                <h2 className="mb-5">
                    Admin Panel
                </h2>

                <ul className="list-unstyled mt-5">

                  <li className="mb-4">

                     <button
                        className="btn btn-dark w-100 text-start"
                        onClick={() =>
                        navigate('/admin')
                      }
                     >
                       Dashboard
                     </button>

                  </li>

                  <li className="mb-4">

                    <button
                       className="btn btn-dark w-100 text-start"
                       onClick={() =>
                       navigate('/manage-pets')
                     }
                    >
                      Manage Pets
                    </button>

                  </li>

                  <li className="mb-4">

                    <button
                        className="btn btn-dark w-100 text-start"
                        onClick={() =>
                        navigate('/manage-users')
                     }
                    >
                      Manage Users
                    </button>

                  </li>

                  <li className="mb-4">

                    <button
                        className="btn btn-dark w-100 text-start"
                        onClick={() =>
                        navigate('/adoption-requests')
                     }
                    >
                      Adoption Requests
                    </button>

                  </li>
                  
                  <li>
                    <button
                       className="btn btn-dark w-100 text-start"
                       onClick={() =>
                            navigate("/manage-messages")
                       }
                    >
                        Manage Contact
                    </button>
                  </li>

                  <li className="mb-4">

                    <button
                        className="btn btn-dark w-100 text-start"
                        onClick={() =>
                            navigate('/analytics')
                     }
                    >
                      Analytics
                    </button>

                  </li>

                </ul>

            </div>

            <div className="container-fluid p-5">

                <h1 className="mb-5">
                    Admin Dashboard
                </h1>

                <div className="row">

                    <div className="col-md-3">

                        <div className="card shadow border-0 p-4">

                            <h3>Total Pets</h3>

                            <h1>{pets.length}</h1>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 p-4">

                            <h3>Available Pets</h3>

                            <h1>{availablePets}</h1>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 p-4">

                            <h3>Total Users</h3>

                            <h1>{users.length}</h1>

                        </div>

                    </div>

                </div>

                <div className="card shadow border-0 p-5 mt-5">

                    <h2>
                        Recent Activities
                    </h2>

                    <ul className="mt-4">

                        <li>
                            User adopted Bruno
                        </li>

                        <li>
                            Admin added new pet
                        </li>

                        <li>
                            New user registered
                        </li>

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;