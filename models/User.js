const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model{
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     },
        // },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9]+$/i,
                len: [4, 16]
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            /* Before adding this add logic to check if password is the same */
            afterUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(newUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: true,
        updatedAt: false,
        // freezeTableName: true,
        underscored: true
    }
);

module.exports = User;