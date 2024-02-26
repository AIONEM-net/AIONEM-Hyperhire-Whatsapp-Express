import io from 'socket.io-client';

// Assuming you have set the REACT_APP_API_BASE_URL environment variable
// pointing to your backend server where Socket.IO is running
const SOCKET_IO_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const socket = io(SOCKET_IO_URL);

const connect = () => {
    console.log('Connecting to Socket.IO server...');
    socket.connect();
};

const disconnect = () => {
    console.log('Disconnecting from Socket.IO server...');
    socket.disconnect();
};

// Subscribe to receive messages from a specific chat room
const subscribeToChat = (chatroomId, callback) => {
    socket.emit('joinChatroom', chatroomId);
    socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        callback(message);
    });
};

// Leave a chat room
const leaveChat = (chatroomId) => {
    socket.emit('leaveChatroom', chatroomId);
};

// Send a message to a specific chat room
const sendMessage = (chatroomId, message) => {
    socket.emit('sendMessage', { chatroomId, message });
};

export default {
    connect,
    disconnect,
    subscribeToChat,
    leaveChat,
    sendMessage,
};
