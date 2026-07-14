const jwt = require('jsonwebtoken');

const {
    findUserById,
    getSafeUserData,
} = require('../services/user.service');

const authenticateToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
                error: 'Token de autenticación no proporcionado',
            });
        }

        const [scheme, token] = authorizationHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                error: 'Formato de token no válido',
            });
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await findUserById(decodedToken.id);

        if (!user) {
            return res.status(401).json({
                error: 'El usuario asociado al token ya no existe',
            });
        }

        req.user = getSafeUserData(user);

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'El token de autenticación ha expirado',
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Token de autenticación no válido',
            });
        }

        return next(error);
    }
};

const authorizeRole = (...allowedRoles) =>
    (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Usuario no autenticado',
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'No tienes autorización para acceder a este recurso',
            });
        }

        return next();
    };

module.exports = {
    authenticateToken,
    authorizeRole,
};