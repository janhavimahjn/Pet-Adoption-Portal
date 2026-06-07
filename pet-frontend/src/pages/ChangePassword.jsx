import React,
{
    useState
}
from 'react';

import {
    changePassword
}
from '../services/userService';

import {
    useNavigate
}
from 'react-router-dom';

import BackButton from '../components/BackButton';

function ChangePassword() {

    const navigate =
        useNavigate();

    const [
        password,
        setPassword
    ] = useState('');

    const handleSubmit =
    async () => {

        if(password.length < 6){

            alert(
                "Password must be at least 6 characters"
            );

            return;
        }

        try {

            const userId =
                localStorage.getItem(
                    'userId'
                );

            await changePassword(
                userId,
                password
            );

            alert(
                "Password Updated Successfully"
            );

            navigate(
                "/profile"
            );

        } catch(error){

            console.log(error);
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/profile"
            />

            <h2>
                Change Password
            </h2>

            <div className="card p-4 shadow">

                <input
                    type="password"
                    placeholder="New Password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e)=>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={
                        handleSubmit
                    }
                >
                    Update Password
                </button>

            </div>

        </div>
    );
}

export default ChangePassword;