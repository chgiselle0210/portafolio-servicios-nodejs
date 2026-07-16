const {
    body,
    param,
} = require('express-validator');

const createServiceValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título del servicio es obligatorio')
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage(
            'El título debe contener entre 3 y 120 caracteres'
        ),

    body('description')
        .trim()
        .notEmpty()
        .withMessage(
            'La descripción del servicio es obligatoria'
        )
        .isLength({
            min: 10,
            max: 2000,
        })
        .withMessage(
            'La descripción debe contener entre 10 y 2000 caracteres'
        ),

    body('category')
        .trim()
        .notEmpty()
        .withMessage(
            'La categoría del servicio es obligatoria'
        )
        .isLength({
            min: 2,
            max: 80,
        })
        .withMessage(
            'La categoría debe contener entre 2 y 80 caracteres'
        ),

    body('price')
        .notEmpty()
        .withMessage('El precio del servicio es obligatorio')
        .isFloat({
            min: 0,
        })
        .withMessage(
            'El precio debe ser un número igual o mayor que cero'
        ),

    body('status')
        .optional()
        .isIn([
            'draft',
            'active',
            'inactive',
        ])
        .withMessage(
            'El estado debe ser draft, active o inactive'
        ),
];

const updateServiceValidation = [
    body('title')
        .optional()
        .trim()
        .isLength({
            min: 3,
            max: 120,
        })
        .withMessage(
            'El título debe contener entre 3 y 120 caracteres'
        ),

    body('description')
        .optional()
        .trim()
        .isLength({
            min: 10,
            max: 2000,
        })
        .withMessage(
            'La descripción debe contener entre 10 y 2000 caracteres'
        ),

    body('category')
        .optional()
        .trim()
        .isLength({
            min: 2,
            max: 80,
        })
        .withMessage(
            'La categoría debe contener entre 2 y 80 caracteres'
        ),

    body('price')
        .optional()
        .isFloat({
            min: 0,
        })
        .withMessage(
            'El precio debe ser un número igual o mayor que cero'
        ),

    body('status')
        .optional()
        .isIn([
            'draft',
            'active',
            'inactive',
        ])
        .withMessage(
            'El estado debe ser draft, active o inactive'
        ),

    body()
        .custom((value) => {
            const allowedFields = [
                'title',
                'description',
                'category',
                'price',
                'status',
            ];

            const containsAllowedField =
                allowedFields.some(
                    (field) => value[field] !== undefined
                );

            if (!containsAllowedField) {
                throw new Error(
                    'Debes proporcionar al menos un campo válido para actualizar'
                );
            }

            return true;
        }),
];

const serviceIdValidation = [
    param('id')
        .isInt({
            min: 1,
        })
        .withMessage(
            'El identificador del servicio debe ser un entero positivo'
        ),
];

module.exports = {
    createServiceValidation,
    updateServiceValidation,
    serviceIdValidation,
};