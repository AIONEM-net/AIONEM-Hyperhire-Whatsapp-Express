import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchChatrooms = async () => {
    try {
        const response = await api.get('/chatrooms');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchMessages = async (chatroomId) => {
    try {
        const response = await api.get(`/messages/chatroom/${chatroomId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendMessage = async (messageData) => {
    try {
        const response = await api.post('/messages', messageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/users/${userId}`, profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    fetchChatrooms,
    fetchMessages,
    sendMessage,
    updateUserProfile,
};
