const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const chatroomRoutes = require('./src/routes/chatroomRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const { sequelize } = require('./src/models');

const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
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
        io.to(message.chatroomId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 4000;
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
