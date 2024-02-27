
const multer = require('multer');
const { Message, User } = require('../models');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sendMessage = async (req, res) => {
    try {

        const { userId, chatroomId } = req.body;
        const content = req.body.message;
        const file = req.file;

        let filePath = file ? file.path : null;

        console.log(Message);

        const newMessage = await Message.create({ userId, chatroomId, content, filePath });
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
                attributes: ['username', 'email']
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
