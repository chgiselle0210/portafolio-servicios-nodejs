const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const indexRoutes = require('./routes/index.routes');
const {
    notFoundHandler,
    errorHandler,
} = require('./middleware/error.middleware');

const app = express();

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Demasiadas solicitudes',
        mensaje:
            'Has superado el límite de solicitudes. Intenta nuevamente más tarde.',
    },
});

app.disable('x-powered-by');

app.use(helmet());
app.use(generalLimiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.use('/', indexRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;