const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cuenta', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: "cuentacol_UNIQUE"
    },
    saldo: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fecha_hora_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    clave: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado_cuenta',
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
    tableName: 'cuenta',
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
        name: "cuentacol_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero" },
        ]
      },
      {
        name: "fk_cuenta_estado_idx",
        using: "BTREE",
        fields: [
          { name: "estado_id" },
        ]
      },
      {
        name: "fk_cuenta_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
    ]
  });
};
