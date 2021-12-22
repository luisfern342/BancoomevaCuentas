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


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await TipoDocumento.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un tipo de documento con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un tipo de documento por el ID especificado.', e.message]
            }
        });
    }
}
