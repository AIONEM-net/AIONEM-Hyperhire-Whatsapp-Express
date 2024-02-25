const { Message, User } = require('../models');

const sendMessage = async (req, res) => {
    try {
        const { userId, chatroomId, content } = req.body;
        const newMessage = await Message.create({ userId, chatroomId, content });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMessagesByChatroom = async (req, res) => {
    try {
        const { chatroomId } = req.params;
        const messages = await Message.findAll({
            where: { chatroomId },
            include: [{
                model: User,
                attributes: ['username', 'email'] // Adjust attributes as needed
            }]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Message.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessagesByChatroom,
    deleteMessage
};
