import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StudentEvent extends Model {}

  StudentEvent.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      student_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meeting_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'StudentEvent',
    }
  );
  //  StudentEvent.associate(models) {
  //     // define association here
  //   }

  return StudentEvent;
};
