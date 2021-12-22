const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitud', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    cuenta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuenta',
        key: 'id'
      }
    },
    estado_solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado_solicitud',
        key: 'id'
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'solicitud',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_solicitud_cuenta1_idx",
        using: "BTREE",
        fields: [
          { name: "cuenta_id" },
        ]
      },
      {
        name: "fk_solicitud_estado_solicitud1_idx",
        using: "BTREE",
        fields: [
          { name: "estado_solicitud_id" },
        ]
      },
      {
        name: "fk_solicitud_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
    ]
  });
};
