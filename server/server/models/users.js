module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
    Users.associate = function(models) {
    // associations can be defined here
    };
    return Users;
};
