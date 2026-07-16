const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');
const User = require('./user.model');

const Service = sequelize.define(
    'Service',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING(120),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El título del servicio es obligatorio',
                },
                len: {
                    args: [3, 120],
                    msg: 'El título debe contener entre 3 y 120 caracteres',
                },
            },
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La descripción del servicio es obligatoria',
                },
                len: {
                    args: [10, 2000],
                    msg: 'La descripción debe contener entre 10 y 2000 caracteres',
                },
            },
        },

        category: {
            type: DataTypes.STRING(80),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La categoría del servicio es obligatoria',
                },
                len: {
                    args: [2, 80],
                    msg: 'La categoría debe contener entre 2 y 80 caracteres',
                },
            },
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: 'El precio debe ser un valor numérico válido',
                },
                min: {
                    args: [0],
                    msg: 'El precio no puede ser negativo',
                },
            },
        },

        status: {
            type: DataTypes.ENUM(
                'draft',
                'active',
                'inactive'
            ),
            allowNull: false,
            defaultValue: 'draft',
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'user_id',
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        tableName: 'servicios',
        timestamps: true,
        underscored: true,
    }
);

User.hasMany(Service, {
    foreignKey: 'userId',
    as: 'services',
});

Service.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner',
});

module.exports = Service;