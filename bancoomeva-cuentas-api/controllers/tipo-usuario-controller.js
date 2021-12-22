const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const TipoUsuario = require('../modelos/tipo_usuario')(sequelize, DataTypes);

module.exports.getTiposUsuarios = async(request, response) => {
    try {
        let tiposUsuarios = await TipoUsuario.findAll();

        response.json({tiposUsuarios});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar tipos de documentos.', e.message]
            }
        });
    }
}
