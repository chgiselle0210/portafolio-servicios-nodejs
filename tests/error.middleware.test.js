const {
    notFoundHandler,
    errorHandler,
} = require('../src/middleware/error.middleware');

describe('Middleware de manejo de errores', () => {
    let consoleErrorSpy;
    const originalNodeEnv = process.env.NODE_ENV;

    beforeEach(() => {
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        process.env.NODE_ENV = originalNodeEnv;
        jest.clearAllMocks();
    });

    test('notFoundHandler debe responder con código 404', () => {
        const req = {
            originalUrl: '/ruta-inexistente',
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        notFoundHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ruta no encontrada',
            ruta: '/ruta-inexistente',
        });
    });

    test('errorHandler debe responder con código 500 por defecto', () => {
        process.env.NODE_ENV = 'test';

        const error = new Error('Error interno de prueba');

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        errorHandler(error, req, res, next);

        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error interno del servidor',
            mensaje: 'Ocurrió un error inesperado',
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('errorHandler debe mostrar el mensaje original en desarrollo', () => {
        process.env.NODE_ENV = 'development';

        const error = new Error('Error detallado de desarrollo');

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        errorHandler(error, req, res, next);

        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error interno del servidor',
            mensaje: 'Error detallado de desarrollo',
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('errorHandler debe respetar un código de estado personalizado', () => {
        process.env.NODE_ENV = 'test';

        const error = new Error('Solicitud incorrecta');
        error.status = 400;

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error interno del servidor',
            mensaje: 'Ocurrió un error inesperado',
        });
    });
});