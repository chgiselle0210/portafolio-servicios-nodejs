const request = require('supertest');

const app = require('../src/app');

describe('Rutas generales de la aplicación', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('GET / debe responder con el estado del servidor', async () => {
        const response = await request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual({
            nombre: 'Portafolio de Servicios en Node.js',
            mensaje: 'Servidor funcionando correctamente',
            estado: 'activo',
        });
    });

    test('GET /event-loop debe demostrar el comportamiento asíncrono', async () => {
        const response = await request(app)
            .get('/event-loop')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty(
            'mensaje',
            'Demostración del Event Loop ejecutada correctamente'
        );

        expect(response.body.explicacion).toContain(
            'comportamiento asíncrono y no bloqueante'
        );

        jest.runAllTimers();
    });

    test('Una ruta inexistente debe responder con 404', async () => {
        const response = await request(app)
            .get('/ruta-que-no-existe')
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body).toEqual({
            error: 'Ruta no encontrada',
            ruta: '/ruta-que-no-existe',
        });
    });
});