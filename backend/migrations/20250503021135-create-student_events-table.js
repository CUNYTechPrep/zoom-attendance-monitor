export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('StudentEvents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    student_id: {
      type: Sequelize.STRING,
      alllowNull: false,
    },
    meeting_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    event_action: {
      type: Sequelize.STRING,
      allowNull: false,
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
  await queryInterface.dropTable('StudentEvents');
}
