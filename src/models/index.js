const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/your/database.sqlite' // Update this path
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Chatroom = require('./chatroom')(sequelize, DataTypes);
const Message = require('./message')(sequelize, DataTypes);

// Define associations
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

Chatroom.hasMany(Message, { foreignKey: 'chatroomId' });
Message.belongsTo(Chatroom, { foreignKey: 'chatroomId' });

// This is a good place to create the associations between Users and Chatrooms if needed, e.g., through a UserChatrooms join table.

const db = {
    sequelize, // the sequelize instance
    Sequelize, // the Sequelize library
    models: {
        User,
        Chatroom,
        Message
    }
};

// Synchronize all models with the database
async function syncDb() {
    await sequelize.sync({ force: false }); // Use force: true carefully in development only
    console.log("Database synchronized");
}

syncDb().catch(console.error);

module.exports = db;
