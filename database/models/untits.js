'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Units extends Model {
        static associate(models) {

        }
    };
    Units.init({
        unit: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Units',
        freezeTableName: true,
        tableName: 'units'
    });

    return Units;
};