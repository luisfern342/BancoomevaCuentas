const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movimiento', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    tipo_movimiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_movimiento',
        key: 'id'
      }
    },
    cuenta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuenta',
        key: 'id'
      }
    },
    cuenta_id_destino: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cuenta',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'movimiento',
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
        name: "fk_movimiento_tipo_movimiento1_idx",
        using: "BTREE",
        fields: [
          { name: "tipo_movimiento_id" },
        ]
      },
      {
        name: "fk_movimiento_cuenta1_idx",
        using: "BTREE",
        fields: [
          { name: "cuenta_id" },
        ]
      },
      {
        name: "fk_movimiento_cuenta2_idx",
        using: "BTREE",
        fields: [
          { name: "cuenta_id_destino" },
        ]
      },
    ]
  });
};
