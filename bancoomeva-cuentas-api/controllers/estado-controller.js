const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Estado = require('../modelos/estado')(sequelize, DataTypes);

module.exports.getEstadosSolicitudes = async(request, response) => {
    try {
        let estados = await Estado.findAll();

        response.json({estados});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar estados de cuentas.', e.message]
            }
        });
    }
}
