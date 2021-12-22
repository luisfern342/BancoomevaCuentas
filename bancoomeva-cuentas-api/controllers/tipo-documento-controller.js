const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const TipoDocumento = require('../modelos/tipo_documento')(sequelize, DataTypes);

module.exports.getTiposDocumentos = async(request, response) => {
    try {
        let tiposDocumentos = await TipoDocumento.findAll();

        response.json({tiposDocumentos});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar tipos de documentos.', e.message]
            }
        });
    }
}
