const express = require('express');
const { createChatroom, getChatroom, getAllChatrooms } = require('../controllers/chatrooms');

const router = express.Router();

router.post('/', createChatroom);

router.get('/:id', getChatroom);

router.get('/', getAllChatrooms);

module.exports = router;
