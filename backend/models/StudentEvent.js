import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class StudentEvent extends Model {}

  StudentEvent.init(
    {
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
        validate: { isIn: [['JOINED', 'LEFT']] },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'StudentEvent',
    }
  );

  StudentEvent.associate = (models) => {
    StudentEvent.belongsTo(models.Student, { foreignKey: 'student_id' });
    StudentEvent.belongsTo(models.Meeting, { foreignKey: 'meeting_id' });
  };
  return StudentEvent;
};
