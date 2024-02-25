module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Define attributes
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
        // You can add more attributes here
    }, {
        // Model options
        tableName: 'users',
        timestamps: true // Enables createdAt and updatedAt fields
    });

    return User;
};
