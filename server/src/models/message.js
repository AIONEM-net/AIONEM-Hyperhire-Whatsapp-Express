module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        chatroomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chatroom',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'messages',
        timestamps: true
    });

    return Message;
};
