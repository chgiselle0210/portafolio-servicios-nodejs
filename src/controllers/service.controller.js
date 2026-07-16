const {
    createService,
    findAllServicesByUser,
    findServiceByIdAndUser,
    updateServiceByIdAndUser,
    deleteServiceByIdAndUser,
} = require('../services/service.service');

const create = async (req, res, next) => {
    try {
        const service = await createService({
            ...req.body,
            userId: req.user.id,
        });

        return res.status(201).json({
            mensaje: 'Servicio creado correctamente',
            servicio: service,
        });
    } catch (error) {
        return next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const services = await findAllServicesByUser(
            req.user.id
        );

        return res.status(200).json({
            mensaje: 'Servicios consultados correctamente',
            total: services.length,
            servicios: services,
        });
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const service = await findServiceByIdAndUser(
            req.params.id,
            req.user.id
        );

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado',
            });
        }

        return res.status(200).json({
            mensaje: 'Servicio consultado correctamente',
            servicio: service,
        });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const service = await updateServiceByIdAndUser(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado',
            });
        }

        return res.status(200).json({
            mensaje: 'Servicio actualizado correctamente',
            servicio: service,
        });
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const service = await deleteServiceByIdAndUser(
            req.params.id,
            req.user.id
        );

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado',
            });
        }

        return res.status(200).json({
            mensaje: 'Servicio eliminado correctamente',
            servicio: service,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};