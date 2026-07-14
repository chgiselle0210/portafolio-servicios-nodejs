const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El nombre es obligatorio',
                },
                len: {
                    args: [2, 100],
                    msg: 'El nombre debe contener entre 2 y 100 caracteres',
                },
            },
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: {
                name: 'usuarios_email_unique',
                msg: 'El correo electrónico ya está registrado',
            },
            validate: {
                isEmail: {
                    msg: 'El correo electrónico no tiene un formato válido',
                },
            },
            set(value) {
                this.setDataValue(
                    'email',
                    value.trim().toLowerCase()
                );
            },
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true,
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ['password'],
                },
            },
        },
    }
);

module.exports = User;