require('dotenv').config();

const app = require('./src/app');
const {
    testDatabaseConnection,
    sequelize,
} = require('./src/config/database');

require('./src/models/user.model');
require('./src/models/service.model');

const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
    try {
        await testDatabaseConnection();

        await sequelize.sync({
            alter: process.env.NODE_ENV === 'development',
        });

        server = app.listen(PORT, () => {
            console.log(
                `Servidor ejecutándose en http://localhost:${PORT}`
            );
            console.log(
                `Entorno actual: ${process.env.NODE_ENV || 'development'}`
            );
        });
    } catch (error) {
        console.error(
            'La aplicación no pudo iniciarse debido a un error de conexión.'
        );

        process.exit(1);
    }
};

const closeServer = async (signal) => {
    console.log(
        `\nSe recibió ${signal}. Cerrando la aplicación...`
    );

    if (server) {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    }

    await sequelize.close();

    console.log('Servidor y conexión de base de datos cerrados correctamente.');
    process.exit(0);
};

process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));

startServer();