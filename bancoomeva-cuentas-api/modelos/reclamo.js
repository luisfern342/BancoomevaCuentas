const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reclamo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    observacion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    movimiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movimiento',
        key: 'id'
      }
    },
    respuesta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'respuesta',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'reclamo',
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
        name: "fk_reclamo_movimiento1_idx",
        using: "BTREE",
        fields: [
          { name: "movimiento_id" },
        ]
      },
      {
        name: "fk_reclamo_respuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "respuesta_id" },
        ]
      },
    ]
  });
};
