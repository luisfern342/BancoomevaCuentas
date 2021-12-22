const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_completo: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    documento: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: "documento_UNIQUE"
    },
    fecha_expedicion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tipo_documento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_documento',
        key: 'id'
      }
    },
    tipo_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
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
        name: "documento_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documento" },
        ]
      },
      {
        name: "fk_cliente_tipo_documento1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_documento_id" },
        ]
      },
      {
        name: "fk_cliente_tipo_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_usuario_id" },
        ]
      },
    ]
  });
};
