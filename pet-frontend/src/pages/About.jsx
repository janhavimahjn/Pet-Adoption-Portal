import React from "react";
import BackButton from "../components/BackButton";
import {
    FaPaw,
    FaHeart,
    FaHome,
    FaShieldAlt
} from "react-icons/fa";

function About() {

    return (

        <div className="container py-5">

            <BackButton destination="/" />

            {/* HERO SECTION */}

            <div
                className="text-center text-white rounded shadow-lg p-5 mb-5"
                style={{
                    background:
                    "linear-gradient(135deg,#232526,#414345)"
                }}
            >

                <h1 className="display-4 fw-bold">
                    About Us
                </h1>

                <p className="lead mt-3">
                    Connecting loving homes with pets in need 🐾
                </p>

            </div>

            {/* MISSION */}

            <div className="card border-0 shadow p-4 mb-5">

                <h2 className="mb-3">
                    Our Mission
                </h2>

                <p className="text-muted fs-5">

                    We help homeless pets find loving families.
                    Our platform connects adopters, shelters,
                    and pet lovers through a secure and simple
                    adoption process.

                </p>

            </div>

            {/* FEATURES */}

            <h2 className="text-center mb-4">
                What We Offer
            </h2>

            <div className="row g-4 mb-5">

                <div className="col-md-3">

                    <div className="card border-0 shadow h-100 text-center p-4">

                        <FaPaw
                            size={45}
                            className="mx-auto text-primary"
                        />

                        <h5 className="mt-3">
                            Browse Pets
                        </h5>

                        <p className="text-muted">
                            Search pets by breed,
                            category or location.
                        </p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow h-100 text-center p-4">

                        <FaHeart
                            size={45}
                            className="mx-auto text-danger"
                        />

                        <h5 className="mt-3">
                            Favorites
                        </h5>

                        <p className="text-muted">
                            Save pets you love and
                            revisit them anytime.
                        </p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow h-100 text-center p-4">

                        <FaHome
                            size={45}
                            className="mx-auto text-success"
                        />

                        <h5 className="mt-3">
                            Easy Adoption
                        </h5>

                        <p className="text-muted">
                            Submit adoption requests
                            in just a few clicks.
                        </p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow h-100 text-center p-4">

                        <FaShieldAlt
                            size={45}
                            className="mx-auto text-warning"
                        />

                        <h5 className="mt-3">
                            Secure Platform
                        </h5>

                        <p className="text-muted">
                            Safe and transparent
                            adoption process.
                        </p>

                    </div>

                </div>

            </div>

            {/* STATS */}

            <div
                className="row text-center text-white rounded p-5 mb-5"
                style={{
                    background:
                    "linear-gradient(135deg,#56ab2f,#a8e063)"
                }}
            >

                <div className="col-md-4">

                    <h1>500+</h1>

                    <p>Pets Listed</p>

                </div>

                <div className="col-md-4">

                    <h1>300+</h1>

                    <p>Successful Adoptions</p>

                </div>

                <div className="col-md-4">

                    <h1>1000+</h1>

                    <p>Happy Users</p>

                </div>

            </div>

            {/* CTA */}

            <div className="text-center">

                <h2>
                    Every Pet Deserves A Loving Home ❤️
                </h2>

                <p className="text-muted">

                    Join us in making a difference.

                </p>

            </div>

        </div>

    );
}

export default About;