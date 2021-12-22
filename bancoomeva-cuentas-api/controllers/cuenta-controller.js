const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const {hashPassword} = require("../utils/password");
const Cuenta = require('../modelos/cuenta')(sequelize, DataTypes);


module.exports.getCuentas = async(request, response) => {
    try {
        let cuentas = await Cuenta.findAll();

        response.json(cuentas);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar cuentas.', e.message]
            }
        });
    }
}


module.exports.getCuentaPorId = async (request, response) => {
    try {
        let id = request.params.id;

        let cuenta = await Cuenta.findByPk(id);

        if (!cuenta) {
            throw new Error('No existe una cuenta con el ID especificado.');
        }

        response.status(200).json(cuenta);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar cuentas.', e.message]
            }
        });
    }
}


module.exports.getCuentaPorNumero = async (request, response) => {
    try {
        let numero = request.params.numero;

        let cuenta = await Cuenta.findOne({where: {numero: numero}})

        if (!cuenta) {
            throw new Error('No existe una cuenta con el número especificado.');
        }

        response.status(200).json(cuenta);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar cuentas.', e.message]
            }
        });
    }
}


module.exports.getCuentasPorUsuarioId = async (request, response) => {
    try {
        let usuarioId = request.params['usuario_id'];

        let cuentas = await Cuenta.findAll({where: {usuario_id: usuarioId}})

        if (!cuentas) {
            throw new Error('No existen cuentas con el número especificado.');
        }

        response.status(200).json(cuentas);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar cuentas.', e.message]
            }
        });
    }
}


module.exports.crearCuenta = async (request, response) => {
    try {
        let numero = request.body['numero'];
        let saldo = request.body['saldo'];
        let clave = await hashPassword(request.body['clave']);
        let estadoId = request.body['estadoId'];
        let usuarioId = request.body['usuarioId'];

        let cuenta = {
            numero: numero,
            saldo: saldo,
            clave: clave,
            estado_id: estadoId,
            usuario_id: usuarioId
        }

        cuenta = await Cuenta.create(cuenta);

        response.status(201).json(cuenta);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo crear la cuenta.', e.message]
            }
        });
    }
}
