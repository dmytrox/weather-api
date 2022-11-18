'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    static associate(models) {
      Weather.belongsTo(models.Cities, {
        foreignKey: {
          name: 'city_id'
        }
      });      
    }
  };
  Weather.init({
    city_id: DataTypes.BIGINT.UNSIGNED,
    datetime: {
      type: DataTypes.STRING(100),
      get() {
        const rawValue = this.getDataValue('datetime');
        return rawValue.replace("T", " ");
      }
    },
    apparent_temperature: {
      type: DataTypes.FLOAT,
    },
    at_unit_id: DataTypes.BIGINT.UNSIGNED,
    rain: {
      type: DataTypes.FLOAT,
    },
    rain_unit_id: DataTypes.BIGINT.UNSIGNED,
    snowfall: {
      type: DataTypes.FLOAT,
    },
    snowfall_unit_id: DataTypes.BIGINT.UNSIGNED,
    visibility: {
      type: DataTypes.FLOAT,
    },
    visibility_unit_id: DataTypes.BIGINT.UNSIGNED
  }, {
    sequelize,
    modelName: 'Weather',
    freezeTableName: true,
    tableName: 'weather'
  });

  return Weather;
};