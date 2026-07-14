const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize');

const {
    findUserByEmail,
    findUserById,
    createUser,
    getSafeUserData,
} = require('../services/user.service');

const generateToken = (user) =>
    jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        }
    );

const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                error: 'El correo electrónico ya está registrado',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await createUser({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: getSafeUserData(user),
            token,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({
                error: 'El correo electrónico ya está registrado',
            });
        }

        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await findUserByEmail(email, true);

        if (!user) {
            return res.status(401).json({
                error: 'Credenciales incorrectas',
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: 'Credenciales incorrectas',
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: getSafeUserData(user),
            token,
        });
    } catch (error) {
        return next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }

        return res.status(200).json({
            mensaje: 'Perfil consultado correctamente',
            usuario: getSafeUserData(user),
        });
    } catch (error) {
        return next(error);
    }
};

const getAdminResource = async (req, res) =>
    res.status(200).json({
        mensaje: 'Acceso administrativo concedido',
        usuario: req.user,
    });

module.exports = {
    register,
    login,
    getProfile,
    getAdminResource,
};