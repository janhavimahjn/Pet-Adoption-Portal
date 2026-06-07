import React,
{
    useEffect,
    useState
}
from 'react';

import {
    getNotifications,
    markAsRead
}
from '../services/notificationService';

function Notifications() {

    const [
        notifications,
        setNotifications
    ] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications =
    async () => {

        try {

            const userId =
                localStorage.getItem(
                    'userId'
                );

            const response =
                await getNotifications(
                    userId
                );

            setNotifications(
                response.data
            );

        } catch(error){

            console.log(error);
        }
    };

    const handleRead =
    async (id) => {

        await markAsRead(id);

        loadNotifications();
    };

    return (

        <div className="container mt-5">

            <h2>
                Notifications
            </h2>

            {notifications.length === 0 ? (

                <div
                    className="alert alert-info"
                >
                    No Notifications
                </div>

            ) : (

                notifications.map(
                    notification => (

                    <div
                        key={notification.id}
                        className={`card p-3 mb-3 ${
                            notification.read
                            ? "bg-light"
                            : "border-primary"
                        }`}
                    >

                        <h6>
                            {notification.message}
                        </h6>

                        {!notification.read && (

                            <button
                                className=
                                "btn btn-sm btn-success"
                                onClick={() =>
                                    handleRead(
                                        notification.id
                                    )
                                }
                            >
                                Mark As Read
                            </button>

                        )}

                    </div>

                )))

            }

        </div>
    );
}

export default Notifications;