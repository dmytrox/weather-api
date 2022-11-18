'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {
      Cities.hasMany(models.Weather, {
        as: 'weather',
        foreignKey: {
          name: 'city_id'
        }
      });
    }
  };
  Cities.init({
    name: DataTypes.STRING(100),
    lat: DataTypes.DOUBLE,
    long: DataTypes.DOUBLE,
    views_count: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Cities',
    freezeTableName: true,
    tableName: 'cities'
  });

  return Cities;
};