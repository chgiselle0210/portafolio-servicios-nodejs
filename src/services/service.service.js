const Service = require('../models/service.model');

const createService = async ({
    title,
    description,
    category,
    price,
    status = 'draft',
    userId,
}) =>
    Service.create({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        price,
        status,
        userId,
    });

const findAllServicesByUser = async (userId) =>
    Service.findAll({
        where: {
            userId,
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    });

const findServiceByIdAndUser = async (id, userId) =>
    Service.findOne({
        where: {
            id: Number(id),
            userId,
        },
    });

const updateServiceByIdAndUser = async (
    id,
    userId,
    serviceData
) => {
    const service = await findServiceByIdAndUser(
        id,
        userId
    );

    if (!service) {
        return null;
    }

    const allowedFields = [
        'title',
        'description',
        'category',
        'price',
        'status',
    ];

    const dataToUpdate = {};

    allowedFields.forEach((field) => {
        if (serviceData[field] !== undefined) {
            dataToUpdate[field] =
                typeof serviceData[field] === 'string'
                    ? serviceData[field].trim()
                    : serviceData[field];
        }
    });

    await service.update(dataToUpdate);

    return service;
};

const deleteServiceByIdAndUser = async (id, userId) => {
    const service = await findServiceByIdAndUser(
        id,
        userId
    );

    if (!service) {
        return null;
    }

    await service.destroy();

    return service;
};

module.exports = {
    createService,
    findAllServicesByUser,
    findServiceByIdAndUser,
    updateServiceByIdAndUser,
    deleteServiceByIdAndUser,
};