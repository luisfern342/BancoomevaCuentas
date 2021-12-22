const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const TipoMovimiento = require('../modelos/tipo_movimiento')(sequelize, DataTypes);

module.exports.getTiposMovimientos = async(request, response) => {
    try {
        let tiposDocumentos = await TipoMovimiento.findAll();

        response.json({tiposDocumentos});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar tipos de usuarios.', e.message]
            }
        });
    }
}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await TipoMovimiento.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un tipo de movimiento con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un tipo de movimiento por el ID especificado.', e.message]
            }
        });
    }
}
