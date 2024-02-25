const express = require('express');
const { createChatroom, getChatroom, getAllChatrooms } = require('../controllers/chatrooms');

const router = express.Router();

// Route to create a new chatroom
router.post('/', createChatroom);

// Route to get a specific chatroom by ID
router.get('/:id', getChatroom);

// Route to get all chatrooms
router.get('/', getAllChatrooms);

module.exports = router;
