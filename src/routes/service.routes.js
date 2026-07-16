const express = require('express');

const {
    create,
    getAll,
    getById,
    update,
    remove,
} = require('../controllers/service.controller');

const {
    authenticateToken,
} = require('../middleware/auth.middleware');

const {
    validateRequest,
} = require('../middleware/validation.middleware');

const {
    createServiceValidation,
    updateServiceValidation,
    serviceIdValidation,
} = require(
    '../middleware/service.validation.middleware'
);

const router = express.Router();

router.use(authenticateToken);

router.post(
    '/',
    createServiceValidation,
    validateRequest,
    create
);

router.get(
    '/',
    getAll
);

router.get(
    '/:id',
    serviceIdValidation,
    validateRequest,
    getById
);

router.put(
    '/:id',
    serviceIdValidation,
    updateServiceValidation,
    validateRequest,
    update
);

router.delete(
    '/:id',
    serviceIdValidation,
    validateRequest,
    remove
);

module.exports = router;