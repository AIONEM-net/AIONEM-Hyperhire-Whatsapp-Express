module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        // Define attributes
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
        }
        // You can add more attributes here if needed, such as message type or attachments
    }, {
        // Model options
        tableName: 'messages',
        timestamps: true // Enables createdAt and updatedAt fields
    });

