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

  StudentEvent.associate = (models) => {
    models.Student.hasMany(StudentEvent, { foreignKey: 'student_id' });
    models.Meeting.hasMany(StudentEvent, { foreignKey: 'meeting_id' });
    StudentEvent.belongsTo(models.Student, { foreignKey: 'student_id' });
    StudentEvent.belongsTo(models.Meeting, { foreignKey: 'meeting_id' });
  };
  return StudentEvent;
};
