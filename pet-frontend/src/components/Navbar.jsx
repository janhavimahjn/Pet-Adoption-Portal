import React, {useEffect,useState} from 'react';

import {
    Link,
    useNavigate
} from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import {
    unreadCount
}
from '../services/notificationService';

function Navbar() {

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const token =
        localStorage.getItem('token');

    let role = '';

    if (token) {

        try {

            const decoded =
                jwtDecode(token);

            role = decoded.role;

        } catch (error) {

            console.log(error);
        }
    }
    useEffect(() => {

        const userId =
        localStorage.getItem(
            'userId'
        );

        if(userId){

            unreadCount(userId)
            .then(res =>
                setCount(
                    res.data
                )
            );
        }

    }, []);

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href =
            '/';
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Pet Adoption Portal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Home
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/category/Dog"
                            >
                                Pets
                            </Link>

                        </li>

                        {role === 'USER' && (

                            <>
                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/favorites"
                                    >
                                        Favorites
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-requests"
                                    >
                                        My Requests
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/profile"
                                    >
                                        Profile
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/notifications"
                                    >
                                        Notifications
                                        {count > 0 && (

                                            <span
                                               className="badge bg-danger ms-2"
                                            >
                                               {count}
                                            </span>

                                        )}
                                    </Link>

                                </li>
                                
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/contact"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </>
                        )}

                        {role === 'ADMIN' && (

                            <>
                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/admin"
                                    >
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-pets"
                                    >
                                        Manage Pets
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-users"
                                    >
                                        Manage Users
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/adoption-requests"
                                    >
                                        Requests
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-messages"
                                    >
                                        Manage Contact
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/analytics"
                                    >
                                        Analytics
                                    </Link>

                                </li>
                            </>
                        )}

                    </ul>

                    <div className="d-flex">

                        {!token ? (

                            <>

                                <Link
                                    className="btn btn-outline-light me-2"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="btn btn-warning"
                                    to="/register"
                                >
                                    Register
                                </Link>

                            </>

                        ) : (

                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;