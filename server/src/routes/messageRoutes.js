const express = require('express');
const { sendMessage, getMessagesByChatroom, deleteMessage } = require('../controllers/messages');

const router = express.Router();

router.post('/', sendMessage);

router.get('/chatroom/:chatroomId', getMessagesByChatroom);

router.delete('/:id', deleteMessage);

module.exports = router;
