import axios from "axios";

const API =
"http://localhost:8080/notifications";

export const getNotifications =
(userId) =>
axios.get(`${API}/${userId}`);

export const unreadCount =
(userId) =>
axios.get(`${API}/count/${userId}`);

export const markAsRead =
(id) =>
axios.put(`${API}/read/${id}`);

export const deleteNotification =
(id) =>
axios.delete(`${API}/${id}`);