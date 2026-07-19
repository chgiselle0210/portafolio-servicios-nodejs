require('./env');

const { Sequelize } = require('sequelize');

const requiredDatabaseVariables = [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
];

const missingVariables = requiredDatabaseVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    throw new Error(
        `Faltan variables de entorno para la base de datos: ${missingVariables.join(', ')}`
    );
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        logging:
            process.env.NODE_ENV === 'development'
                ? console.log
                : false,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();

        console.log(
            'Conexión con la base de datos establecida correctamente.'
        );
    } catch (error) {
        console.error(
            'No fue posible conectar con la base de datos:',
            error.message
        );

        throw error;
    }
};

module.exports = {
    sequelize,
    testDatabaseConnection,
};