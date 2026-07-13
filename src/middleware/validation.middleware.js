const {
    body,
    validationResult,
} = require('express-validator');

const registerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 80 })
        .withMessage(
            'El nombre debe tener entre 2 y 80 caracteres'
        )
        .matches(/^[\p{L}\s'-]+$/u)
        .withMessage(
            'El nombre contiene caracteres no permitidos'
        ),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage(
            'Debes proporcionar un correo electrónico válido'
        )
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8, max: 64 })
        .withMessage(
            'La contraseña debe tener entre 8 y 64 caracteres'
        )
        .matches(/[A-Z]/)
        .withMessage(
            'La contraseña debe incluir una letra mayúscula'
        )
        .matches(/[a-z]/)
        .withMessage(
            'La contraseña debe incluir una letra minúscula'
        )
        .matches(/[0-9]/)
        .withMessage(
            'La contraseña debe incluir un número'
        )
        .matches(/[^A-Za-z0-9]/)
        .withMessage(
            'La contraseña debe incluir un carácter especial'
        ),
];

const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage(
            'Debes proporcionar un correo electrónico válido'
        )
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Datos de entrada no válidos',
            detalles: errors.array().map((error) => ({
                campo: error.path,
                mensaje: error.msg,
            })),
        });
    }

    return next();
};

module.exports = {
    registerValidation,
    loginValidation,
    validateRequest,
};