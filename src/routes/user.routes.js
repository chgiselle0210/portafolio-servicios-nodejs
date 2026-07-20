const express = require('express');
const {
    body,
    param,
} = require('express-validator');

const {
    createNewUser,
    deleteUser,
} = require('../controllers/user.controller');

const {
    authenticateToken,
    authorizeRole,
} = require('../middleware/auth.middleware');

const {
    validateRequest,
} = require('../middleware/validation.middleware');

const router = express.Router();

const createUserValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            'El nombre debe contener entre 2 y 100 caracteres'
        ),

    body('email')
        .trim()
        .isEmail()
        .withMessage(
            'El correo electrónico no tiene un formato válido'
        )
        .normalizeEmail(),

    body('password')
        .isLength({
            min: 8,
        })
        .withMessage(
            'La contraseña debe contener al menos 8 caracteres'
        ),

    body('role')
        .optional()
        .isIn([
            'user',
            'admin',
        ])
        .withMessage(
            'El rol solo puede ser user o admin'
        ),

    validateRequest,
];

const deleteUserValidation = [
    param('id')
        .isInt({
            min: 1,
        })
        .withMessage(
            'El identificador del usuario no es válido'
        ),

    validateRequest,
];

router.post(
    '/',
    authenticateToken,
    authorizeRole('admin'),
    createUserValidation,
    createNewUser
);

router.delete(
    '/:id',
    authenticateToken,
    authorizeRole('admin'),
    deleteUserValidation,
    deleteUser
);

module.exports = router;