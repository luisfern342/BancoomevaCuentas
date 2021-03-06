const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../dbConnection');
const Usuario = require('../modelos/usuario')(sequelize, DataTypes);

const {hashPassword, matchPassword} = require('../utils/password');

const {sign, decode} = require('../utils/jwt');


module.exports.createCliente = async (request, response) => {
    try {
        let nombreCompleto = request.body['nombreCompleto'];
        let documento = request.body['documento'];
        let fechaExpedicion = request.body['fechaExpedicion'];
        let fechaNacimiento = request.body['fechaNacimiento'];
        let email = request.body.email;
        let direccion = request.body['direccion'];
        let password = await hashPassword(request.body.password);
        let tipoDocumentoId = request.body['tipoDocumentoId'];
        let tipoUsuarioId = request.body['tipoUsuarioId'];

        const usuario = await Usuario.create({
            nombre_completo: nombreCompleto,
            documento: documento,
            fecha_expedicion: fechaExpedicion,
            fecha_nacimiento: fechaNacimiento,
            email: email,
            direccion: direccion,
            password: password,
            tipo_documento_id: tipoDocumentoId,
            tipo_usuario_id: tipoUsuarioId
        });

        response.status(201).json({cliente: usuario});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo crear el cliente.', e.message]
            }
        });
    }
}


module.exports.existsClientePorEmail = async (request, response) => {
    try {

        let email = request.query.email;

        let usuario = await Usuario.findOne({where: {email: email}});

        if (usuario) {
            throw new Error('Un usuario con el email indicado ya existe.');
        }

        response.status(200).json({data: `No existe un usuario con el email ${email}`});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['Hay problemas con la consulta del cliente.', e.message]
            }
        });
    }
}


module.exports.existsClientePorDocumento = async (request, response) => {
    try {
        let documento = request.query.documento;

        let usuario = await Usuario.findOne({where: {documento: documento}});

        if (usuario) {
            throw new Error('Un usuario con el documento indicado ya existe.');
        }

        response.status(200).json({data: `No existe un usuario con el documento ${documento}.`});
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['Hay problemas con la consulta del cliente.', e.message]
            }
        });
    }
}


module.exports.loginCliente = async (request, response) => {
    try {
        let email = request.body.email;
        let password = request.body.password;

        let usuario = await Usuario.findOne({where: {email: email}});

        console.log(email, password);
        console.log(usuario);

        if (!usuario) {
            response.status(401);
            throw new Error('No existe un usuario con el email especificado.');
        }

        const passwordMath = await matchPassword(usuario.password, password);

        if (!passwordMath) {
            response.status(401);
            throw new Error('Las credenciales no son v??lidas. Intente nuevamente.');
        }

        usuario['authData'] = await sign({email: email, username: usuario.id});

        response.status(200).json(usuario);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['Hay problemas con el login.', e.message]
            }
        });
    }
}


module.exports.getById = async (request, response) => {
    try {
        let id = request.params.id;

        let entidad = await Usuario.findByPk(id);

        if (!entidad) {
            throw new Error('No existe un usuario con el ID especificado.');
        }

        response.status(200).json(entidad);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se pudo encontrar un usuario por el ID especificado.', e.message]
            }
        });
    }
}


module.exports.get = async (request, response) => {
    try {
        let entidades = await Usuario.findAll();

        response.status(200).json(entidades);
    } catch (e) {
        const code = response.statusCode ? response.statusCode : 422;
        return response.status(code).json({
            errors: {
                body: ['No se encontraron usuarios.', e.message]
            }
        });
    }
}
