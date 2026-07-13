const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        ruta: req.originalUrl,
    });
};

const errorHandler = (error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500).json({
        error: 'Error interno del servidor',
        mensaje:
            process.env.NODE_ENV === 'development'
                ? error.message
                : 'Ocurrió un error inesperado',
    });
};

module.exports = {
    notFoundHandler,
    errorHandler,
};