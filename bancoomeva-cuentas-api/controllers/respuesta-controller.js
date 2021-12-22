const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Respuesta = require('../modelos/respuesta')(sequelize, DataTypes);

module.exports.getRespuestas = async(request, response) => {
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
