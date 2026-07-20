const bcrypt = require('bcryptjs');
const { UniqueConstraintError } = require('sequelize');

const {
    findUserByEmail,
    createUser,
    deleteUserById,
    getSafeUserData,
} = require('../services/user.service');

const createNewUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            role = 'user',
        } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                error:
                    'El correo electrónico ya está registrado',
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario: getSafeUserData(user),
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({
                error:
                    'El correo electrónico ya está registrado',
            });
        }

        return next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);

        if (req.user.id === userId) {
            return res.status(400).json({
                error:
                    'El administrador no puede eliminar su propia cuenta',
            });
        }

        const deletedUser = await deleteUserById(userId);

        if (!deletedUser) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario eliminado correctamente',
            usuario: deletedUser,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createNewUser,
    deleteUser,
};