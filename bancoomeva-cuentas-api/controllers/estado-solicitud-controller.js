const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const EstadoSolicitud = require('../modelos/estado_solicitud')(sequelize, DataTypes);


module.exports.getEstadosSolicitudes = async(request, response) => {
    try {
        let estadosSolicitudes = await EstadoSolicitud.findAll();

        response.json({estadosSolicitudes});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar estados de solicitudes.', e.message]
            }
        });
    }
}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await EstadoSolicitud.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un estado de solicitud con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un estado de solicitud por el ID especificado.', e.message]
            }
        });
    }
}
