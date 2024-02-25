const { Chatroom } = require('../models');

const createChatroom = async (req, res) => {
    try {
        const { name } = req.body;
        const newChatroom = await Chatroom.create({ name });
        res.status(201).json(newChatroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getChatroom = async (req, res) => {
    try {
        const { id } = req.params;
        const chatroom = await Chatroom.findByPk(id);
        if (chatroom) {
            res.status(200).json(chatroom);
        } else {
            res.status(404).json({ error: 'Chatroom not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.findAll();
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createChatroom,
    getChatroom,
    getAllChatrooms
};
