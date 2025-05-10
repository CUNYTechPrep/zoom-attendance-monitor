import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Meeting extends Model {}

  Meeting.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      meeting_id: {
        // A change made, before it was just id, but the table needs meeting id. I added a separate id column with PK constraint.
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
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

  // eslint-disable-next-line no-unused-vars
  Meeting.associate = (models) => {};

  return Meeting;
};
