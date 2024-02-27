module.exports = (sequelize, DataTypes) => {
    const Chatroom = sequelize.define('Chatroom', {
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
            allowNull: true
        }
    }, {
        tableName: 'chatrooms',
        timestamps: true
    });

    return Chatroom;
};
