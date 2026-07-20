require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user.routes');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/service.routes');

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
app.use(
    express.urlencoded({
        extended: false,
        limit: '10kb',
    })
);

app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;