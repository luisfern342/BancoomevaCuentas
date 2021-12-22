const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const {hashPassword} = require("../utils/password");
const Solicitud = require('../modelos/solicitud')(sequelize, DataTypes);


module.exports.getSolicitudes = async(request, response) => {
    try {
        let solicitudes = await Solicitud.findAll();

        response.json(solicitudes);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar solicitudes.', e.message]
            }
        });
    }

}


module.exports.getSolicitudPorId = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await Solicitud.findByPk(id);

        if (!entidad) {
            throw new Error('No existe una solicitud con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar una solicitud por el ID especificado.', e.message]
            }
        });
    }
}


module.exports.getSolicitudPorCuentaId = async (request, response) => {
    try {
        let cuentaId = request.params['cuentaId'];

        let entidad = await Solicitud.findOne({where: {cuenta_id: cuentaId}});

        if (!entidad) {
            throw new Error('No existe una solicitud con el ID de cuenta especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar una solicitud por el ID de cuenta especificado.', e.message]
            }
        });
    }
}


module.exports.getSolicitudesPorUsuarioId = async (request, response) => {
    try {
        let usuarioId = request.params['usuarioId'];

        let entidades = await Solicitud.findAll({where: {usuario_id: usuarioId}})

        if (!entidades) {
            throw new Error('No existe una solicitud con el ID especificado.');
        }

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar una solicitud por el ID de usuario especificado.', e.message]
            }
        });
    }
}


module.exports.getSolicitudPorEstadoSolicitudId = async (request, response) => {
    try {
        let estadoSolicitudId = request.params['estadoSolicitudId'];

        let entidades = await Solicitud.findAll({where: {estado_solicitud_id: estadoSolicitudId}})

        if (!entidades) {
            throw new Error('No existe una solicitud con el ID de Estado de Solicitud especificado.');
        }

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar una solicitud por el ID especificado.', e.message]
            }
        });
    }
}


module.exports.crearSolicitud = async (request, response) => {
    try {
        let cuentaId = request.body['cuentaId'];
        let estadoSolicitudId = request.body['estadoSolicitudId'];
        let usuarioId = request.body['usuarioId'];

        let solicitud = {
            cuenta_id: cuentaId,
            estado_solicitud_id: estadoSolicitudId,
            usuario_id: usuarioId
        }

        solicitud = await Solicitud.create(solicitud);

        response.status(201).json(solicitud);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo crear la solicitud.', e.message]
            }
        });
    }
}
