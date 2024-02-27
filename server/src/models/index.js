const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

const User = require('./user')(sequelize, DataTypes);
const Chatroom = require('./chatroom')(sequelize, DataTypes);
const Message = require('./message')(sequelize, DataTypes);

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

Chatroom.hasMany(Message, { foreignKey: 'chatroomId' });
Message.belongsTo(Chatroom, { foreignKey: 'chatroomId' });

const db = {
    sequelize,
    Sequelize,
    models: {
        User,
        Chatroom,
        Message
    }
};

async function syncDb() {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
}

syncDb().catch(console.error);

module.exports = db;
