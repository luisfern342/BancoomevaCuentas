const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Reclamo = require('../modelos/reclamo')(sequelize, DataTypes);


module.exports.get = async(request, response) => {
    try {
        let reclamos = await Reclamo.findAll();

        response.json(reclamos);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se encontraron reclamos.', e.message]
            }
        });
    }

}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await Reclamo.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un reclamo con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID especificado.', e.message]
            }
        });
    }
}


module.exports.getByMovimientoId = async (request, response) => {
    try {
        let movimientoId = request.params['movimientoId'];

        let entidad = await Reclamo.findAll({where: {movimiento_id: movimientoId}});

        if (!entidad) {
            throw new Error('No existe un reclamo con el ID de movimiento especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID de movimiento especificado.', e.message]
            }
        });
    }
}


module.exports.getByRespuestaId = async (request, response) => {
    try {
        let respuestaId = request.params['respuestaId'];

        let entidades = await Reclamo.findAll({where: {respuesta_id: respuestaId}});

        if (!entidades) {
            throw new Error('No existe un reclamo con el ID de respuesta especificado.');
        }

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID de respuesta especificado.', e.message]
            }
        });
    }
}


module.exports.getByUsuarioId = async (request, response) => {
    try {
        let usuarioId = request.params['usuarioId'];

        let entidades = await Reclamo.findAll({where: {usuario_id: usuarioId}});

        if (!entidades) {
            throw new Error('No existe un reclamo con el ID de usuario especificado.');
        }

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID de usuario especificado.', e.message]
            }
        });
    }
}


module.exports.post = async (request, response) => {
    try {
        let observacion = request.body['observacion'];
        let movimientoId = request.body['movimientoId'];
        let respuestaId = request.body['respuestaId'];
        let usuarioId = request.body['usuarioId'];

        let solicitud = {
            observacion: observacion,
            movimiento_id: movimientoId,
            respuesta_id: respuestaId,
            usuario_id: usuarioId
        }

        solicitud = await Reclamo.create(solicitud);

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
