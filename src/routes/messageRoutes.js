const express = require('express');
const { sendMessage, getMessagesByChatroom, deleteMessage } = require('../controllers/messages');

const router = express.Router();

// Route to send a new message
router.post('/', sendMessage);

// Route to get all messages in a specific chatroom
router.get('/chatroom/:chatroomId', getMessagesByChatroom);

// Route to delete a specific message by ID
router.delete('/:id', deleteMessage);

module.exports = router;
