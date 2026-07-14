const User = require('../models/user.model');

const findUserByEmail = async (email, includePassword = false) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (includePassword) {
        return User.scope('withPassword').findOne({
            where: {
                email: normalizedEmail,
            },
        });
    }

    return User.findOne({
        where: {
            email: normalizedEmail,
        },
    });
};

const findUserById = async (id) =>
    User.findByPk(Number(id));

const createUser = async ({
    name,
    email,
    password,
    role = 'user',
}) =>
    User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
    });

const getSafeUserData = (user) => {
    if (!user) {
        return null;
    }

    const plainUser = user.get
        ? user.get({ plain: true })
        : { ...user };

    delete plainUser.password;

    return plainUser;
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getSafeUserData,
};