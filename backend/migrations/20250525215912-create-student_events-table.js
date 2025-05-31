export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('StudentEvents', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    student_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'student_id',
      },
    },
    meeting_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Meetings',
        key: 'meeting_id',
      },
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
