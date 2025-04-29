import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Meeting extends Model {}

  Meeting.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  //  Meeting.associate(models) {
  //     // define association here
  //   }

  return Meeting;
};
