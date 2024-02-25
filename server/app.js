const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const chatroomRoutes = require('./src/routes/chatroomRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const { sequelize } = require('./src/models');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock user identification middleware
app.use((req, res, next) => {
    // Assume the user ID is passed in the header 'x-user-id'
    req.userId = req.headers['x-user-id'] || 'anonymous';
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/chatrooms', chatroomRoutes);
app.use('/messages', messageRoutes);

// Socket.io communication
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChatroom', (chatroomId) => {
        socket.join(chatroomId);
        console.log(`User with ID: ${socket.id} joined chatroom: ${chatroomId}`);
    });

    socket.on('leaveChatroom', (chatroomId) => {
        socket.leave(chatroomId);
        console.log(`User with ID: ${socket.id} left chatroom: ${chatroomId}`);
    });

    socket.on('sendMessage', (message) => {
        // Here, the message would be processed and then emitted to the room
        io.to(message.chatroomId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
