const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Movimiento = require('../modelos/movimiento')(sequelize, DataTypes);


module.exports.get = async(request, response) => {
    try {
        let entidades = await Movimiento.findAll();

        response.json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se encontraron movimientos.', e.message]
            }
        });
    }

}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await Movimiento.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un movimiento con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un movimiento por el ID especificado.', e.message]
            }
        });
    }
}


module.exports.getByTipoMovimientoId = async (request, response) => {
    try {
        let tipoMovimientoId = request.params['tipoMovimientoId'];

        let entidad = await Movimiento.findAll({where: {tipo_movimiento_id: tipoMovimientoId}});

        if (!entidad) {
            throw new Error('No existe un reclamo con el ID de tipo de movimiento especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID de tipo de movimiento especificado.', e.message]
            }
        });
    }
}


module.exports.getByCuentaId = async (request, response) => {
    try {
        let cuentaId = request.params['cuentaId'];

        let entidades = await Movimiento.findAll({where: {cuenta_id: cuentaId}});

        if (!entidades) {
            throw new Error('No existe un reclamo con el ID de cuenta especificado.');
        }

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un reclamo por el ID de cuenta especificado.', e.message]
            }
        });
    }
}


module.exports.post = async (request, response) => {
    try {
        let monto = request.body['monto'];
        let tipoMovimientoId = request.body['tipoMovimientoId'];
        let cuentaId = request.body['cuentaId'];

        let movimiento = {
            monto: monto,
            tipo_movimiento_id: tipoMovimientoId,
            cuenta_id: cuentaId,
        }

        if (request.body['cuentaIdDestino']) {
            movimiento['cuenta_id_destino'] = request.body['cuentaIdDestino'];
        }

        movimiento = await Movimiento.create(movimiento);

        response.status(201).json(movimiento);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo crear la solicitud.', e.message]
            }
        });
    }
}
