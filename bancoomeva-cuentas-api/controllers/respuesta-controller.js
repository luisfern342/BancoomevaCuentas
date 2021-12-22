const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Respuesta = require('../modelos/respuesta')(sequelize, DataTypes);

module.exports.getRespuestas = async (request, response) => {
    try {
        let respuestas = await Respuesta.findAll();

        response.json({respuestas});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar respuestas.', e.message]
            }
        });
    }
}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await Respuesta.findByPk(id);

        if (!entidad) {
            throw new Error('No existe una respuesta con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar una respuesta por el ID especificado.', e.message]
            }
        });
    }
}
