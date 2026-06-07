import React, {
    useEffect,
    useState
} from 'react';

import {
    getUser,
    updateProfile,
    uploadPhoto
} from '../services/userService';

import {
    Link
} from 'react-router-dom';

import BackButton from '../components/BackButton';

function Profile() {

    const [user, setUser] =
        useState({});

    const [editMode,
        setEditMode] =
        useState(false);

    const [photo,
        setPhoto] =
        useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser =
    async () => {

        try {

            const userId =
                localStorage.getItem(
                    'userId'
                );

            const response =
                await getUser(
                    userId
                );

            setUser(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange =
    (e) => {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value

        });
    };

    const validatePhone =
    (phone) => {

        const regex =
            /^[6-9]\d{9}$/;

        return regex.test(
            phone
        );
    };

    const handleSave =
    async () => {

        if (
            !user.name ||
            !user.phone ||
            !user.address
        ) {

            alert(
                'Name, Phone and Address are required'
            );

            return;
        }

        if (
            !validatePhone(
                user.phone
            )
        ) {

            alert(
                'Enter Valid Indian Mobile Number'
            );

            return;
        }

        try {

            await updateProfile(
                user.id,
                user
            );

            if (photo) {

                await uploadPhoto(
                    user.id,
                    photo
                );
            }

            alert(
                'Profile Updated Successfully'
            );

            setEditMode(
                false
            );

            setPhoto(
                null
            );

            loadUser();

        } catch (error) {

            console.log(error);

            alert(
                'Failed To Update Profile'
            );
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/"
            />

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    My Profile
                </h2>

                <div className="text-center mb-4">

                    <img
                        src={
                            user.profilePhoto
                                ?
                                `http://localhost:8080/uploads/profile/${user.profilePhoto}`
                                :
                                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }
                        alt="Profile"
                        className="rounded-circle border"
                        width="150"
                        height="150"
                        style={{
                            objectFit:
                                'cover'
                        }}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={
                            user.name || ''
                        }
                        className="form-control"
                        disabled={
                            !editMode
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        value={
                            user.email || ''
                        }
                        className="form-control"
                        disabled
                    />

                </div>

                {editMode && (

                    <div className="mb-3">

                        <label className="form-label">
                            Profile Photo
                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) =>
                                setPhoto(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                )}

                <div className="mb-3">

                    <label className="form-label">
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Mobile Number"
                        value={
                            user.phone || ''
                        }
                        className="form-control"
                        maxLength="10"
                        disabled={
                            !editMode
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Address
                    </label>

                    <textarea
                        rows="3"
                        name="address"
                        placeholder="Enter Address"
                        value={
                            user.address || ''
                        }
                        className="form-control"
                        disabled={
                            !editMode
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

                {!editMode ? (

                    <button
                        className="btn btn-primary mb-3"
                        onClick={() =>
                            setEditMode(
                                true
                            )
                        }
                    >
                        Edit Profile
                    </button>

                ) : (

                    <button
                        className="btn btn-success mb-3"
                        onClick={
                            handleSave
                        }
                    >
                        Save Profile
                    </button>

                )}

                <Link
                    to="/change-password"
                    className="btn btn-warning"
                >
                    Change Password
                </Link>

            </div>

        </div>
    );
}

export default Profile;