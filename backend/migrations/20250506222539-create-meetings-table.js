export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Meetings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    meeting_id: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    meeting_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface, _Sequelize) {
  _Sequelize;
  await queryInterface.dropTable('Meetings');
}
