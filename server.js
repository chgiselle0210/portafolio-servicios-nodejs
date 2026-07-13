require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
    console.log(
        `Entorno actual: ${process.env.NODE_ENV || 'development'}`
    );
});

const closeServer = (signal) => {
    console.log(`\nSe recibió ${signal}. Cerrando el servidor...`);

    server.close(() => {
        console.log('Servidor cerrado correctamente.');
        process.exit(0);
    });
};

process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));