const express = require('express');

const {
    register,
    login,
    getProfile,
    getAdminArea,
} = require('../controllers/auth.controller');

const {
    registerValidation,
    loginValidation,
    validateRequest,
} = require('../middleware/validation.middleware');

const {
    authenticateToken,
    authorizeRoles,
} = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
    '/register',
    registerValidation,
    validateRequest,
    register
);

router.post(
    '/login',
    loginValidation,
    validateRequest,
    login
);

router.get(
    '/profile',
    authenticateToken,
    getProfile
);

router.get(
    '/admin',
    authenticateToken,
    authorizeRoles('admin'),
    getAdminArea
);

module.exports = router;