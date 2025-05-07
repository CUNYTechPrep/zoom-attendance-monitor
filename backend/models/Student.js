import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Student extends Model {}
  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      student_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );

  Student.associate = (/* models */) => {
    // associations can be defined here
  };

  return Student;
};
