const users = [];

let nextUserId = 1;

const findUserByEmail = (email) =>
    users.find(
        (user) => user.email === email.toLowerCase()
    );

const findUserById = (id) =>
    users.find((user) => user.id === Number(id));

const createUser = ({
    name,
    email,
    password,
    role = 'user',
}) => {
    const newUser = {
        id: nextUserId,
        name,
        email: email.toLowerCase(),
        password,
        role,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    nextUserId += 1;

    return newUser;
};

const getPublicUserData = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getPublicUserData,
};