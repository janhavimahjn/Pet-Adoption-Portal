import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/contact",
                form
            );

            setSuccess(
                "Message sent successfully!"
            );

            setForm({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (error) {

            console.log(error);

            setSuccess(
                "Failed to send message."
            );
        }
    };

    return (

        <div className="container py-5">

            <BackButton destination="/" />

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0 p-5">

                        <h1 className="text-center mb-4">
                            Contact Us
                        </h1>

                        {success && (
                            <div className="alert alert-info">
                                {success}
                            </div>
                        )}

                        <div className="row mb-4">

                            <div className="col-md-4 text-center">
                                <h5>📍 Address</h5>
                                <p>
                                    STES College,
                                    Nashik,
                                    Maharashtra
                                </p>
                            </div>

                            <div className="col-md-4 text-center">
                                <h5>📞 Phone</h5>
                                <p>
                                    +91 9876543210
                                </p>
                            </div>

                            <div className="col-md-4 text-center">
                                <h5>📧 Email</h5>
                                <p>
                                    support@petportal.com
                                </p>
                            </div>

                        </div>

                        <hr />

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Message
                                </label>

                                <textarea
                                    rows="5"
                                    name="message"
                                    className="form-control"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Contact;