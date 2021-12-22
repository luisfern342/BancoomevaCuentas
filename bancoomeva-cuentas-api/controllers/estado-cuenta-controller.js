const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const EstadoCuenta = require('../modelos/estado_cuenta')(sequelize, DataTypes);

module.exports.get = async(request, response) => {
    try {
        let estados = await EstadoCuenta.findAll();

        response.json(estados);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudieron encontrar estados de cuentas.', e.message]
            }
        });
    }
}
