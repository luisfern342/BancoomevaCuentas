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


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await TipoUsuario.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un tipo de usuario con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un tipo de usuario por el ID especificado.', e.message]
            }
        });
    }
}
