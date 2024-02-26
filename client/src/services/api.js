import axios from 'axios';

// Set up a base URL for all API requests
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Function to fetch chatrooms
export const fetchChatrooms = async () => {
    try {
        const response = await api.get('/chatrooms');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch messages for a specific chatroom
export const fetchMessages = async (chatroomId) => {
    try {
        const response = await api.get(`/messages/chatroom/${chatroomId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to send a new message
export const sendMessage = async (messageData) => {
    try {
        const response = await api.post('/messages', messageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/users/${userId}`, profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add more API functions as needed

export default {
    fetchChatrooms,
    fetchMessages,
    sendMessage,
    updateUserProfile,
    // Export other functions as needed
};
