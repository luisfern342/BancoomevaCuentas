var DataTypes = require("sequelize").DataTypes;
var _cuenta = require("./cuenta");
var _estado_cuenta = require("./estado_cuenta");
var _estado_solicitud = require("./estado_solicitud");
var _movimiento = require("./movimiento");
var _reclamo = require("./reclamo");
var _respuesta = require("./respuesta");
var _solicitud = require("./solicitud");
var _tipo_documento = require("./tipo_documento");
var _tipo_movimiento = require("./tipo_movimiento");
var _tipo_usuario = require("./tipo_usuario");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var cuenta = _cuenta(sequelize, DataTypes);
  var estado_cuenta = _estado_cuenta(sequelize, DataTypes);
  var estado_solicitud = _estado_solicitud(sequelize, DataTypes);
  var movimiento = _movimiento(sequelize, DataTypes);
  var reclamo = _reclamo(sequelize, DataTypes);
  var respuesta = _respuesta(sequelize, DataTypes);
  var solicitud = _solicitud(sequelize, DataTypes);
  var tipo_documento = _tipo_documento(sequelize, DataTypes);
  var tipo_movimiento = _tipo_movimiento(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  movimiento.belongsTo(cuenta, { as: "cuentum", foreignKey: "cuenta_id"});
  cuenta.hasMany(movimiento, { as: "movimientos", foreignKey: "cuenta_id"});
  movimiento.belongsTo(cuenta, { as: "cuenta_id_destino_cuentum", foreignKey: "cuenta_id_destino"});
  cuenta.hasMany(movimiento, { as: "cuenta_id_destino_movimientos", foreignKey: "cuenta_id_destino"});
  solicitud.belongsTo(cuenta, { as: "cuentum", foreignKey: "cuenta_id"});
  cuenta.hasMany(solicitud, { as: "solicituds", foreignKey: "cuenta_id"});
  cuenta.belongsTo(estado_cuenta, { as: "estado", foreignKey: "estado_id"});
  estado_cuenta.hasMany(cuenta, { as: "cuenta", foreignKey: "estado_id"});
  solicitud.belongsTo(estado_solicitud, { as: "estado_solicitud", foreignKey: "estado_solicitud_id"});
  estado_solicitud.hasMany(solicitud, { as: "solicituds", foreignKey: "estado_solicitud_id"});
  reclamo.belongsTo(movimiento, { as: "movimiento", foreignKey: "movimiento_id"});
  movimiento.hasMany(reclamo, { as: "reclamos", foreignKey: "movimiento_id"});
  reclamo.belongsTo(respuesta, { as: "respuestum", foreignKey: "respuesta_id"});
  respuesta.hasMany(reclamo, { as: "reclamos", foreignKey: "respuesta_id"});
  usuario.belongsTo(tipo_documento, { as: "tipo_documento", foreignKey: "tipo_documento_id"});
  tipo_documento.hasMany(usuario, { as: "usuarios", foreignKey: "tipo_documento_id"});
  movimiento.belongsTo(tipo_movimiento, { as: "tipo_movimiento", foreignKey: "tipo_movimiento_id"});
  tipo_movimiento.hasMany(movimiento, { as: "movimientos", foreignKey: "tipo_movimiento_id"});
  usuario.belongsTo(tipo_usuario, { as: "tipo_usuario", foreignKey: "tipo_usuario_id"});
  tipo_usuario.hasMany(usuario, { as: "usuarios", foreignKey: "tipo_usuario_id"});
  cuenta.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id"});
  usuario.hasMany(cuenta, { as: "cuenta", foreignKey: "usuario_id"});
  reclamo.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id"});
  usuario.hasMany(reclamo, { as: "reclamos", foreignKey: "usuario_id"});
  solicitud.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id"});
  usuario.hasMany(solicitud, { as: "solicituds", foreignKey: "usuario_id"});

  return {
    cuenta,
    estado_cuenta,
    estado_solicitud,
    movimiento,
    reclamo,
    respuesta,
    solicitud,
    tipo_documento,
    tipo_movimiento,
    tipo_usuario,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
