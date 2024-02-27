module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`New user connected: ${socket.id}`);

        socket.on('joinChatroom', ({ chatroomId, userId }) => {
            socket.join(chatroomId);
            console.log(`User ${userId} joined chatroom ${chatroomId}`);
            socket.to(chatroomId).emit('userJoined', { userId, chatroomId });
        });

        socket.on('leaveChatroom', ({ chatroomId, userId }) => {
            socket.leave(chatroomId);
            console.log(`User ${userId} left chatroom ${chatroomId}`);
            socket.to(chatroomId).emit('userLeft', { userId, chatroomId });
        });

        socket.on('sendMessage', (message) => {
            console.log(`Message from user ${message.userId} in chatroom ${message.chatroomId}: ${message.content}`);
            io.to(message.chatroomId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
