import React from 'react';

import {
    useNavigate
} from 'react-router-dom';

import {
    FaArrowLeft
} from 'react-icons/fa';

function BackButton({

    destination = '/',

}) {

    const navigate = useNavigate();

    return (

        <button
            className="btn btn-dark mb-4 d-flex align-items-center gap-2"
            onClick={() =>
                navigate(destination)
            }
        >

            <FaArrowLeft />

        </button>
    );
}

export default BackButton;