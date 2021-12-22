const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const EstadoCuenta = require('../modelos/estado_cuenta')(sequelize, DataTypes);

module.exports.get = async(request, response) => {
    try {
        let estados = await EstadoCuenta.findAll();

        response.json(estados);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar estados de cuentas.', e.message]
            }
        });
    }
}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await EstadoCuenta.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un estado de cuenta con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un estado de cuenta con el ID especificado.', e.message]
            }
        });
    }
}
