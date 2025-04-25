'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class create - meetings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  create - meetings.init({
    meeting_name: DataTypes.STRING,
    id: DataTypes.INTEGER,
    start: DataTypes.STRING,
    end: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'create-meetings',
  });
  return create - meetings;
};