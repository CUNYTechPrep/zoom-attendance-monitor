import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Meeting extends Model {}

  Meeting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      meeting_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meeting_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
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
      modelName: 'Meeting',
    }
  );

  Meeting.associate = (models) => {
    Meeting.hasMany(models.StudentEvent, { foreignKey: 'meeting_id' });
  };

  return Meeting;
};
