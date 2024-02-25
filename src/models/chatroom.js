module.exports = (sequelize, DataTypes) => {
    const Chatroom = sequelize.define('Chatroom', {
        // Define attributes
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true // Allowing null if you want to make the description optional
        }
        // You can add more attributes here if needed
    }, {
        // Model options
        tableName: 'chatrooms',
        timestamps: true // Enables createdAt and updatedAt fields
    });

    return Chatroom;
};
