import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Students extends Model {}
  Students.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      student_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Students',
    }
  );

  Students.associate = (/* models */) => {
    // associations can be defined here
  };

  return Students;
};
