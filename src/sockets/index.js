module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`New user connected: ${socket.id}`);

        socket.on('joinChatroom', ({ chatroomId, userId }) => {
            socket.join(chatroomId);
            console.log(`User ${userId} joined chatroom ${chatroomId}`);
            // Notify others in the chatroom of the new user's arrival
            socket.to(chatroomId).emit('userJoined', { userId, chatroomId });
        });

        socket.on('leaveChatroom', ({ chatroomId, userId }) => {
            socket.leave(chatroomId);
            console.log(`User ${userId} left chatroom ${chatroomId}`);
            // Notify others in the chatroom that the user has left
            socket.to(chatroomId).emit('userLeft', { userId, chatroomId });
        });

        socket.on('sendMessage', (message) => {
            // message should contain { chatroomId, userId, content }
            console.log(`Message from user ${message.userId} in chatroom ${message.chatroomId}: ${message.content}`);
            // Emit the message to all users in the chatroom
            io.to(message.chatroomId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // Handle user disconnection if needed
        });
    });
};
