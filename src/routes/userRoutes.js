const express = require('express');
const { createUser, getUser } = require('../controllers/users');

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

// Route to get a user by ID
router.get('/:id', getUser);

module.exports = router;
