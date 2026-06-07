import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import BackButton from "../components/BackButton";

function ManageMessages() {

    const [messages, setMessages] =
        useState([]);

    useEffect(() => {

        fetchMessages();

    }, []);

    const fetchMessages = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/contact"
                );

            setMessages(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const deleteMessage = async (id) => {

        if (
            window.confirm(
                "Delete this message?"
            )
        ) {

            try {

                await axios.delete(
                    `http://localhost:8080/contact/${id}`
                );

                fetchMessages();

            } catch (error) {

                console.log(error);
            }
        }
    };

    return (

        <div className="container mt-5">

            <BackButton
                destination="/admin"
            />

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">
                    Contact Messages
                </h2>

                <span className="badge bg-primary fs-6">
                    Total: {messages.length}
                </span>

            </div>

            <div className="row">

                {messages.length > 0 ? (

                    messages.map((msg) => (

                        <div
                            key={msg.id}
                            className="col-md-6 col-lg-4 mb-4"
                        >

                            <div className="card shadow border-0 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h5 className="fw-bold mb-0">
                                            {msg.subject}
                                        </h5>

                                        <span className="badge bg-secondary">
                                            #{msg.id}
                                        </span>

                                    </div>

                                    <h6 className="text-primary">
                                        {msg.name}
                                    </h6>

                                    <p className="text-muted small">
                                        {msg.email}
                                    </p>

                                    <hr />

                                    <p
                                        style={{
                                            minHeight: "100px"
                                        }}
                                    >
                                        {msg.message}
                                    </p>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() =>
                                            deleteMessage(msg.id)
                                        }
                                    >
                                        Delete Message
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="col-12">

                        <div className="alert alert-info text-center">

                            No Contact Messages Found

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ManageMessages;