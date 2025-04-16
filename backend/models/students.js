import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Students extends Model {}
  Students.init(
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
      },
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
