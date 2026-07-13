const jwt = require('jsonwebtoken');

const {
    findUserById,
    getPublicUserData,
} = require('../services/user.service');

const authenticateToken = (req, res, next) => {
    const authorizationHeader =
        req.headers.authorization;

    if (
        !authorizationHeader ||
        !authorizationHeader.startsWith('Bearer ')
    ) {
        return res.status(401).json({
            error: 'Token de autenticación no proporcionado',
        });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = findUserById(decodedToken.id);

        if (!user) {
            return res.status(401).json({
                error:
                    'El usuario asociado al token no existe',
            });
        }

        req.user = getPublicUserData(user);

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'El token ha expirado',
            });
        }

        return res.status(401).json({
            error: 'Token inválido',
        });
    }
};

const authorizeRoles =
    (...allowedRoles) =>
    (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error:
                    'No tienes autorización para acceder a este recurso',
            });
        }

        return next();
    };

module.exports = {
    authenticateToken,
    authorizeRoles,
};