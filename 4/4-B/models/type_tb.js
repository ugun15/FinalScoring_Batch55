'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class type_tb extends Model {
    static associate(models) {
      type_tb.hasMany(models.heroes_tb, { foreignKey: 'type_id' });
    }
  }
  type_tb.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'type_tb',
  });

  return type_tb;
};