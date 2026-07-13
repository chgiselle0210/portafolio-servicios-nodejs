const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    findUserByEmail,
    createUser,
    getPublicUserData,
} = require('../services/user.service');

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error(
            'La variable JWT_SECRET no está configurada'
        );
    }

    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_EXPIRES_IN || '1h',
        }
    );
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                error: 'El correo electrónico ya está registrado',
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const newUser = createUser({
            name,
            email,
            password: hashedPassword,
            role: 'user',
        });

        const token = generateToken(newUser);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: getPublicUserData(newUser),
            token,
        });
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                error: 'Credenciales incorrectas',
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                error: 'Credenciales incorrectas',
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: getPublicUserData(user),
            token,
        });
    } catch (error) {
        return next(error);
    }
};

const getProfile = (req, res) => {
    res.status(200).json({
        mensaje: 'Perfil consultado correctamente',
        usuario: req.user,
    });
};

const getAdminArea = (req, res) => {
    res.status(200).json({
        mensaje:
            'Acceso autorizado al área administrativa',
        usuario: req.user,
    });
};

module.exports = {
    register,
    login,
    getProfile,
    getAdminArea,
};