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
