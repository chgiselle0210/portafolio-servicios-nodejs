require('./src/config/env');

const app = require('./src/app');

const {
    testDatabaseConnection,
    sequelize,
} = require('./src/config/database');

require('./src/models/user.model');
require('./src/models/service.model');

const PORT = Number(process.env.PORT) || 3000;

let server;

const startServer = async () => {
    try {
        await testDatabaseConnection();

        /*
         * En desarrollo, Sequelize puede actualizar la estructura
         * de las tablas automáticamente.
         *
         * En pruebas y producción no se utiliza alter para evitar
         * modificaciones inesperadas en la base de datos.
         */
        await sequelize.sync({
            alter: process.env.NODE_ENV === 'development',
        });

        server = app.listen(PORT, () => {
            console.log(
                `Servidor ejecutándose en http://localhost:${PORT}`
            );

            console.log(
                `Entorno actual: ${process.env.NODE_ENV}`
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

    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                });
            });
        }

        await sequelize.close();

        console.log(
            'Servidor y conexión de base de datos cerrados correctamente.'
        );

        process.exit(0);
    } catch (error) {
        console.error(
            'Ocurrió un error al cerrar la aplicación:',
            error.message
        );

        process.exit(1);
    }
};

process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));

startServer();